import { useContext } from "react";
import "~/components/layout_options.css"
import { LayoutContext } from "~/routes/dev.layout_options";
import { IconLayoutOption2A, IconLayoutOption2AClip, IconLayoutOption2B, IconLayoutOption2BClip, IconLayoutOption2C, IconLayoutOption2CClip } from "./common/icons";

export default function LayoutOptionsContainer() {
    return (
        <div className="layout_options_container">
            <LayoutOption layoutID={"2A"}></LayoutOption>
            <LayoutOption layoutID={"2B"}></LayoutOption>
            <LayoutOption layoutID={"2C"}></LayoutOption>
        </div>
    );
}

export function LayoutOption({ layoutID }: { layoutID: string }) {
    const { layout, setLayout } = useContext(LayoutContext);
    const isSelected = layoutID === layout;

    return (
        <button
            className={"layout_option" + (isSelected ? " selected" : "")}
            onClick={() => setLayout(layoutID)}
            type="button">
            {getOptionIcon(layoutID)}
        </button>
    );
}

function getOptionIcon(id: string): [JSX.Element, JSX.Element] {
    let icons: [JSX.Element, JSX.Element];

    switch (id) {
        case "2A": icons = [<IconLayoutOption2AClip key={0} />, <IconLayoutOption2A key={1} />]; break;
        case "2B": icons = [<IconLayoutOption2BClip key={0} />, <IconLayoutOption2B key={1} />]; break;
        case "2C": icons = [<IconLayoutOption2CClip key={0} />, <IconLayoutOption2C key={1} />]; break;
        default: icons = [<IconLayoutOption2AClip key={0} />, <IconLayoutOption2A key={1} />];
    }

    return icons;
}
