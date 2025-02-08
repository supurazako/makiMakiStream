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
		isPaused(): boolean;
		play(): void;
		pause(): void;
		getMuted(): boolean;
		setMuted(muted: boolean): void;
		getVolume(): number;
		setVolume(volumeLevel: number): void;
	}
}
