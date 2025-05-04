declare module "twitch-api" {
	export type TwitchSearchChannelsResponse = {
		data: TwitchChannel[];
	}

	export type TwitchGetStreamsResponse = {
		data: TwitchStream[];
	}

	export type TwitchChannel = {
		broadcaster_language: string;
		broadcaster_login: string;
		display_name: string;
		game_id: string;
		game_name: string;
		id: string;
		is_live: boolean;
		tags: string[];
		thumbnail_url: string;
		title: string;
		started_at: string;
	}

	export type TwitchStream = {
		id: string;
		user_id: string;
		user_login: string;
		user_name: string;
		game_id: string;
		game_name: string;
		type: "live" | "";
		title: string;
		tags: string[];
		viewer_count: number;
		started_at: string;
		language: string;
		thumbnail_url: string;
		is_mature: boolean;
	}
}
