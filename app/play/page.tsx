'use client';

import { useEffect, useState, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import PageScaffold from '@/components/PageScaffold/PageScaffold';
import Modal from '@/components/Modal/Modal';

import {
    boardMapSelector,
    winningStateSelector,
    currentMoveSelector,
    previousMoveSelector,
    initializeMap,
    makeNewMove,
    moveBack,
} from '@/lib/store/slices/boardMapSlice';
import { configurationSelector } from '@/lib/store/slices/configurationSlice';

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';

import { NONE, O, X } from '@/lib/constants/cellType';
import { MAP_3, MAP_10, MAP_13 } from '@/lib/constants/boardSize';
import { VS_COM } from '@/lib/constants/gameMode';
import { getBotMove } from '@/lib/utils/botUtils';

import './page.scss';

interface BoardStyle extends CSSProperties {
    '--gap': string;
    '--size': string;
    '--border-radius': string;
    '--color': string;
}

export default function PlayPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { boardSize, gameMode } = useAppSelector(configurationSelector);

    const currentMove = useAppSelector(currentMoveSelector);
    const previousMove = useAppSelector(previousMoveSelector);
    const winningState = useAppSelector(winningStateSelector);
    const boardMap = useAppSelector(boardMapSelector);

    const [style, setStyle] = useState<BoardStyle>();

    useEffect(() => {
        dispatch(initializeMap(boardSize));

        switch (boardSize) {
            case MAP_3:
                setStyle({
                    '--gap': '20px',
                    '--size': '100px',
                    '--border-radius': '15px',
                    '--color': '#A0C4FF',
                });
                break;
            case MAP_10:
                setStyle({
                    '--gap': '6px',
                    '--size': '40px',
                    '--border-radius': '5px',
                    '--color': '#BDB2FF',
                });
                break;
            case MAP_13:
                setStyle({
                    '--gap': '5px',
                    '--size': '30px',
                    '--border-radius': '5px',
                    '--color': '#B5E48C',
                });
                break;
        }
    }, [boardSize, dispatch]);

    // Bot move effect - triggers when it's bot's turn (O) in VS_COM mode
    useEffect(() => {
        // Only trigger if:
        // 1. Game mode is VS_COM
        // 2. It's O's turn (next move will be O, meaning current type is X)
        // 3. Game is not won yet
        // 4. Board has been initialized (currentMove.type exists)
        if (
            gameMode === VS_COM &&
            currentMove.type === X &&
            !winningState.isWin &&
            boardMap.length > 0
        ) {
            // Add a small delay to make the bot move feel more natural
            const timeoutId = setTimeout(() => {
                const botMove = getBotMove({
                    boardMap,
                    currentMove,
                    boardSize,
                });

                if (botMove) {
                    dispatch(makeNewMove([botMove.x, botMove.y]));
                }
            }, 500);

            return () => clearTimeout(timeoutId);
        }
    }, [gameMode, currentMove, winningState.isWin, boardMap, boardSize, dispatch]);

    const handleNewMove = (x: number, y: number) => (event: React.MouseEvent<HTMLDivElement>) => {
        // In VS_COM mode, only allow moves when it's the player's turn (X's turn)
        // currentMove.type === X means it's O's turn (bot's turn), so block
        if (gameMode === VS_COM && currentMove.type === X && currentMove.x !== -1) {
            return; // Bot's turn, don't allow player to click
        }

        if (!winningState.isWin) {
            const target = event.target as HTMLElement;
            target.classList.toggle('new-move');
            setTimeout(() => {
                dispatch(makeNewMove([x, y]));
                target.classList.toggle('new-move');
            }, 300);
        }
    };

    const handleReplay = () => {
        dispatch(initializeMap(boardSize));
    };

    const handleMoveBack = () => {
        dispatch(moveBack());
    };

    const handleSetting = () => { };

    return (
        <PageScaffold previousPage="/choose-board-size">
            <div className="board" style={style}>
                {boardMap.map((row, indexX) => (
                    <div className="board__row" key={indexX}>
                        {row.map((cell, indexY) => (
                            <div
                                key={indexY}
                                className={`board__cell ${winningState.isDraw ||
                                    (winningState.isWin
                                        ? (() => {
                                            if (
                                                winningState.winCells?.some(
                                                    (value) =>
                                                        JSON.stringify(value) ===
                                                        JSON.stringify({
                                                            x: indexX,
                                                            y: indexY,
                                                        })
                                                )
                                            )
                                                return 'winning-cell';
                                            else return '';
                                        })()
                                        : '')
                                    }`}
                            >
                                <div className="board__cell__inner" onClick={handleNewMove(indexX, indexY)}>
                                    {cell === X && (
                                        <Image src="/images/playpage/item/X.svg" alt="X" width={40} height={40} />
                                    )}
                                    {cell === O && (
                                        <Image src="/images/playpage/item/O.svg" alt="O" width={40} height={40} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="function-group">
                <button className="circle-btn" onClick={handleReplay}>
                    <Image src="/images/playpage/replay.svg" alt="Replay" width={30} height={30} />
                </button>
                <button
                    className={`circle-btn ${previousMove ? '' : 'disabled'}`}
                    onClick={previousMove ? handleMoveBack : () => { }}
                >
                    <Image src="/images/playpage/history.svg" alt="Undo" width={30} height={30} />
                </button>
                <button className="circle-btn" onClick={handleSetting}>
                    <Image src="/images/playpage/setting.svg" alt="Settings" width={30} height={30} />
                </button>
            </div>
            {winningState.isWin && (
                <Modal>
                    <div className="winning-dialogue">
                        {winningState.isDraw ? (
                            <span>
                                {' '}
                                <Image src="/images/playpage/item/X.svg" alt="X" width={40} height={40} />
                                Draw !!!{' '}
                                <Image src="/images/playpage/item/O.svg" alt="O" width={40} height={40} />
                            </span>
                        ) : (
                            <span>
                                {currentMove.type === X ? (
                                    <Image src="/images/playpage/item/X.svg" alt="X" width={40} height={40} />
                                ) : (
                                    <Image src="/images/playpage/item/O.svg" alt="O" width={40} height={40} />
                                )}{' '}
                                is the winner
                            </span>
                        )}
                        <div className="replay-dialogue">
                            Do you want to replay ?
                            <div className="button-group">
                                <button className="dialogue-btn" onClick={handleReplay}>
                                    Yes
                                </button>
                                <button className="dialogue-btn" onClick={() => router.push('/')}>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </PageScaffold>
    );
}
