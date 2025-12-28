'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import Image from 'next/image';
import './PageScaffold.scss';

interface PageScaffoldProps {
    background?: string;
    previousPage: string;
    children: ReactNode;
}

const PageScaffold = ({ background, previousPage, children }: PageScaffoldProps) => {
    const router = useRouter();

    return (
        <div className="page-scaffold">
            {background && (
                <Image className="background-img" src={background} alt="" width={500} height={500} />
            )}
            <div
                className="back-btn"
                onClick={() => {
                    router.push(previousPage);
                }}
            >
                <p>{'<< Back'}</p>
            </div>
            {children}
        </div>
    );
};

export default PageScaffold;
