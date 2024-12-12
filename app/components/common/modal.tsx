
import { FormEvent, useContext } from "react";
import "~/components/common/modal.css"
import { AddVideoModalContext, VideoListContext } from "~/routes/dev.video_controllers";

export default function Modal({ isOpen, children }: { isOpen: boolean, children: JSX.Element }): JSX.Element {
    if (isOpen) {
        return (
            <div className="overlay">
                <div className="modal_container">
                    {children}
                </div>
            </div>
        );
    } else {
        return <></>
    }
}


export function AddVideoModal(): JSX.Element {
    const { videoList, setVideoList } = useContext(VideoListContext);
    const { isOpen, setOpen } = useContext(AddVideoModalContext);

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        const form = new FormData(event.target);
        const video_url = form.get("video_url");
        alert("video" + video_url)

        closeModal();
    }

    function handleClose(): void {
        closeModal();
    }

    function closeModal() {
        setOpen(false);
    }

    return (
        <Modal isOpen={isOpen}>
            <form method="post" onSubmit={handleSubmit}>
                <label>
                    URL: <input type="text" name="video_url" />
                </label>
                <button type="button" onClick={handleClose}>Close</button>
                <button type="submit">Submit</button>
            </form>
        </Modal>
    );
}
