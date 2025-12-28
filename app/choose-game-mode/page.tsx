'use client';

import ChoosingMenu from '@/components/ChoosingMenu/ChoosingMenu';
import { gameModeSelector, setGameMode } from '@/lib/store/slices/configurationSlice';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import * as GAME_MODE from '@/lib/constants/gameMode';

export default function ChooseGameModePage() {
    const gameMode = useAppSelector(gameModeSelector);
    const dispatch = useAppDispatch();

    return (
        <ChoosingMenu
            title="Choose game mode"
            data={gameMode}
            setData={(mode) => dispatch(setGameMode(mode as string))}
            choices={[
                {
                    id: 1,
                    data: GAME_MODE.OFFLINE,
                    img: '/images/playpage/human.svg',
                    size: '50px',
                },
                {
                    id: 2,
                    data: GAME_MODE.VS_COM,
                    img: '/images/playpage/robot.svg',
                    size: '50px',
                },
                {
                    id: 3,
                    data: GAME_MODE.ONLINE,
                    img: '/images/playpage/PvP.svg',
                    size: '50px',
                },
            ]}
            borderRadius="15px"
            previousPage="/"
            nextPage="/choose-board-size"
            background="/images/homepage/background.svg"
        />
    );
}
