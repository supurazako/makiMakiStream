import { JSX, Suspense } from "react";
import { ControlItemSkeleton } from "~/components/controller/ControlItemSkeleton";
import { GlobalMuteControl } from "~/components/controller/global-controller/GlobalMuteControl";
import { GlobalPlayControl } from "~/components/controller/global-controller/GlobalPlayControl";
import { ShareButton } from "./ShareButton";

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

			<Suspense fallback={<ControlItemSkeleton />}>
				<ShareButton />
			</Suspense>
		</section >
	)
}
