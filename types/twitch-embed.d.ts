declare namespace Twitch {
	interface PlayerOptions {
		width?: number | string;
		height?: number | string;
		channel?: string;
		video?: string;
		collection?: string;
		autoplay?: boolean;
		muted?: boolean;
		parent?: string[];
		time?: string;
	}

	class Player {
		constructor(elementId: string, options: PlayerOptions);
		setVolume(volumeLevel: number): void;
		play(): void;
		pause(): void;
		seek(timestamp: number): void;
		getCurrentTime(): number;
		getDuration(): number;
		getMuted(): boolean;
		setMuted(muted: boolean): void;
		getPlaybackStats(): { [key: string]: number | string };
		getQuality(): string;
		setQuality(quality: string): void;
		getQualities(): string[];
		isPaused(): boolean;
	}
}
