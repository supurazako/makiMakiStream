import { createContext, useState } from "react";
import LayoutOptionsContainer from "~/components/layout_options";

export const LayoutContext = createContext({
    layout: "2A",
    setLayout: (_s: string) => {}
});

export default function App(): JSX.Element {
    const [layout, setLayout] = useState("2A");

    return (
        <LayoutContext.Provider value={{ layout, setLayout }}>
            <p>Selected: {layout}</p>
            <LayoutOptionsContainer />
        </LayoutContext.Provider>
    );
}
