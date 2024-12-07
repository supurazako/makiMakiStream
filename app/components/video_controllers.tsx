import "~/components/video_controllers.css"

export function VideoControllersContainer(): JSX.Element {
    return (
        <div className="video_controllers_container">
            <VideoController />
        </div>
    );
}

function VideoController(): JSX.Element {
    return (
        <div className="video_controller">
            <input className="url"></input>
            <div className="controls">
                <button className="control play"></button>
                <button className="control volume"></button>
                <button className="control remove"></button>
            </div>
        </div>
    );
}