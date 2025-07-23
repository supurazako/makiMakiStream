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
		if (currentUrl.pathname + currentUrl.search !== targetUrl.pathname + targetUrl.search) {
			navigate(newUrl.replace(window.location.origin, ""), { replace: true });
		}
	}, [videoDataList, navigate]);
}
