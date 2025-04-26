import { useState } from "react";
import { IconArrowLeft, IconArrowRight } from "./common/icons";

import "~/components/sidebar.css";

export function Sidebar({ children }: { children?: React.ReactNode }): JSX.Element {
    const [open, setOpen] = useState(false);

    function toggle() {
        setOpen(!open);
    }

    return (
        <div className={"sidebar_container" + (open ? "" : " close")}>
            <div className="sidebar_element menubar">
                <div className="menubar-container">
                    {children}
                </div>
            </div>
            <div className="sidebar_element drawer">
                <button type="button" className="drawer_button" onClick={toggle}>
                    {open ? <IconArrowLeft /> : <IconArrowRight />}
                </button>
            </div>
        </div>
    )
}
