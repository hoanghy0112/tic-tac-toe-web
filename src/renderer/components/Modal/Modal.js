import X_icon from "../../../assets/playpage/item/X.svg";
import O_icon from "../../../assets/playpage/item/O.svg";

import "./Modal.scss";
import React, { useState } from "react";

export default React.memo(function Modal({ onClickOutside, children }) {
	const [isAppear, setAppear] = useState(true);
	const [animationDisappear, setAnimationDisappear] = useState(false);

	return (
		<div className={`modal ${isAppear || "disappear"}`}>
			<div
				onClick={() => {
					if (onClickOutside) {
						onClickOutside();
					}
					setAnimationDisappear(true);
					setTimeout(() => {
						setAppear(false);
					}, 300);
				}}
				className={`modal__background ${
					animationDisappear && "animation-disappear"
				}`}
			></div>
			<div
				className={`modal__content ${
					animationDisappear && "animation-disappear"
				}`}
			>
				{children}
			</div>
		</div>
	);
});
