import { useState } from "react"
import "~/components/sidebar.css"

export function Sidebar() {
    const [open, setOpen] = useState(false);

    function toggle() {
        setOpen(!open);
    }

    return (
        <div className={"sidebar_container" + (open ? "" : " sidebar_container_close")}>
            <div className="sidebar_element menubar">
            </div>
            <div className="sidebar_element drawer">
                <button type="button" className="drawer_button" onClick={toggle}>{open ? "<" : ">"}</button>
            </div>
        </div>
    )
}
