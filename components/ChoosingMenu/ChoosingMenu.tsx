'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PageScaffold from '@/components/PageScaffold/PageScaffold';
import './ChoosingMenu.scss';

interface Choice {
    id: number;
    data: string | number;
    img: string;
    size: string;
}

interface ChoosingMenuProps {
    title: string;
    data: string | number;
    setData: (value: string | number) => void;
    choices: Choice[];
    borderRadius: string;
    previousPage: string;
    nextPage: string;
    background: string;
}

const ChoosingMenu = ({
    title,
    data,
    setData,
    choices,
    borderRadius,
    previousPage,
    nextPage,
    background,
}: ChoosingMenuProps) => {
    const router = useRouter();

    return (
        <PageScaffold background={background} previousPage={previousPage}>
            <div className="choosing-menu__main">
                <h1 className="choosing-menu__title">{title}</h1>
                <div className="choosing-menu__choice-group">
                    {choices.map((choice) => {
                        return (
                            <label key={choice.id}>
                                <input
                                    type="radio"
                                    name={title}
                                    checked={choice.data === data}
                                    onChange={() => setData(choice.data)}
                                />
                                <div
                                    style={{
                                        width: choice.size,
                                        height: choice.size,
                                        '--border-radius': borderRadius,
                                    } as React.CSSProperties}
                                    className="choosing-menu__choice-item"
                                >
                                    <Image src={choice.img} alt={`choice-img-${choice.id}`} width={80} height={80} />
                                </div>
                            </label>
                        );
                    })}
                </div>
                <button className="primary-btn" onClick={() => router.push(nextPage)}>
                    {'Next >>'}
                </button>
            </div>
        </PageScaffold>
    );
};

export default ChoosingMenu;
