import { PlayerEvent, PlayerModel } from "~/models/playerModel";

export class YoutubePlayerModel implements PlayerModel {
	private _player: YT.Player;

	constructor(player: YT.Player) {
		this._player = player;
	}

	public isPlaying(): boolean {
		return this._player.getPlayerState() === YT.PlayerState.PLAYING;
	}

	public play(): void {
		this._player.playVideo();
	}

	public pause(): void {
		this._player.pauseVideo();
	}

	public togglePlaying(): void {
		this.isPlaying() ? this.pause() : this.play();
	}

	public isMuted(): boolean {
		return this._player.isMuted();
	}

	public mute(): void {
		this._player.mute();
	}

	public unmute(): void {
		this._player.unMute();
	}

	public toggleMuted(): void {
		this.isMuted() ? this.unmute() : this.mute();
	}

	public getVolume(): number {
		return this._player.getVolume() / 100.0;
	}

	public setVolume(volume: number): void {
		this._player.setVolume(volume * 100.0);
	}

	private _cleanupMap = new Map<string, () => void>();

	public addEventListener(event: string, callback: () => void): void {
		switch (event) {
			case PlayerEvent.PLAY:
			case PlayerEvent.PAUSE: {
				const handler = (e: YT.OnStateChangeEvent) => {
					if (event === PlayerEvent.PLAY && e.data === YT.PlayerState.PLAYING) {
						callback();
					} else if (event === PlayerEvent.PAUSE && e.data === YT.PlayerState.PAUSED) {
						callback();
					}
				};
				this._player.addEventListener("onStateChange", handler);

				const key = `${event}_${callback.toString()}`;
				this._cleanupMap.set(key, () => this._player.removeEventListener("onStateChange", handler));
				return;
			} case PlayerEvent.MUTE:
			case PlayerEvent.UNMUTE: {
				let last = this.isMuted();
				const interval = setInterval(() => {
					const current = this.isMuted();
					if (current !== last) {
						last = current;
						if (current && event === PlayerEvent.MUTE) {
							callback();
						} else if (!current && event === PlayerEvent.UNMUTE) {
							callback();
						}
					}
				}, 500);

				const key = `${event}_${callback.toString()}`;
				this._cleanupMap.set(key, () => clearInterval(interval));
				return;
			} case PlayerEvent.CHANGE_VOLUME: {
				let last = this.getVolume();
				const interval = setInterval(() => {
					const current = this.getVolume();
					if (current !== last) {
						last = current;
						callback();
					}
				}, 500);

				const key = `${event}_${callback.toString()}`;
				this._cleanupMap.set(key, () => clearInterval(interval));
				return;
			}
		}
	}

	public removeEventListener(event: string, callback: () => void): void {
		const key = `${event}_${callback.toString()}`;
		const cleanup = this._cleanupMap.get(key);
		if (cleanup) {
			cleanup();
			this._cleanupMap.delete(key);
		}
	}
}
