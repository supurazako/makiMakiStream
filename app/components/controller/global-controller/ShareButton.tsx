import { ShareIcon } from "~/components/common/icons";

export function ShareButton() {
	const handleCopyClick = () => {
		navigator.clipboard.writeText(window.location.href).then(() => {
			alert("URLをコピーしました！");
		});
	};

	return (
		<button
			type="button"
			onClick={handleCopyClick}
			className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
			title="Share current video configuration"
		>
			<ShareIcon className="w-6 h-6 text-white" />
		</button>
	);
}
