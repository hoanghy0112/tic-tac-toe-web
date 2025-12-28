'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './page.scss';

export default function HomePage() {
    const [isBegin, setIsBegin] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsBegin(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const navigateTo = (destination: string) => {
        router.push(`/${destination}`);
    };

    return (
        <div className="Home">
            {isBegin ? (
                <>
                    <Image
                        className="studio-img"
                        src="/images/homepage/Studio.svg"
                        alt="Studio"
                        width={300}
                        height={300}
                    />
                </>
            ) : (
                <>
                    <Image
                        className="background-img"
                        src="/images/homepage/background.svg"
                        alt=""
                        width={500}
                        height={500}
                    />
                    <Image
                        src="/images/homepage/GameName.svg"
                        alt="Tic Tac Toe"
                        width={400}
                        height={150}
                    />

                    <div className="button-group">
                        <button onClick={() => navigateTo('choose-game-mode')} className="btn">
                            Play
                        </button>
                        <button onClick={() => navigateTo('about-us')} className="btn">
                            About us
                        </button>
                        <button onClick={() => { }} className="btn">
                            Exit
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
