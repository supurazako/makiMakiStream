import { useAtom, useAtomValue } from "jotai";
import { selectedLayoutTypeAtom, videoDataListAtom } from "~/atoms";
import { LayoutType } from "~/models/layoutOption";

export function LayoutSelectButton({ value }: { value: LayoutType }) {
	const [selected, setSelected] = useAtom(selectedLayoutTypeAtom);
	const isSelected = selected === value;
	const videoDataList = useAtomValue(videoDataListAtom);
	const videoCount = videoDataList.length;

	return (
		<button className={`layout-select-button${isSelected ? " selected" : ""}`}
			onClick={() => setSelected(value)}
			type="button"
			data-value={`${videoCount}${value}`}>
		</button>
	);
}
