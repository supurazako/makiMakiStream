import { TwitchGetStreamsResponse, TwitchSearchChannelsResponse } from "twitch-api";

let cachedToken: string | null = null;
let tokenExpiresAt: number | null = null;

export async function getTwitchAccessToken(clientID: any, clientSecret: any): Promise<string> {
	const now = Date.now();
	if (cachedToken && tokenExpiresAt && now < tokenExpiresAt) {
		return cachedToken;
	}

	const res = await fetch("https://id.twitch.tv/oauth2/token", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({
			client_id: clientID!,
			client_secret: clientSecret!,
			grant_type: "client_credentials",
		}),
	});

	const json = await res.json();

	cachedToken = json.access_token;
	tokenExpiresAt = now + json.expires_in * 1000 - 60 * 1000; // 1分早めに失効と見なす

	return cachedToken!;
}

export async function searchChannels(
	token: string,
	clientID: string,
	query: string,
	options?: {
		liveOnly?: boolean;
		first?: number;
	}
): Promise<TwitchSearchChannelsResponse> {
	const { liveOnly = false, first = 20 } = options ?? {};
	const url = `https://api.twitch.tv/helix/search/channels?query=${encodeURIComponent(query)}&live_only=${liveOnly}&first=${first}`;

	const res = await fetch(url, {
		headers: {
			"Authorization": `Bearer ${token}`,
			"Client-ID": clientID,
		},
	});

	return await res.json() as TwitchSearchChannelsResponse;
}

export async function getStreams(
	token: string,
	clientID: string,
	options: {
		userId?: string | string[],
		userLogin?: string | string[],
		gameId?: string | string[],
		type?: "live" | "all",
		language?: string | string[],
		first?: number
	}
): Promise<TwitchGetStreamsResponse> {
	const url = new URL("https://api.twitch.tv/helix/streams");
	if (options.userId) {
		if (Array.isArray(options.userId)) {
			options.userId.forEach(id => url.searchParams.append("user_id", id));
		} else {
			url.searchParams.append("user_id", options.userId);
		}
	}
	options.userLogin && url.searchParams.append("user_login", Array.isArray(options.userLogin) ? options.userLogin.join(",") : options.userLogin);
	options.gameId && url.searchParams.append("game_id", Array.isArray(options.gameId) ? options.gameId.join(",") : options.gameId);
	options.type && url.searchParams.append("type", options.type);
	options.language && url.searchParams.append("language", Array.isArray(options.language) ? options.language.join(",") : options.language);
	options.first && url.searchParams.append("first", String(options.first));

	const res = await fetch(url.toString(), {
		headers: {
			"Authorization": `Bearer ${token}`,
			"Client-ID": clientID!,
		},
	});

	return await res.json() as TwitchGetStreamsResponse;
}

