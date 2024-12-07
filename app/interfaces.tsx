// TODO: インターフェースの構造、場所など要検討

export interface Video {
    literal: string;

    isPlaying(): boolean;
    togglePlaying(): void;
}

export class VideoTest implements Video {
    literal: string;

    /**
     * テスト用。Videoはstateに保存されます。stateではオブジェクトはミュータブルとして扱われるので、テスト用コードでは
     * 毎回この変数を書き換えた新しいクラスを作って「置き換えて」います。
     * 実際のストリーム用クラスでは再生中かどうかや・音量といった情報はクラス内に保持せず、その都度APIで取得する感じになる（たぶん）はず。
     */
    isPlayingTest: boolean;
    id: number;

    constructor(isPlayingTest: boolean, id: number) {
        this.literal = ""
        this.isPlayingTest = isPlayingTest;
        this.id = id;
    }

    isPlaying(): boolean {
        return this.isPlayingTest;
    }

    togglePlaying(): void {
        throw new Error("Method not implemented.");
    }
}
