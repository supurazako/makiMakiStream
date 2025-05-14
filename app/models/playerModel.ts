export interface PlayerModel {
	isPlaying(): boolean;
	play(): void;
	pause(): void;
	togglePlaying(): void;
	isMuted(): boolean;
	mute(): void;
	unmute(): void;
	toggleMuted(): void;
	getVolume(): number;
	setVolume(volume: number): void;
	getTitle(): string;
	getChannelName(): string;
	addEventListener(event: string, callback: () => void): void;
	removeEventListener(event: string, callback: () => void): void;
}

export const PlayerEvent = {
	PLAY: "play",
	PAUSE: "pause",
	MUTE: "mute",
	UNMUTE: "unmute",
	CHANGE_VOLUME: "change_volume",
} as const;
