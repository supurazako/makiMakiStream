import { RefObject, useState } from "react";

import "~/styles/modal/add-video-modal.css";

type Tab = "youtube" | "twitch" | "other";

export function AddVideoModal({ dialogRef }: { dialogRef: RefObject<HTMLDialogElement> }): JSX.Element {
	const [selectedTab, setSelectedTab] = useState<Tab>("youtube");

	function handleConfirm(): void {
		dialogRef.current?.close();
	}

	function handleClose(): void {
		dialogRef.current?.close();
	}

	return (
		<div className="add-video-modal">
			<div className="tab-container">
				<button className={`tab${selectedTab === "youtube" ? " selected" : ""}`}
					type="button"
					onClick={() => setSelectedTab("youtube")}>
					YouTube
				</button>
				<button className={`tab${selectedTab === "twitch" ? " selected" : ""}`}
					type="button"
					onClick={() => setSelectedTab("twitch")}>
					Twitch
				</button>
				<button className={`tab${selectedTab === "other" ? " selected" : ""}`}
					type="button"
					onClick={() => setSelectedTab("other")}>
					その他
				</button>
			</div>
			<div className="search-bar-container">
				{/* TODO */}
			</div>
			<div className="video-list-container">
				{/* TODO */}
			</div>

			<div className="modal-bottom">
				<button className="modal-confirm-button" type="button" onClick={handleConfirm}>動画を追加</button>
				<button className="modal-cancel-button" type="button" onClick={handleClose}>キャンセル</button>
			</div>
		</div>
	);
}
