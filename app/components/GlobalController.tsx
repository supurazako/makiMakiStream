import { Suspense } from "react";
import { ControlItemSkeleton } from "~/components/ControlItemSkeleton";
import { GlobalMuteControl } from "~/components/GlobalMuteControl";
import { GlobalPlayControl } from "~/components/GlobalPlayControl";

import "~/styles/global-controller.css";

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
