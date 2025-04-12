import { createContext, useState, useContext, useEffect } from "react";

const OverlayContext = createContext();

export function OverlayProvider({children}) {
    const [showOverlay, setShowOverlay] = useState(true);
    useEffect(() => {
        console.log(showOverlay)
    },[showOverlay])

    return (
        <OverlayContext.Provider value={{ showOverlay, setShowOverlay}}>
            {children}
        </OverlayContext.Provider>
    )
}

export const useOverlay = () => useContext(OverlayContext);