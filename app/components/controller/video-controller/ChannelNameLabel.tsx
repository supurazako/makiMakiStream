import { useAtomValue } from "jotai";
import { JSX } from "react";
import { playerModelAtom } from "~/atoms";
import { VideoDataModel } from "~/models/videoDataModel";

export function ChannelNameLabel({ data }: { data: VideoDataModel }): JSX.Element {
	const player = useAtomValue(playerModelAtom(data.id));

	return <p className="channel-name">{player.getChannelName()}</p>;
}
