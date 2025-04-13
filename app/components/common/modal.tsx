
import "~/components/common/modal.css";

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
