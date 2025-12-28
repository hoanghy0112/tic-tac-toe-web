'use client';

import ChoosingMenu from '@/components/ChoosingMenu/ChoosingMenu';
import { boardSizeSelector, setBoardSize } from '@/lib/store/slices/configurationSlice';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import * as BOARD_SIZE from '@/lib/constants/boardSize';

export default function ChooseBoardSizePage() {
    const boardSize = useAppSelector(boardSizeSelector);
    const dispatch = useAppDispatch();

    return (
        <ChoosingMenu
            title="Choose board size"
            data={boardSize}
            setData={(size) => dispatch(setBoardSize(size as number))}
            choices={[
                {
                    id: 1,
                    data: BOARD_SIZE.MAP_3,
                    img: '/images/playpage/3x3.svg',
                    size: '80px',
                },
                {
                    id: 2,
                    data: BOARD_SIZE.MAP_10,
                    img: '/images/playpage/10x10.svg',
                    size: '120px',
                },
                {
                    id: 3,
                    data: BOARD_SIZE.MAP_13,
                    img: '/images/playpage/13x13.svg',
                    size: '150px',
                },
            ]}
            borderRadius="5px"
            previousPage="/choose-game-mode"
            nextPage="/play"
            background="/images/homepage/background.svg"
        />
    );
}
