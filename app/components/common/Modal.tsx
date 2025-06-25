import { JSX, RefObject } from "react";
import { CloseIcon } from "~/components/common/icons";

import "~/styles/common/modal.css";

export function Modal({ dialogRef, children }: { dialogRef: RefObject<HTMLDialogElement | null>, children: React.ReactNode }): JSX.Element {
	const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (e.target === dialogRef.current) {
			dialogRef.current?.close();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
		if (e.key === "Escape") {
			dialogRef.current?.close();
		}
	};

	return (
		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
		<dialog ref={dialogRef}
			onClick={handleClick}
			onKeyDown={handleKeyDown}>
			<div className="modal-container">
				<div className="modal-header">
					<button className="modal-close-button" onClick={() => dialogRef.current?.close()}>
						<CloseIcon />
					</button>
				</div>
				<div className="modal-content">
					{children}
				</div>
			</div>
		</dialog>
	);
}
