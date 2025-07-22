import {
	AnimatePresence,
	motion,
	useAnimationControls,
	useReducedMotion,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ToastProps = {
	message: string;
	show: boolean;
	onClose: () => void;
	position: { top: number; left: number; width: number } | null;
};

export function Toast({ message, show, onClose, position }: ToastProps) {
	const controls = useAnimationControls();
	const prefersReducedMotion = useReducedMotion();
	const timeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		if (show) {
			controls.start("show");
			timeoutRef.current = setTimeout(() => {
				onClose();
			}, 3000); // 3秒後に非表示
		} else {
			controls.start("hide");
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [show, controls, onClose]);

	const variants = {
		hide: prefersReducedMotion
			? { opacity: 0 }
			: {
					opacity: 0,
					y: 50,
					transition: { duration: 0.2, ease: "easeOut" },
			  },
		show: prefersReducedMotion
			? { opacity: 1 }
			: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.3, ease: "easeOut" },
			  },
	};

	const toastStyle = position
		? {
				position: "fixed",
				top: position.top + 20, // ボタンの下に20pxのオフセット
				left: position.left + position.width / 2, // ボタンの中央に配置
				transform: "translateX(-50%)", // Toast自体を中央揃え
		  }
		: {};

	return createPortal(
		<AnimatePresence>
			{show && (
				<motion.div
					variants={variants}
					initial="hide"
					animate={controls}
					exit="hide"
					className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50"
					style={toastStyle}
				>
					{message}
				</motion.div>
			)}
		</AnimatePresence>,
		document.body,
	);
}
