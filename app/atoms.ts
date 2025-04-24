import { atom } from "jotai";
import { atomFamily, atomWithObservable, atomWithReducer, atomWithStorage } from "jotai/utils";
import { LayoutType } from "./models/layoutOption";
import { PlayerEvent, PlayerModel } from "./models/playerModel";
import { VideoDataModel } from "./models/videoDataModel";

/**
 * 追加されている動画のデータを保持するatom。
 * 自動でローカルストレージに保存・読み込みされます。
 */
export const videoDataListAtom = atomWithStorage<VideoDataModel[]>("videoDataList", []);
videoDataListAtom.onMount = (set) => {
    const savedData = localStorage.getItem("videoDataList");
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData) as VideoDataModel[];
            set(parsedData);
        } catch (error) {
            console.error("Failed to parse video data list from localStorage:", error);
        }
    }
}

/**
 * 動画のPromiseとそのResolverを保持するatom。
 * コンポーネントは直接使用できません。
 */
const videoPromiseAtom = atomFamily((data: VideoDataModel) => {
    let resolve: (v: PlayerModel) => void;
    const promise = new Promise<PlayerModel>((r) => {
        resolve = r;
    });

    return atom({
        data: data,
        promise: promise,
        resolve: resolve!,
    });
});

/**
 * 各プレーヤーのインスタンスを生成するコンポーネントはこのatomを使用してください。
 * 生成したインスタンスを該当するresolverに渡してください。Read-onlyです。
 */
export const resolverAtom = atomFamily((data: VideoDataModel) => {
    return atom((get) => {
        const promiseList = get(videoPromiseAtom(data));
        return promiseList.resolve;
    });
})

/**
 * 動画のプレーヤーを取得する必要がある場合はこのatomを使用してください。
 * 再生・停止、音量変更などの操作(write)にはこのatomを使用してください。
 * それらの値を読み取り(read)UIを更新する場合は、playStateAtomやvolumeStateAtomを使用してください。
 */
export const playerModelAtom = atomFamily((data: VideoDataModel) => {
    return atom(async (get) => {
        const promiseList = get(videoPromiseAtom(data));
        return await promiseList.promise;
    });
});

/**
 * 動画のプレーヤーの再生・停止状態を取得するatom。
 * PlayerModelからの操作、ユーザーによる埋め込みの操作など、プレーヤーのインスタンスの状態更新を感知し、値を更新します。
 * プレーヤーのインスタンスを変更する必要がある場合は、直接PlayerModelインスタンスのメソッドを使用してください。
 */
export const playStateAtom = atomFamily((player: PlayerModel) => atomWithObservable<boolean>(() => {
    return {
        subscribe(observer: { next: (value: boolean) => void }) {
            observer.next(player.isPlaying());

            const onPlay = () => observer.next(true);
            const onPause = () => observer.next(false);

            player.addEventListener(PlayerEvent.PLAY, onPlay);
            player.addEventListener(PlayerEvent.PAUSE, onPause);

            return {
                unsubscribe: () => {
                    player.removeEventListener(PlayerEvent.PLAY, onPlay);
                    player.removeEventListener(PlayerEvent.PAUSE, onPause);
                }
            };
        }
    }
}));

/**
 * 動画のプレーヤーのミュート状態を取得するatom。
 * PlayerModelからの操作、ユーザーによる埋め込みの操作など、プレーヤーのインスタンスの状態更新を感知し、値を更新します。
 * プレーヤーのインスタンスを変更する必要がある場合は、直接PlayerModelインスタンスのメソッドを使用してください。
 */
export const muteStateAtom = atomFamily((player: PlayerModel) => atomWithObservable<boolean>(() => {
    return {
        subscribe(observer: { next: (value: boolean) => void }) {
            observer.next(player.isMuted());

            const onMute = () => observer.next(true);
            const onUnmute = () => observer.next(false);

            player.addEventListener(PlayerEvent.MUTE, onMute);
            player.addEventListener(PlayerEvent.UNMUTE, onUnmute);

            return {
                unsubscribe: () => {
                    player.removeEventListener(PlayerEvent.MUTE, onMute);
                    player.removeEventListener(PlayerEvent.UNMUTE, onUnmute);
                }
            };
        }
    }
}));

/**
 * 動画のプレーヤーの音量を取得するatom。
 * PlayerModelからの操作、ユーザーによる埋め込みの操作など、プレーヤーのインスタンスの状態更新を感知し、値を更新します。
 * プレーヤーのインスタンスを変更する必要がある場合は、直接PlayerModelインスタンスのメソッドを使用してください。
 */
export const volumeStateAtom = atomFamily((player: PlayerModel) => atomWithObservable<number>(() => {
    return {
        subscribe(observer: { next: (value: number) => void }) {
            observer.next(player.getVolume());

            const onVolumeChange = () => observer.next(player.getVolume());

            player.addEventListener(PlayerEvent.CHANGE_VOLUME, onVolumeChange);

            return {
                unsubscribe: () => {
                    player.removeEventListener(PlayerEvent.CHANGE_VOLUME, onVolumeChange);
                }
            };
        }
    }
}));

export const allPlayerModelsAtom = atom(async (get) => {
    const dataList = get(videoDataListAtom);
    return await Promise.all(dataList.map((data) => get(playerModelAtom(data))));
});

export const allPlayStateAtom = atom(async (get) => {
    const dataList = get(videoDataListAtom);
    const players = await Promise.all(dataList.map((data) => get(playerModelAtom(data))));
    return await Promise.all(players.map((player) => get(playStateAtom(player))));
});

export const allMuteStateAtom = atom(async (get) => {
    const dataList = get(videoDataListAtom);
    const players = await Promise.all(dataList.map((data) => get(playerModelAtom(data))));
    return await Promise.all(players.map((player) => get(muteStateAtom(player))));
});

type ModalAction = {
    type: "open";
    content: JSX.Element;
} | {
    type: "close";
};

export const modalContentAtom = atomWithReducer<JSX.Element | null, ModalAction>(null, (_prev: JSX.Element | null, action: ModalAction) => {
    switch (action.type) {
        case "open":
            return action.content;
        case "close":
            return null;
        default:
            throw new Error("Unknown action type");
    }
});

export const selectedLayoutTypeAtom = atom<LayoutType>("A");
