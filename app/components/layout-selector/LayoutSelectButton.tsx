import { useAtom, useAtomValue } from "jotai";
import { selectedLayoutTypeAtom, videoDataListAtom } from "~/atoms";
import { IconLayoutOption2A, IconLayoutOption2B, IconLayoutOption2C, LayoutOption3AIcon, LayoutOption3BIcon, LayoutOption3CIcon, LayoutOption4AIcon, LayoutOption4BIcon, LayoutOption4CIcon } from "~/components/common/icons";
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
			{
				(videoCount === 2 || videoCount === 3 || videoCount === 4) && getIcon(videoCount, value)
			}
		</button>
	);
}

function getIcon(videoCount: 2 | 3 | 4, type: LayoutType): JSX.Element | null {
	switch (videoCount) {
		case 2: switch (type) {
			case "A": return <IconLayoutOption2A />;
			case "B": return <IconLayoutOption2B />;
			case "C": return <IconLayoutOption2C />;
			default: return null;
		}
		case 3: switch (type) {
			case "A": return <LayoutOption3AIcon />;
			case "B": return <LayoutOption3BIcon />;
			case "C": return <LayoutOption3CIcon />;
			default: return null;
		}
		case 4: switch (type) {
			case "A": return <LayoutOption4AIcon />;
			case "B": return <LayoutOption4BIcon />;
			case "C": return <LayoutOption4CIcon />;
			default: return null;
		}
	}
}
