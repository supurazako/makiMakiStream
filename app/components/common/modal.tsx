
import { useAtom } from "jotai";
import { createPortal } from "react-dom";
import { modalContentAtom } from "~/atoms";

import "~/styles/common/modal.css";

export function Modal(): JSX.Element | null {
    const [modalContent, dispatchModalContent] = useAtom(modalContentAtom);

    if (!modalContent) return null;

    return createPortal(
        <>
            <Overlay closeModal={() => dispatchModalContent({ type: "close" })} />
            <div className="modal-content">
                {modalContent}
            </div>
        </>,
        document.body
    )
}

function Overlay({ closeModal }: { closeModal: () => void }): JSX.Element {
    function handleClick(): void {
        closeModal();
    }

    function handleKeyDown(e: React.KeyboardEvent): void {
        if (e.key === "Escape") {
            closeModal();
        }
    }

    return (
        <div className="modal-overlay"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown} />
    );
}
