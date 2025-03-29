import { useAtomValue } from "jotai";
import { useContext, useEffect, useState } from "react";
import { videoListAtom } from "~/atoms";
import "~/components/video_controllers.css";
import { Video } from "~/interfaces";
import { AddVideoModalContext, VideoListContext } from "~/routes/dev.video_controllers";

export function VideoControllersContainer(): JSX.Element {
    const videoList = useAtomValue(videoListAtom);

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
            <p>{"isPlaying: " + video.isPlaying().toString() + " / volume: " + (video.getVolume())}</p>
            <input className="url"></input>
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
        <button
            className={"control_button play_control" + (isPlaying ? " is_playng" : "")}
            type="button"
            onClick={togglePlaying}>
        </button>
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
        <div className="volume_control">
            <button className="control_button volume_button" onClick={handleClick} />
            <input
                className="volume_slider"
                type="range"
                max={1.0} min={0.0} step={0.1} value={value}
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
        <button className="control_button remove_control" type="button" onClick={handleClick} />
    );
}

function AddVideoButton(): JSX.Element {
    const { setOpen } = useContext(AddVideoModalContext);

    function handleClick() {
        setOpen(true);
    }

    return (
        <button className="add_video_button" type="button" onClick={handleClick}>+</button>
    );
}
