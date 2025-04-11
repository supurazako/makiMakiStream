import { PlayerEvent, PlayerModel } from "~/models/playerModel";

export class TwitchPlayerModel implements PlayerModel {
	private readonly _player: Twitch.Player;

	public constructor(player: Twitch.Player) {
		this._player = player;
	}

	public isPlaying(): boolean {
		return !this._player.isPaused();
	}

	public play(): void {
		this._player.play();
	}

	public pause(): void {
		this._player.pause();
	}

	public togglePlaying(): void {
		this.isPlaying() ? this.pause() : this.play();
	}

	public isMuted(): boolean {
		return this._player.getMuted();
	}

	public mute(): void {
		this._player.setMuted(true);
	}

	public unmute(): void {
		this._player.setMuted(false);
	}

	public toggleMuted(): void {
		this.isMuted() ? this.unmute() : this.mute();
	}

	public getVolume(): number {
		return this._player.getVolume();
	}

	public setVolume(volume: number): void {
		this._player.setVolume(volume);
	}

	private _cleanupMap = new Map<string, () => void>();

	public addEventListener(event: string, callback: () => void): void {
		let eventName = event;
		switch (event) {
			case PlayerEvent.PLAY: {
				eventName = Twitch.Player.PLAY;
				break;
			} case PlayerEvent.PAUSE: {
				eventName = Twitch.Player.PAUSE;
				break;
			} case PlayerEvent.MUTE: {
				let lastMuted = this.isMuted();

				const interval = setInterval(() => {
					const currentMuted = this.isMuted();

					if (currentMuted && !lastMuted) {
						callback();
					}

					lastMuted = currentMuted;
				}, 500);

				const key = `${event}_${callback.toString()}`;
				this._cleanupMap.set(key, () => clearInterval(interval));
				return;
			} case PlayerEvent.UNMUTE: {
				let lastMuted = this.isMuted();

				const interval = setInterval(() => {
					const currentMuted = this.isMuted();

					if (!currentMuted && lastMuted) {
						callback();
					}

					lastMuted = currentMuted;
				}, 500);

				const key = `${event}_${callback.toString()}`;
				this._cleanupMap.set(key, () => clearInterval(interval));
				return;
			} case PlayerEvent.CHANGE_VOLUME: {
				let lastVolume = this.getVolume();

				const interval = setInterval(() => {
					const currentVolume = this.getVolume();

					if (currentVolume !== lastVolume) {
						callback();
					}

					lastVolume = currentVolume;
				}, 500);

				const key = `${event}_${callback.toString()}`;
				this._cleanupMap.set(key, () => clearInterval(interval));
				return;
			} default: {
				throw new Error(`Unsupported event: ${event}`);
			}
		}

		this._player.addEventListener(eventName, callback);
	}

	public removeEventListener(event: string, callback: () => void): void {
		let eventName = event;
		switch (event) {
			case PlayerEvent.PLAY: {
				eventName = Twitch.Player.PLAY;
				break;
			} case PlayerEvent.PAUSE: {
				eventName = Twitch.Player.PAUSE;
				break;
			} case PlayerEvent.MUTE:
			case PlayerEvent.UNMUTE:
			case PlayerEvent.CHANGE_VOLUME: {
				const key = `${event}_${callback.toString()}`;
				const cleanup = this._cleanupMap.get(key);
				if (cleanup) {
					cleanup();
					this._cleanupMap.delete(key);
				}
				return;
			} default: {
				throw new Error(`Unsupported event: ${event}`);
			}
		}

		this._player.removeEventListener(eventName, callback);
	}
}
