import { Suspense } from "react";
import { GlobalMuteControl } from "./GlobalMuteControl";
import { GlobalPlayControl } from "./GlobalPlayControl";

import "~/styles/global-controller.css";
import { ControlItemSkeleton } from "./ControlItemSkeleton";

export function GlobalController(): JSX.Element {
	return (
		<section className="global-controller" aria-label="グローバルコントローラ">
			<Suspense fallback={<ControlItemSkeleton />}>
				<GlobalPlayControl />
			</Suspense>

			<Suspense fallback={<ControlItemSkeleton />}>
				<GlobalMuteControl />
			</Suspense>
		</section >
	)
}
