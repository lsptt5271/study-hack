import { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';

import { useModal } from '@/components/elements/Modal/hook';

export type ModalProps = {
  width?: number;
  height?: number;
  title?: string;
  maskClickable?: boolean;
  movable?: boolean;
  active?: boolean;
  main: ReactNode;
  footer?: ReactNode;
  hide: () => void;
};

export const Modal = ({ title = '', width = 0, height = 0, maskClickable = false, movable = false, active = false, main, footer, hide }: ModalProps) => {
  const onClickMask = useCallback(() => {
    if (maskClickable) {
      hide();
    }
  }, [maskClickable, hide]);

  const $container = useRef<HTMLDivElement>(null);
  const $modal = useRef<HTMLDivElement>(null);

  const { modalConfig, onShowModal, onHideModal, moveStartModal } = useModal($container, $modal);

  const style = useMemo(() => {
    return {
      width: width ? `${width}px` : 'auto',
      height: height ? `${height}px` : 'auto',
      left: `${modalConfig.left}px`,
      top: `${modalConfig.top}px`,
    };
  }, [width, height, modalConfig.left, modalConfig.top]);

  const onMousedownHeader = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!movable) return;

      moveStartModal(e);
    },
    [movable, moveStartModal]
  );

  const contentDynamicStyle = useMemo(() => {
    return modalConfig.visible ? 'visible' : 'invisible';
  }, [modalConfig.visible]);

  const headerDynamicStyle = useMemo(() => {
    return movable ? 'cursor-pointer select-none' : '';
  }, [movable]);

  useEffect(() => {
    if (active) {
      onShowModal();
    } else {
      onHideModal();
    }
  }, [active]);

  return (
    <>
      {active && (
        <section className={'fixed left-0 top-0 z-[1000] h-[100vh] w-[100vw]'} ref={$container}>
          <div className={'absolute top-0 left-0 bottom-0 right-0'}>
            <div onClick={onClickMask} className={'absolute top-0 left-0 bottom-0 right-0 z-[1] bg-[rgba(255,255,255,0.1)]'} />
            <section style={style} className={`relative z-[2] inline-block overflow-hidden rounded-t bg-base ${contentDynamicStyle}`} ref={$modal}>
              <header className={`bg-primary py-1 px-2 ${headerDynamicStyle}`} onMouseDown={onMousedownHeader}>
                <h3>{title}</h3>
              </header>
              {main}
              {footer}
            </section>
          </div>
        </section>
      )}
    </>
  );
};

export const ModalMain = ({ children }: { children: ReactNode }) => {
  return <main className={'m-0.5 p-1'}>{children}</main>;
};

export const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <footer className={'m-0.5 flex justify-end'}>{children}</footer>;
};
