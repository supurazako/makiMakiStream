import { useRef, useState } from "react";
import { ShareIcon } from "~/components/common/icons";
import { Toast } from "~/components/common/Toast";

export function ShareButton() {
	const [showToast, setShowToast] = useState(false);
	const [toastPosition, setToastPosition] = useState<{ top: number; left: number; width: number } | null>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const handleCopyClick = () => {
		if (buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			setToastPosition({ top: rect.bottom, left: rect.left, width: rect.width });
		}
		navigator.clipboard.writeText(window.location.href).then(() => {
			setShowToast(true);
		});
	};

	const handleCloseToast = () => {
		setShowToast(false);
		setToastPosition(null);
	};

	return (
		<>
			<button
				ref={buttonRef}
				type="button"
				onClick={handleCopyClick}
				className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
				title="Share current video configuration"
			>
				<ShareIcon className="w-6 h-6 text-white" />
			</button>
			{toastPosition && (
				<Toast
					message="URLをコピーしました！"
					show={showToast}
					onClose={handleCloseToast}
					position={toastPosition}
				/>
			)}
		</>
	);
}
