export interface VideoModel {
	isPlaying(): boolean;
	play(): void;
	pause(): void;
	togglePlaying(): void;
	isMuted(): boolean;
	setMuted(muted: boolean): void;
	toggleMuted(): void;
	getVolume(): number;
	setVolume(volume: number): void;
	getPlatform(): "twitch" | "youtube";
}
