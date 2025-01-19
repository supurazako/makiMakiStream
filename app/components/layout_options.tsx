import { useContext } from "react";
import "~/components/layout_options.css"
import { LayoutContext } from "~/routes/dev.layout_options";

export default function LayoutOptionsContainer() {
    return (
        <div className="layout_options_container">
            <LayoutOption layoutID={0}></LayoutOption>
            <LayoutOption layoutID={1}></LayoutOption>
            <LayoutOption layoutID={2}></LayoutOption>
        </div>
    );
}

export function LayoutOption({ layoutID }: { layoutID: number }) {
    const { layout, setLayout } = useContext(LayoutContext);
    const isSelected = layoutID === layout;

    return (
        <button
            className={"layout_option" + (isSelected ? " layout_option_selected" : "")}
            onClick={() => setLayout(layoutID)}
            type="button">
            <div className="layout_option_placeholder">{layoutID}</div>
        </button>
    );
}
