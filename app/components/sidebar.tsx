import { useState } from "react"
import "~/components/sidebar.css"
import { IconArrowLeft, IconArrowRight } from "./common/icons";

export function Sidebar() {
    const [open, setOpen] = useState(false);

    function toggle() {
        setOpen(!open);
    }

    return (
        <div className={"sidebar_container" + (open ? "" : " close")}>
            <div className="sidebar_element menubar">
            </div>
            <div className="sidebar_element drawer">
                <button type="button" className="drawer_button" onClick={toggle}>
                    {open ? <IconArrowLeft /> : <IconArrowRight />}
                </button>
            </div>
        </div>
    )
}
