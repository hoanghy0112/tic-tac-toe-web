
import board_background from '../../../assets/homepage/background.svg';

import map_3 from '../../../assets/playpage/3x3.svg';
import map_10 from '../../../assets/playpage/10x10.svg';
import map_13 from '../../../assets/playpage/13x13.svg';

import ChoosingMenu from 'renderer/components/ChoosingMenu';

import { boardSizeSelector } from 'renderer/features/configuration';
import { setBoardSize } from 'renderer/features/configuration';

import * as BOARD_SIZE from 'renderer/constants/configuration/boardSize';

import { useSelector, useDispatch } from 'react-redux';

import {useState} from 'react';

import { useHistory } from 'react-router-dom';

const ChooseBoardSizePage = () => {
	const boardSize = useSelector(boardSizeSelector);
	const dispatch = useDispatch();

	return <ChoosingMenu
		title="Choose board size"
		data={boardSize}
		setData={(size) => dispatch(setBoardSize(size))}
		choices={[
			{
				id: 1,
				data: BOARD_SIZE.MAP_3,
				img: map_3,
				size: '80px',
			},
			{
				id: 2,
				data: BOARD_SIZE.MAP_10,
				img: map_10,
				size: '120px',
			},
			{
				id: 3,
				data: BOARD_SIZE.MAP_13,
				img: map_13,
				size: '150px',
			},
		]}
		borderRadius='5px'
		previousPage='/choose-game-mode'
		nextPage='/play'
		background={board_background}
	/>

	// return <div className="choose-board-size">
	// 	<img className="background-img" src={board_background} alt="" />
	// 	<div className="back-btn" onClick={() => {history.push('/choose-game-mode')}}><div>{"<< Back"}</div></div>
	// 	<div className="Play__main">
	// 		<h1 className="title">Choose game mode</h1>
	// 		<div className="Play__size-choice-group">
	// 			<label onClick={() => handleChangeSize(3)}>
	// 				<input type="radio" name="size-item" checked={boardSize == 3 ? true : false} />
	// 				<div className="Play__size-choice__item map3"><img src={map_3} alt="" /></div>
	// 			</label>
	// 			<label onClick={() => handleChangeSize(10)}>
	// 				<input type="radio" name="size-item" checked={boardSize == 10 ? true : false} />
	// 				<div className="Play__size-choice__item map10"><img src={map_10} alt="" /></div>
	// 			</label>
	// 			<label onClick={() => handleChangeSize(13)}>
	// 				<input type="radio" name="size-item" checked={boardSize == 13 ? true : false} />
	// 				<div className="Play__size-choice__item map13"><img src={map_13} alt="" /></div>
	// 			</label>
	// 		</div>
	// 		<button className="primary-btn" onClick={() => history.push('/choose-board-size')}>{"Next >>"}</button>
	// 	</div>
	// </div>;
};

export default ChooseBoardSizePage;
