import YoutubePlayer from "~/components/YoutubeBox"; // Ensure this is a valid React component
import { Video } from "~/interfaces";

export class YoutubeVideoModel implements Video {
	private videoId: string; // Default video ID
	private player: YT.Player | null = null;

	constructor(videoId: string) {
		this.videoId = videoId;
	}

	isPlaying(): boolean {
		if (!this.player) {
			return false;
		}
		return this.player?.getPlayerState() === YT.PlayerState.PLAYING;
	}

	play(): void {
		this.player?.playVideo();
	}

	pause(): void {
		this.player?.pauseVideo();
	}

	togglePlaying(): void {
		if (this.isPlaying()) {
			this.pause();
		} else {
			this.play();
		}
	}

	isMuted(): boolean {
		return this.player?.isMuted() ?? false;
	}

	setMuted(muted: boolean): void {
		if (muted) {
			this.player?.mute();
		} else {
			this.player?.unMute();
		}
	}

	toggleMuted(): void {
		this.setMuted(!this.isMuted());
	}

	getVolume(): number {
		return (this.player?.getVolume() ?? 0) / 100.0;
	}

	setVolume(volume: number): void {
		this.player?.setVolume(volume * 100.0);
	}

	createElement(elementID: string): JSX.Element {
		return (
			<YoutubePlayer videoId={this.videoId} onReady={event => this.player = event.target} />
		);
	}
}
