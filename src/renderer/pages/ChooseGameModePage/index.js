import board_background from '../../../assets/homepage/background.svg';

import human from '../../../assets/playpage/human.svg';
import robot from '../../../assets/playpage/robot.svg';
import PvP from '../../../assets/playpage/PvP.svg';

import ChoosingMenu from 'renderer/components/ChoosingMenu';

import { gameModeSelector } from 'renderer/features/configuration';
import { setGameMode } from 'renderer/features/configuration';

import * as GAME_MODE from 'renderer/constants/configuration/gameMode';

import { useSelector, useDispatch } from 'react-redux';

const ChooseGameModePage = () => {
	const gameMode = useSelector(gameModeSelector);
	const dispatch = useDispatch();

	return <ChoosingMenu
		title="Choose game mode"
		data={gameMode}
		setData={(mode) => dispatch(setGameMode(mode))}
		choices={[
			{
				id: 1,
				data: GAME_MODE.OFFLINE,
				img: human,
				size: '50px',
			},
			{
				id: 2,
				data: GAME_MODE.VS_COM,
				img: robot,
				size: '50px',
			},
			{
				id: 3,
				data: GAME_MODE.ONLINE,
				img: PvP,
				size: '50px',
			},
		]}
		borderRadius='15px'
		previousPage='/'
		nextPage='/choose-board-size'
		background={board_background}
	/>

	// return <div className="choose-game-mode">
	// 	<img className="background-img" src={board_background} alt="" />
	// 	<div className="back-btn" onClick={() => {history.push('/')}}><div>{"<< Back"}</div></div>
	// 	<div className="Play__main">
	// 		<h1 className="title">Choose game mode</h1>
	// 		<div className="Play__mode-choice-group">
	// 			<label onClick={() => handleChangeMode('human')}>
	// 				<input type="radio" name="mode-item" checked={gameMode == 'human' ? true : false} />
	// 				<div className="Play__mode-choice__item"><img src={human} alt="" /></div>
	// 			</label>
	// 			<label onClick={() => handleChangeMode('robot')}>
	// 				<input type="radio" name="mode-item" checked={gameMode == 'robot' ? true : false} />
	// 				<div className="Play__mode-choice__item"><img src={robot} alt="" /></div>
	// 			</label>
	// 			<label onClick={() => handleChangeMode('PvP')}>
	// 				<input type="radio" name="mode-item" checked={gameMode == 'PvP' ? true : false} />
	// 				<div className="Play__mode-choice__item"><img src={PvP} alt="" /></div>
	// 			</label>
	// 		</div>
	// 		<button className="primary-btn" onClick={() => history.push('/choose-board-size')}>{"Next >>"}</button>
	// 	</div>
	// </div>;
};

export default ChooseGameModePage;
