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
				// TODO: 動画が追加されてないときのレイアウト選択ボタンの表示をどうするか
				(videoCount == 0) && null
			}
			{
				// TODO: 動画が1つのときのレイアウト選択ボタンの表示をどうするか
				(videoCount == 1) && null
			}
			{
				// TODO: 動画が5つ以上のときのレイアウト選択ボタンの表示をどうするか
				(videoCount > 4) && null
			}
		</div >
	);
}
