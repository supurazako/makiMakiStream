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

		const currentUrl = new URL(window.location.href);
		const targetUrl = new URL(newUrl);
		if (currentUrl.pathname !== targetUrl.pathname || currentUrl.search !== targetUrl.search) {
			navigate(`${targetUrl.pathname}${targetUrl.search}`, { replace: true });
		}
	}, [videoDataList, navigate]);
}
