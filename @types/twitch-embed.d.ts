declare namespace Twitch {
	type PlayerOptions = {

		/**
		 * Required Parameters
		 */
		channel?: string;
		video?: string;
		collection?: string;
		height?: number | string;
		parent?: string[];
		width?: number | string;

		/**
		 * Optional Parameters
		 */
		autoplay?: boolean;
		muted?: boolean;
		time?: string;
	}

	class Player {
		public constructor(elementId: string, options: PlayerOptions);

		/**
		 * Synchronous JavaScript Playback API
		 */
		public disableCaptions(): void;
		public enableCaptions(): void;
		public pause(): void;
		public play(): void;
		public seek(timestamp: number): void;
		public setChannel(channel: string): void;
		public setCollection(collectionId: string, videoId: string): void;
		public setQuality(quality: string): void;
		public setVideo(videoId: string, timestamp: number): void;

		/**
		 * Synchronous JavaScript Volume API
		 */
		public getMuted(): boolean;
		public setMuted(muted: boolean): void;
		public getVolume(): number;
		public setVolume(volumeLevel: number): void;

		/**
		 * Synchronous JavaScript Status API
		 */
		public getPlaybackStats(): PlaybackStatus;
		public getChannel(): string;
		public getCurrentTime(): number;
		public getDuration(): number;
		public getEnded(): boolean;
		public getQualities(): string[];
		public getQuality(): string;
		public getVideo(): string;
		public isPaused(): boolean;

		/**
		 * JavaScript Events
		 */
		public addEventListener(event: string, callback: (event: unknown) => void): void;
		public removeEventListener(event: string, callback: (event: unknown) => void): void;
		public static readonly const CAPTIONS: string;
		public static readonly const ENDED: string;
		public static readonly const PAUSE: string;
		public static readonly const PLAY: string;
		public static readonly const PLAYBACK_BLOCKED: string;
		public static readonly const PLAYING: string;
		public static readonly const OFFLINE: string;
		public static readonly const ONLINE: string;
		public static readonly const READY: string;
		public static readonly const SEEK: string;
	}

	type PlaybackStatus = {
		backendVersion: string;
		bufferSize : number;
		codecs: string;
		displayResolution: string;
		fps: number;
		hlsLatencyBroadcaster: number;
		playbackRate: number;
		slippedFrames: number;
		videoResolution: string;
	}
}
