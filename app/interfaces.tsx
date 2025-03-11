// TODO: インターフェースの構造、場所など要検討

import { TwitchStreamContainer } from "./components/twitchStreamContainer";

export interface Video {
    isPlaying(): boolean;
    play(): void;
    pause(): void;
    togglePlaying(): void;
    isMuted(): boolean;
    setMuted(muted: boolean): void;
    toggleMuted(): void;
    getVolume(): number;
    setVolume(volume: number): void;
    createElement(elementID: string): JSX.Element;
}

export class TwitchVideo implements Video {
    private channel: string;
    private instance: Twitch.Player | null = null;

    constructor(channel: string) {
        this.channel = channel;
    }

    isPlaying(): boolean {
        return !(this.instance?.isPaused() ?? false);
    }

    play(): void {
        this.instance?.play();
    }
    
    pause(): void {
        this.instance?.pause();
    }

    togglePlaying(): void {
        this.isPlaying() ? this.pause() : this.play();
    }

    isMuted(): boolean {
        return this.instance?.getMuted() ?? false;
    }

    setMuted(muted: boolean): void {
        this.instance?.setMuted(muted);
    }

    toggleMuted(): void {
        this.setMuted(!this.isMuted());
    }

    getVolume(): number {
        return this.instance?.getVolume() ?? 0.0;
    }

    setVolume(volume: number): void {
        this.instance?.setVolume(volume);
    }

    createElement(): JSX.Element {
        return <TwitchStreamContainer channel={this.channel} onLoad={(player: Twitch.Player) => {
            this.instance = player;
        }} />;
    }
}

export class VideoTest implements Video {
    literal: string;

    /**
     * テスト用。Videoはstateに保存されます。stateではオブジェクトはミュータブルとして扱われるので、テスト用コードでは
     * 毎回この変数を書き換えた新しいクラスを作って「置き換えて」います。
     * 実際のストリーム用クラスでは再生中かどうかや・音量といった情報はクラス内に保持せず、その都度APIで取得する感じになる（たぶん）はず。
     */
    isPlayingTest: boolean;
    volume: number;
    id: number;

    constructor(isPlayingTest: boolean, volume: number, id: number) {
        this.literal = ""
        this.isPlayingTest = isPlayingTest;
        this.volume = volume;
        this.id = id;
    }
    isMuted(): boolean {
        throw new Error("Method not implemented.");
    }
    setMuted(muted: boolean): void {
        throw new Error("Method not implemented.");
    }
    play(): void {
        throw new Error("Method not implemented.");
    }
    pause(): void {
        throw new Error("Method not implemented.");
    }

    createElement(elementID: string): JSX.Element {
        return (<div style={{ border: "3px black solid", width: "50px", height: "50px" }}></div>)
    }

    isPlaying(): boolean {
        return this.isPlayingTest;
    }

    togglePlaying(): void {
        throw new Error("Method not implemented.");
    }

    getVolume(): number {
        return this.volume;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setVolume(volume: number): void {
        throw new Error("Method not implemented.");
    }
}
