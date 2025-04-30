import { MouseEvent, RefObject, useEffect, useRef, useState } from "react";

import "~/styles/modal/add-video-modal.css";

type Tab = "youtube" | "twitch" | "other";

export function AddVideoModal({ dialogRef }: { dialogRef: RefObject<HTMLDialogElement> }): JSX.Element {
	const [activeTab, setActiveTab] = useState<Tab>("youtube");
	const tabIndicatorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const resizeObserver = new ResizeObserver(entries => {
			const activeTabElement = entries.map(e => e.target)
				.find(e => e.classList.contains("active")) as HTMLElement | undefined;
			tabIndicatorRef.current!.style.left = `${activeTabElement!.offsetLeft}px`;
			tabIndicatorRef.current!.style.width = `${activeTabElement!.offsetWidth}px`;
		});

		[...tabIndicatorRef.current!.parentElement!.getElementsByClassName("tab")].forEach(e => {
			resizeObserver.observe(e);
		});

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	function handleTabChange(e: MouseEvent<HTMLButtonElement>, tab: Tab): void {
		setActiveTab(tab);
		tabIndicatorRef.current!.style.left = `${e.currentTarget.offsetLeft}px`;
		tabIndicatorRef.current!.style.width = `${e.currentTarget.offsetWidth}px`;
	}

	function handleConfirm(): void {
		dialogRef.current?.close();
	}

	function handleClose(): void {
		dialogRef.current?.close();
	}

	return (
		<div className="add-video-modal">
			<div className="modal-main">
				<div className="tab-container">
					<button className={`tab${activeTab === "youtube" ? " active" : ""}`}
						type="button"
						onClick={e => handleTabChange(e, "youtube")}>
						YouTube
					</button>
					<button className={`tab${activeTab === "twitch" ? " active" : ""}`}
						type="button"
						onClick={e => handleTabChange(e, "twitch")}>
						Twitch
					</button>
					<button className={`tab${activeTab === "other" ? " active" : ""}`}
						type="button"
						onClick={e => handleTabChange(e, "other")}>
						その他
					</button>
					<div className="tab-indicator" ref={tabIndicatorRef} />
				</div>
				<div className="search-bar-container">
					{/* TODO */}
				</div>
				<div className="video-list-container">
					{/* TODO */}
				</div>
			</div>

			<div className="modal-bottom">
				<button className="modal-confirm-button" type="button" onClick={handleConfirm}>動画を追加</button>
				<button className="modal-cancel-button" type="button" onClick={handleClose}>キャンセル</button>
			</div>
		</div>
	);
}
