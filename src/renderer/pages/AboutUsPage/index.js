import './AboutUsPage.scss';

import PageScaffold from 'renderer/components/PageScaffold';

const AboutUsPage = () => {
	return (
		<PageScaffold previousPage="/">
			<div className="">
				<div>Nothing here <br />See you soon in next version</div>
				<br />
				<div className="">My github: <a href="https://github.com/hoanghy0112">https://github.com/hoanghy0112</a></div>
			</div>
		</PageScaffold>
	);
};

export default AboutUsPage;
