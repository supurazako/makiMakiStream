import { createContext, useState } from "react";
import LayoutOptionsContainer from "~/components/layout_options";

export const LayoutContext = createContext({
    layout: 0,
    setLayout: (n: number) => {}
});

export default function App(): JSX.Element {
    const [layout, setLayout] = useState(0);

    return (
        <LayoutContext.Provider value={{ layout, setLayout }}>
            <p>Selected: {layout}</p>
            <LayoutOptionsContainer />
        </LayoutContext.Provider>
    );
}
