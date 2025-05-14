import { useRef } from "react";
import { Modal } from "~/components/common/Modal";
import { AddVideoModal } from "~/components/modal/AddVideoModal";

import "~/styles/add-video-button.css";

export function AddVideoButton(): JSX.Element {
	const dialogRef = useRef<HTMLDialogElement>(null);

	function handleClick() {
		if (dialogRef.current) {
			dialogRef.current.showModal();
		}
	}

	return (
		<div className="add-video-button-container">
			<button className="add-video-button"
				type="button"
				onClick={handleClick}>
				<PlusClipIcon />
			</button>

			<Modal dialogRef={dialogRef}>
				<AddVideoModal dialogRef={dialogRef} />
			</Modal>
		</div>
	);
}

function PlusClipIcon() {
	return <svg width="0" height="0" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
		<clipPath id="plus_clip_icon" clipPathUnits="objectBoundingBox">
			<path d="M27.5001 17.0833H17.0834V27.5C17.0834 28.6458 16.1459 29.5833 15.0001 29.5833C13.8542 29.5833 12.9167 28.6458 12.9167 27.5V17.0833H2.50008C1.35425 17.0833 0.416748 16.1458 0.416748 15C0.416748 13.8542 1.35425 12.9167 2.50008 12.9167H12.9167V2.49999C12.9167 1.35416 13.8542 0.416656 15.0001 0.416656C16.1459 0.416656 17.0834 1.35416 17.0834 2.49999V12.9167H27.5001C28.6459 12.9167 29.5834 13.8542 29.5834 15C29.5834 16.1458 28.6459 17.0833 27.5001 17.0833Z"
				transform="scale(0.033)" />
		</clipPath>
	</svg>
}
