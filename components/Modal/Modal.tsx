'use client';

import { useState, memo, ReactNode } from 'react';
import './Modal.scss';

interface ModalProps {
    onClickOutside?: () => void;
    children: ReactNode;
}

function Modal({ onClickOutside, children }: ModalProps) {
    const [isAppear, setAppear] = useState(true);
    const [animationDisappear, setAnimationDisappear] = useState(false);

    return (
        <div className={`modal ${isAppear ? '' : 'disappear'}`}>
            <div
                onClick={() => {
                    if (onClickOutside) {
                        onClickOutside();
                    }
                    setAnimationDisappear(true);
                    setTimeout(() => {
                        setAppear(false);
                    }, 300);
                }}
                className={`modal__background ${animationDisappear ? 'animation-disappear' : ''}`}
            ></div>
            <div className={`modal__content ${animationDisappear ? 'animation-disappear' : ''}`}>
                {children}
            </div>
        </div>
    );
}

export default memo(Modal);
