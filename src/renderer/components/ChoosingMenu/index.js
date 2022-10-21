import './ChoosingMenu.scss';

import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import PageScaffold from '../PageScaffold';

const ChoosingMenu = ({
	title,
	data,
	setData,
	choices,
	borderRadius,
	previousPage,
	nextPage,
	background,
}) => {
	const history = useHistory();

	return (
		<PageScaffold background={background} previousPage={previousPage}>
			<div className="choosing-menu__main">
				<h1 className="choosing-menu__title">{title}</h1>
				<div className="choosing-menu__choice-group">
					{choices.map((choice) => {
						return (
							<label
								key={choice.id}
							>
								<input
									type="radio"
									name={title}
									checked={choice.data == data ? true : false}
									onChange={() => setData(choice.data)}
								/>
								<div
									style={{
										width: choice.size,
										height: choice.size,
										'--border-radius': borderRadius,
									}}
									className="choosing-menu__choice-item"
								>
									<img
										src={choice.img}
										alt={`choice-img-${choice.id}`}
									/>
								</div>
							</label>
						);
					})}
				</div>
				<button
					className="primary-btn"
					onClick={() => history.push(`${nextPage}`)}
				>
					{'Next >>'}
				</button>
			</div>
		</PageScaffold>
	);
};

export default ChoosingMenu;
