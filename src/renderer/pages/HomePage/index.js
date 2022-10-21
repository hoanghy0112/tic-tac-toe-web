import board_background from '../../../assets/homepage/background.svg';
import studio_icon from '../../../assets/homepage/Studio.svg';
import game_name from '../../../assets/homepage/GameName.svg';

import './HomePage.scss';

import { useState, useEffect, useRef } from 'react';


import { Link, useHistory } from 'react-router-dom';

const HomePage = ({ isBegin, setIsBegin }) => {
	const home = useRef(null);

	const history = useHistory();

	useEffect(() => {
		setTimeout(() => {
			setIsBegin(false);
		}, 3000);
	}, []);

	const navigateTo = (destination) => {
		history.push(`/${destination}`);
		console.log(document.URL);
	};

	return (
		<div className="Home">
			{isBegin ? (
				<>
					<img className="studio-img" src={studio_icon} alt="" />
				</>
			) : (
				<>
					<img className="background-img" src={board_background} alt="" />
					<img src={game_name} alt="" />

					<div className="button-group">
						<button
							onClick={() => navigateTo('choose-game-mode')}
							className="btn"
						>
							Play
						</button>
						<button onClick={() => navigateTo('about-us')} className="btn">
							About us
						</button>
						<button onClick={() => {}} className="btn">
							Exit
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default HomePage;
