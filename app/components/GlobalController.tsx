import { useAtomValue } from "jotai";
import { allPlayerModelsAtom } from "~/atoms";
import { GlobalPlayControl } from "./GlobalPlayControl";

export function GlobalController(): JSX.Element {
	const allPlayers = useAtomValue(allPlayerModelsAtom);

	return (
		<section className="global-controller" aria-label="グローバルコントローラ">
			<GlobalPlayControl players={allPlayers} />
		</section >
	)
}
