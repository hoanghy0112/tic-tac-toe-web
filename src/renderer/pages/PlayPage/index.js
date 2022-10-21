import PageScaffold from "renderer/components/PageScaffold";
import Modal from "renderer/components/Modal/Modal";

import {
	boardMapSelector,
	winningStateSelector,
	currentMoveSelector,
	previousMoveSelector,
	initializeMap,
	makeNewMove,
	moveBack,
} from "renderer/features/boardMap";
import { configurationSelector } from "renderer/features/configuration";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { NONE, O, X } from "renderer/constants/board/cellType";
import {
	MAP_3,
	MAP_10,
	MAP_13,
} from "renderer/constants/configuration/boardSize";

import X_icon from "../../../assets/playpage/item/X.svg";
import O_icon from "../../../assets/playpage/item/O.svg";
import historyIcon from "../../../assets/playpage/history.svg";
import replayIcon from "../../../assets/playpage/replay.svg";
import settingIcon from "../../../assets/playpage/setting.svg";

import "./PlayPage.scss";

import React, { useEffect, useState } from "react";

const PlayPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [replayDialogue, setReplayDialogue] = useState(false);

	const { gameMode, boardSize } = useSelector(configurationSelector);

	const currentMove = useSelector(currentMoveSelector);
	const previousMove = useSelector(previousMoveSelector);
	const winningState = useSelector(winningStateSelector);

	let timeout;
	useEffect(() => {
		if (winningState.isWin) {
			timeout = setTimeout(() => {
				setReplayDialogue(true);
			}, 1000);
		}
	}, [winningState.isWin]);

	const [style, setStyle] = useState();

	useEffect(() => {
		dispatch(initializeMap(boardSize));

		switch (boardSize) {
			case MAP_3:
				setStyle({
					"--gap": "20px",
					"--size": "100px",
					"--border-radius": "15px",
					"--color": "#A0C4FF",
				});
				break;
			case MAP_10:
				setStyle({
					"--gap": "6px",
					"--size": "40px",
					"--border-radius": "5px",
					"--color": "#BDB2FF",
				});
				break;
			case MAP_13:
				setStyle({
					"--gap": "5px",
					"--size": "30px",
					"--border-radius": "5px",
					"--color": "#B5E48C",
				});
				break;
		}
	}, [boardSize]);
	const boardMap = useSelector(boardMapSelector);

	const handleNewMove = (x, y) => (event) => {
		if (!winningState.isWin) {
			console.log(event);
			event.target.classList.toggle("new-move");
			setTimeout(() => {
				dispatch(makeNewMove([x, y]));
				event.target.classList.toggle("new-move");
			}, 300);
		}
	};

	const handleReplay = () => {
		dispatch(initializeMap(boardSize));
	};

	const handleMoveBack = () => {
		dispatch(moveBack());
	};

	const handleSetting = () => {};

	return (
		<PageScaffold previousPage="/choose-board-size">
			<div className="board" style={style}>
				{boardMap.map((row, indexX) => (
					<div className="board__row">
						{row.map((cell, indexY) => (
							<div
								className={`board__cell ${
									winningState.isDraw ||
									(winningState.isWin
										? (() => {
												if (
													winningState.winCells.some(
														(value) =>
															JSON.stringify(value) ==
															JSON.stringify({
																x: indexX,
																y: indexY,
															})
													)
												)
													return "winning-cell";
												else return "";
										  })()
										: "")
								}`}
							>
								<div
									className="board__cell__inner"
									onClick={handleNewMove(indexX, indexY)}
								>
									{cell == X && <img src={X_icon} />}
									{cell == O && <img src={O_icon} />}
								</div>
							</div>
						))}
					</div>
				))}
			</div>
			<div className="function-group">
				<button className="circle-btn" onClick={handleReplay}>
					<img src={replayIcon} />
				</button>
				<button
					className={`circle-btn ${previousMove || "disabled"}`}
					onClick={previousMove ? handleMoveBack : () => {}}
				>
					<img src={historyIcon} />
				</button>
				<button className="circle-btn" onClick={handleSetting}>
					<img src={settingIcon} />
				</button>
			</div>
			{winningState.isWin && (
				<Modal>
					<div className="winning-dialogue">
						{winningState.isDraw ? (
							<span>
								{" "}
								<img src={X_icon} />
								Draw !!! <img src={O_icon} />
							</span>
						) : (
							<span>
								{currentMove.type == X ? (
									<img src={X_icon} />
								) : (
									<img src={O_icon} />
								)}{" "}
								is the winner
							</span>
						)}
						<div className="replay-dialogue">
							Do you want to replay ?
							<div className="button-group">
								<button className="dialogue-btn" onClick={handleReplay}>
									Yes
								</button>
								<button
									className="dialogue-btn"
									onClick={() => history.push("/")}
								>
									No
								</button>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</PageScaffold>
	);
};

export default PlayPage;
