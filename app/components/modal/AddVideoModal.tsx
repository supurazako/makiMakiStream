import { useFetcher } from "@remix-run/react";
import { useSetAtom } from "jotai";
import { MouseEvent, RefObject, useEffect, useRef, useState } from "react";
import { videoDataListAtom } from "~/atoms";
import { ClearIcon } from "~/components/common/icons";
import { VideoDataModel } from "~/models/videoDataModel";
import { SearchActionResult, VideoContent } from "~/routes/_index";

import "~/styles/modal/add-video-modal.css";

type Tab = "youtube" | "twitch" | "other";

export function AddVideoModal({ dialogRef }: { dialogRef: RefObject<HTMLDialogElement> }): JSX.Element {
	const [activeTab, setActiveTab] = useState<Tab>("youtube");
	const [searchText, setSearchText] = useState<string>("");
	const fetcher = useFetcher<SearchActionResult>();
	const [selectedItem, setSelectedItem] = useState<VideoContent | null>(null);
	const setVideoDataList = useSetAtom(videoDataListAtom);
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

	function handleSearchTextChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setSearchText(e.currentTarget.value);

		// _index.tsxのactionを呼び出す🪄
		fetcher.submit({
			platform: activeTab,
			param: e.currentTarget.value
		}, {
			method: "post"
		});
	}

	function handleConfirm(): void {
		let data: VideoDataModel;
		switch (activeTab) {
			case "youtube":
				data = {
					platform: "youtube",
					videoId: selectedItem!.value,
					id: crypto.randomUUID(),
				};
				break;
			case "twitch":
				data = {
					platform: "twitch",
					channel: selectedItem!.value,
					id: crypto.randomUUID(),
				};
				break;
			case "other":
				data = {
					platform: "youtube",
					videoId: selectedItem!.value,
					id: crypto.randomUUID(),
				};
				break;
		}

		setVideoDataList(prev => [...prev, data]);
		setSelectedItem(null);
		dialogRef.current?.close();
	}

	function handleClose(): void {
		setSelectedItem(null);
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
					<input className="search-bar"
						type="text"
						placeholder="URL、動画のID、キーワードなど"
						value={searchText}
						onChange={handleSearchTextChange} />
					{
						searchText.length === 0 && (
							<button className="clear-button" type="button" onClick={() => setSearchText("")}>
								<ClearIcon />
							</button>
						)
					}
				</div>
				<div className="search-result-container">
					{
						fetcher.data?.contents?.map((content, i) => (
							<button className={`search-result-item${selectedItem === content ? " selected" : ""}`}
								key={i}
								type="button"
								onClick={() => setSelectedItem(content)}>
								<img className="thumbnail" src={content.thumbnail} alt="" />
								<div className="video-info">
									<p className="title">{content.title}</p>
									<p className="channel">{content.channel}</p>
								</div>
							</button>
						))
					}
				</div>
			</div>

			<div className="modal-bottom">
				<button className="modal-confirm-button"
					type="button"
					onClick={handleConfirm}
					disabled={selectedItem === null}>
					動画を追加
				</button>
				<button className="modal-cancel-button" type="button" onClick={handleClose}>キャンセル</button>
			</div>
		</div>
	);
}
