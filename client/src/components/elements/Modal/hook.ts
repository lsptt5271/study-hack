import { RefObject, useCallback, useRef, useState } from 'react';

export type ModalState = {
  left: number;
  top: number;
  moving: boolean;
  visible: boolean;
};

export const useModal = ($container: RefObject<HTMLDivElement>, $modal: RefObject<HTMLDivElement>) => {
  const [modalState, setModalState] = useState<ModalState>({
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
      setModalState((state) => ({
        ...state,
        left: moveConfig.current.maxLeft / 2,
        top: (state.top = moveConfig.current.maxTop / 2),
        visible: true,
      }));
    }
  }, [setModalState]);

  const onHideModal = useCallback(() => {
    setModalState((state) => ({ ...state, visible: false }));
  }, [setModalState]);

  const moveStartModal = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      moveConfig.current.scrollX = e.pageX - e.clientX;
      moveConfig.current.scrollY = e.pageY - e.clientY;
      moveConfig.current.left = e.pageX - modalState.left;
      moveConfig.current.top = e.pageY - modalState.top;

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', moveEnd);

      setModalState((state) => ({ ...state, moving: true }));
    },
    [setModalState, modalState.left, modalState.top]
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

      setModalState((state) => ({ ...state, left: currentLeft, top: currentTop }));
    },
    [setModalState]
  );

  const moveEnd = useCallback(() => {
    moveConfig.current.left = ($modal.current?.offsetLeft || 0) + moveConfig.current.scrollX;
    moveConfig.current.top = ($modal.current?.offsetTop || 0) + moveConfig.current.scrollY;

    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', moveEnd);

    setModalState((state) => ({ ...state, moving: false }));
  }, [setModalState]);

  return { modalConfig: modalState, onShowModal, onHideModal, moveStartModal };
};
