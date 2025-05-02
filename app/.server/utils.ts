let cachedToken: string | null = null;
let tokenExpiresAt: number | null = null;

export async function getTwitchAccessToken(): Promise<string> {
	const now = Date.now();
	if (cachedToken && tokenExpiresAt && now < tokenExpiresAt) {
		return cachedToken;
	}

	const res = await fetch("https://id.twitch.tv/oauth2/token", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({
			client_id: process.env.TWITCH_CLIENT_ID!,
			client_secret: process.env.TWITCH_CLIENT_SECRET!,
			grant_type: "client_credentials",
		}),
	});

	const json = await res.json();

	cachedToken = json.access_token;
	tokenExpiresAt = now + json.expires_in * 1000 - 60 * 1000; // 1分早めに失効と見なす

	return cachedToken!;
}
