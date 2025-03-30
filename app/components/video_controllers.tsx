import { useContext, useEffect, useState } from "react";
import { PlayIcon, RemoveIcon, VolumeIcon } from "~/components/common/icons";
import { Video } from "~/interfaces";
import { AddVideoModalContext, VideoListContext } from "~/routes/dev.video_controllers";

import "~/components/video_controllers.css";

export function VideoControllersContainer(): JSX.Element {
    const { videoList } = useContext(VideoListContext);

    return (
        <div className="video_controllers_container">
            {videoList.map((v, i) => <VideoController video={v} index={i} key={i} />)}
            <AddVideoButton />
        </div>
    );
}

function VideoController({ video, index }: { video: Video, index: number }): JSX.Element {
    return (
        <div className="video_controller">
            <div className="labels">
                <div className="icon"></div>
                <input className="url"></input>
            </div>
            <div className="controls">
                <PlayControl video={video}></PlayControl>
                <VolumeControl video={video} />
                <RemoveControl index={index} />
            </div>
        </div>
    );
}

function PlayControl({ video }: { video: Video }): JSX.Element {
    const [isPlaying, setPlaying] = useState(video.isPlaying());

    function togglePlaying() {
        video.togglePlaying();
        setPlaying(video.isPlaying());
    }

    return (
        <div className="control_item play_control">
            <button
                className={"control_button play_button" + (isPlaying ? " is_playng" : "")}
                type="button"
                onClick={togglePlaying}>
                <PlayIcon />
            </button>
        </div>
    );
}

function VolumeControl({ video }: { video: Video }): JSX.Element {
    const [value, setValue] = useState(video.getVolume());

    useEffect(() => {
        const playerElement = document.getElementById("player");
        playerElement?.addEventListener("mousemove", () => {
            setValue(video.getVolume());

        })
    }, [video]);

    function handleClick() {
        video.setMuted(!video.isMuted());
    }

    function handleSlide(e: React.ChangeEvent<HTMLInputElement>) {
        const volume = Number(e.target.value);
        video.setVolume(volume);
        setValue(volume);
    }

    return (
        <div className="control_item volume_control">
            <button className="control_button volume_button" onClick={handleClick}>
                <VolumeIcon />
            </button>
            <input
                className="volume_slider"
                type="range"
                max={1.0} min={0.0} step={0.01} value={value}
                onChange={handleSlide}>
            </input>
        </div>
    );
}

function RemoveControl({ index }: { index: number }): JSX.Element {
    const { videoList, setVideoList } = useContext(VideoListContext);

    function handleClick() {
        setVideoList(videoList.filter((v, i) => i !== index))
    }

    return (
        <div className="control_item remove_control">
            <button className="control_button remove_button" type="button" onClick={handleClick}>
                <RemoveIcon />
            </button>
        </div>
    );
}

function AddVideoButton(): JSX.Element {
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
