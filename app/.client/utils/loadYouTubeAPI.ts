let youtubeAPI: Promise<typeof YT> | null = null;

export function loadYouTubeAPI(): Promise<typeof YT> {
	if (youtubeAPI) {
		return youtubeAPI;
	}

	youtubeAPI = new Promise((resolve) => {
		if (window.YT) {
			resolve(window.YT);
		} else {
			const script = document.createElement("script");
			script.src = "https://www.youtube.com/iframe_api";
			script.async = true;
			document.body.appendChild(script);
			window.onYouTubeIframeAPIReady = () => resolve(window.YT);
		}
	});

	return youtubeAPI;
}
