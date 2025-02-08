import { useContext, useEffect, useState } from "react";
import "~/components/video_controllers.css"
import { Video, VideoTest } from "~/interfaces";
import { AddVideoModalContext, VideoListContext } from "~/routes/dev.video_controllers";

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
    // テスト用コード
    const { videoList, setVideoList } = useContext(VideoListContext);

    function togglePlaying() {
        // video.togglePlaying();

        // テスト用コード
        const newList = videoList.map((v) => {
            if ((v as VideoTest).id === (video as VideoTest).id) {
                return new VideoTest(!v.isPlaying(), v.getVolume(), (v as VideoTest).id)
            } else {
                return v;
            }
        })

        setVideoList(newList);
        // テスト用コードここまで
    }

    return (
        <button
            className={"control_button play_control" + (video.isPlaying() ? " is_playng" : "")}
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

    function handleSlide(e: React.ChangeEvent<HTMLInputElement>) {
        const volume = Number(e.target.value);
        video.setVolume(volume);
        setValue(volume);
    }

    return (
        <div className="volume_control">
            <button className="control_button volume_button" />
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
