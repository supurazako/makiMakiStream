import { useContext } from "react";
import "~/components/video_controllers.css"
import { Video, VideoTest } from "~/interfaces";
import { VideoListContext } from "~/routes/dev.video_controllers";


export function VideoControllersContainer(): JSX.Element {
    const { videoList } = useContext(VideoListContext);

    return (
        <div className="video_controllers_container">
            {videoList.map((v, i) => <VideoController video={v} index={i} key={i} />)}
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
    // テスト用コード
    const { videoList, setVideoList } = useContext(VideoListContext);

    function handleSlideVolume(e: React.ChangeEvent<HTMLInputElement>) {
        // テスト用コードここから
        const newList = videoList.map((v) => {
            if ((v as VideoTest).id === (video as VideoTest).id) {
                return new VideoTest(v.isPlaying(), Number(e.target.value), (v as VideoTest).id)
            } else {
                return v;
            }
        })

        setVideoList(newList);
        // テスト用コードここまで
    }

    return (
        <div className="volume_control">
            <button className="control_button volume_button"></button>
            <input
                className="volume_slider"
                type="range"
                max={1.0} min={0.0} step={0.1} defaultValue={video.getVolume()}
                onChange={handleSlideVolume}>
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