import { useAtomValue, useSetAtom } from "jotai";
import { Suspense, useContext, useEffect, useState } from "react";
import { muteStateAtom, playerModelAtom, playStateAtom, videoDataListAtom, volumeStateAtom } from "~/atoms";
import { PlayIcon, RemoveIcon, VolumeIcon } from "~/components/common/icons";
import { VideoDataModel } from "~/models/videoDataModel";
import { AddVideoModalContext } from "~/routes/dev.video_controllers";

// import "~/components/video_controllers.css";
import { PlayerModel } from "~/models/playerModel";

export function VideoControllersContainer(): JSX.Element {
    const videoDataList = useAtomValue(videoDataListAtom);

    // TODO: サスペンス中のコントローラーのスタイルを実装する
    return (
        <div className="video_controllers_container">
            {
                videoDataList.map((v, i) => {
                    return (
                        <Suspense key={i} fallback={"Loading..."}>
                            <VideoController data={v} />
                        </Suspense>
                    );
                })
            }
            <AddVideoButton />
        </div>
    );
}

function VideoController({ data }: { data: VideoDataModel }): JSX.Element {
    const player = useAtomValue(playerModelAtom(data));

    return (
        <div className="video_controller">
            <div className="labels">
                <div className="icon"></div>
                <input className="url"></input>
            </div>
            <div className="controls">
                <PlayControl player={player}></PlayControl>
                <VolumeControl player={player} />
                <RemoveControl data={data} />
            </div>
        </div>
    );
}

function PlayControl({ player }: { player: PlayerModel }): JSX.Element {
    const [isPlaying, setPlaying] = useState(player.isPlaying());
    const actualPlaying = useAtomValue(playStateAtom(player));

    useEffect(() => {
        setPlaying(actualPlaying);
    }, [actualPlaying]);

    function togglePlaying() {
        player.togglePlaying();
    }

    return (
        <div className="control_item play_control">
            <button
                className={"control_button play_button" + (isPlaying ? " is_playng" : "")}
                type="button"
                onClick={togglePlaying}>
                <PlayIcon />
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    );
}

function VolumeControl({ player }: { player: PlayerModel }): JSX.Element {
    const [isMuted, setMuted] = useState(player.isMuted());
    const actualMuted = useAtomValue(muteStateAtom(player));
    const [volume, setVolume] = useState(player.getVolume());
    const actualVolume = useAtomValue(volumeStateAtom(player));

    useEffect(() => {
        setMuted(actualMuted);
    }, [actualMuted]);

    useEffect(() => {
        setVolume(actualVolume);
    }, [actualVolume]);

    function toggleMuted() {
        player.toggleMuted();
        setMuted((prev) => !prev);
    }

    function handleSlide(e: React.ChangeEvent<HTMLInputElement>) {
        const value = Number(e.target.value);
        player.setVolume(value);
        setVolume(value);
        player.unmute();
        setMuted(false);
    }

    return (
        <div className="control_item volume_control">
            <button className="control_button volume_button" onClick={toggleMuted} >
                <VolumeIcon />
            </button>
            <input
                className="volume_slider"
                type="range"
                max={1.0} min={0.0} step={0.01} value={isMuted ? 0 : volume}
                onChange={handleSlide}>
            </input>
        </div>
    );
}

function RemoveControl({ data }: { data: VideoDataModel }): JSX.Element {
    const setVideoDataList = useSetAtom(videoDataListAtom);

    function handleClick() {
        setVideoDataList((prev) => {
            return prev.filter((v) => v !== data);
        });
    }

    return (
        <div className="control_item remove_control">
            <button className="control_button remove_button" type="button" onClick={handleClick}>
                <RemoveIcon />
            </button>
        </div>
    );
}

export function AddVideoButton(): JSX.Element {
    const { setOpen } = useContext(AddVideoModalContext);

    function handleClick() {
        setOpen(true);
    }

    return (
        <div className="add_video_button_container">
            <button className="add_video_button" type="button" onClick={handleClick}>
                <PlusClipIcon />
            </button>
        </div>
    );
}


export function PlusClipIcon() {
    return <svg width="0" height="0" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="plus_clip_icon" clipPathUnits="objectBoundingBox">
            <path d="M27.5001 17.0833H17.0834V27.5C17.0834 28.6458 16.1459 29.5833 15.0001 29.5833C13.8542 29.5833 12.9167 28.6458 12.9167 27.5V17.0833H2.50008C1.35425 17.0833 0.416748 16.1458 0.416748 15C0.416748 13.8542 1.35425 12.9167 2.50008 12.9167H12.9167V2.49999C12.9167 1.35416 13.8542 0.416656 15.0001 0.416656C16.1459 0.416656 17.0834 1.35416 17.0834 2.49999V12.9167H27.5001C28.6459 12.9167 29.5834 13.8542 29.5834 15C29.5834 16.1458 28.6459 17.0833 27.5001 17.0833Z"
                transform="scale(0.033)" />
        </clipPath>
    </svg>
}
