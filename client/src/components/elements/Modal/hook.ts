import { RefObject, useCallback, useRef, useState } from 'react';

export type ModalConfig = {
  left: number;
  top: number;
  moving: boolean;
  visible: boolean;
};

export const useModal = ($container: RefObject<HTMLDivElement>, $modal: RefObject<HTMLDivElement>) => {
  const [state, setState] = useState<ModalConfig>({
    left: 0,
    top: 0,
    moving: false,
    visible: false,
  });

  const moveConfig = useRef({
    left: 0,
    top: 0,
    minLeft: 0,
    minTop: 0,
    maxLeft: 0,
    maxTop: 0,
    scrollX: 0,
    scrollY: 0,
  });

  const onShowModal = useCallback(() => {
    if ($container.current && $modal.current) {
      moveConfig.current.maxLeft = $container.current.offsetWidth - $modal.current.offsetWidth;
      moveConfig.current.maxTop = $container.current.offsetHeight - $modal.current?.offsetHeight;
      setState((state) => ({ ...state, left: moveConfig.current.maxLeft / 2, top: (state.top = moveConfig.current.maxTop / 2), visible: true }));
    }
  }, []);

  const onHideModal = useCallback(() => {
    setState((state) => ({ ...state, visible: false }));
  }, [setState]);

  const moveStartModal = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      moveConfig.current.scrollX = e.pageX - e.clientX;
      moveConfig.current.scrollY = e.pageY - e.clientY;
      moveConfig.current.left = e.pageX - state.left;
      moveConfig.current.top = e.pageY - state.top;

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', moveEnd);

      setState((state) => ({ ...state, moving: true }));
    },
    [setState, state.left, state.top]
  );

  const move = useCallback(
    (e: MouseEvent) => {
      let currentLeft = e.pageX - moveConfig.current.left - moveConfig.current.scrollX;
      let currentTop = e.pageY - moveConfig.current.top - moveConfig.current.scrollY;

      if (currentLeft < moveConfig.current.minLeft) {
        currentLeft = moveConfig.current.minLeft;
      } else if (currentLeft > moveConfig.current.maxLeft) {
        currentLeft = moveConfig.current.maxLeft;
      }
      if (currentTop < moveConfig.current.minTop) {
        currentTop = moveConfig.current.minTop;
      } else if (currentTop > moveConfig.current.maxTop) {
        currentTop = moveConfig.current.maxTop;
      }

      if (currentLeft < 0) {
        currentLeft = 0;
      }
      if (currentTop < 0) {
        currentTop = 0;
      }

      setState((state) => ({ ...state, left: currentLeft, top: currentTop }));
    },
    [setState]
  );

  const moveEnd = useCallback(() => {
    moveConfig.current.left = ($modal.current?.offsetLeft || 0) + moveConfig.current.scrollX;
    moveConfig.current.top = ($modal.current?.offsetTop || 0) + moveConfig.current.scrollY;

    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', moveEnd);

    setState((state) => ({ ...state, moving: false }));
  }, [setState]);

  return { modalConfig: state, onShowModal, onHideModal, moveStartModal };
};
