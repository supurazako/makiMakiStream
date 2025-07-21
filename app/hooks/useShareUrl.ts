import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { videoDataListAtom } from "~/atoms";
import { generateUrlFromVideoData } from "~/utils/urlParser.client";

export function useShareUrl() {
	const videoDataList = useAtomValue(videoDataListAtom);
	const navigate = useNavigate();

	useEffect(() => {
		const newUrl = generateUrlFromVideoData(videoDataList);
		// URLが変更された場合のみnavigateを呼び出す
		if (window.location.href !== newUrl) {
			navigate(newUrl.replace(window.location.origin, ""), { replace: true });
		}
	}, [videoDataList]);
}
