import { useContext } from "react";
import "~/components/video_controllers.css"
import { Video, VideoTest } from "~/interfaces";
import { VideoListContext } from "~/routes/dev.video_controllers";


export function VideoControllersContainer(): JSX.Element {
    const {videoList, setVideoList} = useContext(VideoListContext);

    return (
        <div className="video_controllers_container">
            {videoList.map((v, i) => <VideoController video={v} key={i} />)}
        </div>
    );
}

function VideoController({ video }: { video: Video }): JSX.Element {
    return (
        <div className="video_controller">
            <p>{(video as VideoTest).isPlaying().toString()}</p>
            <input className="url"></input>
            <div className="controls">
                <PlayControl video={video}></PlayControl>
                <button className="control volume"></button>
                <button className="control remove"></button>
            </div>
        </div>
    );
}

function PlayControl({ video }: { video: Video }): JSX.Element {
    // テスト用コード
    const {videoList, setVideoList} = useContext(VideoListContext);
    
    function togglePlaying() {
        // video.togglePlaying();

        // テスト用コード
        const newList = videoList.map((v) => {
            if ((v as VideoTest).id === (video as VideoTest).id) {
                return new VideoTest(!v.isPlaying(), (v as VideoTest).id);
            } else {
                return v;
            }
        })

        setVideoList(newList);
        // テスト用コードここまで
    }
    
    return (
        <button
            className={"control play_control" + (video.isPlaying() ? " is_playng" : "")}
            type="button"
            onClick={togglePlaying}>
        </button>
    );
}