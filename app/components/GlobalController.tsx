import { useAtomValue } from "jotai";
import { allPlayerModelsAtom } from "~/atoms";
import { GlobalPlayControl } from "./GlobalPlayControl";
import { GlobalMuteControl } from "./GlobalMuteControl";

import "~/styles/global-controller.css";

export function GlobalController(): JSX.Element {
	const allPlayers = useAtomValue(allPlayerModelsAtom);

	return (
		<section className="global-controller" aria-label="グローバルコントローラ">
			<GlobalPlayControl players={allPlayers} />
			<GlobalMuteControl players={allPlayers} />
		</section >
	)
}
