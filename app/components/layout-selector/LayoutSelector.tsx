import { useAtomValue } from "jotai";
import { videoDataListAtom } from "~/atoms";
import { LayoutSelectButton } from "./LayoutSelectButton";

import "~/styles/layout-selector.css";

export function LayoutSelector() {
	const videoDataList = useAtomValue(videoDataListAtom);
	const videoCount = videoDataList.length;

	return (
		<div className="layout-selector-container">
			{
				(2 <= videoCount && videoCount <= 4) && <div className="layout-selector">
					<LayoutSelectButton value="A" />
					<LayoutSelectButton value="B" />
					<LayoutSelectButton value="C" />
				</div>
			}
			{
				(videoCount == 1) && <div className="layout-selector">
					<LayoutSelectButton value="A" />
				</div>
			}
			{
				(videoCount > 4) && <div className="layout-selector">
					<LayoutSelectButton value="A" />
				</div>
			}
		</div >
	);
}
