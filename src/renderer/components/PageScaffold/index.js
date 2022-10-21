import { useHistory } from 'react-router-dom';

import './index.scss';

const PageScaffold = ({ background, previousPage, children }) => {
	const history = useHistory();

	return (
		<div className="page-scaffold">
			<img className="background-img" src={background} alt="" />
			<div
				className="back-btn"
				onClick={() => {
					history.push(`${previousPage}`);
				}}
			>
				<p>{'<< Back'}</p>
			</div>
			{children}
		</div>
	);
};

export default PageScaffold;
