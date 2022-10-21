import { useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';

import HomePage from '../pages/HomePage';
import ChooseGameModePage from '../pages/ChooseGameModePage';
import ChooseBoardSizePage from '../pages/ChooseBoardSizePage'
import AboutUsPage from '../pages/AboutUsPage';
import PlayPage from '../pages/PlayPage'

export default function App() {
	const [isBegin, setIsBegin] = useState(true);

	const [gameMode, setGameMode] = useState('human');
	const [boardSize, setBoardSize] = useState(3);

	return (
		<Router>
			<Switch>
				<Route exact path="/choose-game-mode">
					<ChooseGameModePage gameMode={gameMode} setGameMode={setGameMode} />
				</Route>
				<Route exact path="/choose-board-size">
					<ChooseBoardSizePage boardSize={boardSize} setBoardSize={setBoardSize} />
				</Route>
				<Route exact path="/about-us" component={AboutUsPage} />
				<Route exact path="/play">
					<PlayPage />
				</Route>
				<Route exact path="/">
					<HomePage isBegin={isBegin} setIsBegin={setIsBegin} />
				</Route>
			</Switch>
		</Router>
	);
}
