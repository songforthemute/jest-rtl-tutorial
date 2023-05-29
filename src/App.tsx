import { useState } from "react";

export function replaceCamelWithSpaces(colorName: string) {
    // Red => Red
    // MidnightBlue => Midnight Blue
    // MediumVioletRed => Medium Violet Red
    return colorName.replace(/\B([A-Z])\B/g, " $1");
}

function App() {
    const [color, setColor] = useState("MidnightBlue");
    const [checkDisable, setCheckDisable] = useState(false);

    const txt =
        color === "MidnightBlue"
            ? replaceCamelWithSpaces("MediumVioletRed")
            : replaceCamelWithSpaces("MidnightBlue");

    return (
        <div className="App">
            <button
                disabled={checkDisable}
                style={{ backgroundColor: color }}
                onClick={() => {
                    setColor((v) =>
                        v === "MidnightBlue"
                            ? "MediumVioletRed"
                            : "MidnightBlue"
                    );
                }}
            >
                Change to {txt}
            </button>

            <label htmlFor="disable-button-checkbox">Disable button</label>
            <input
                id="disable-button-checkbox"
                type="checkbox"
                checked={checkDisable}
                onChange={() => {
                    setCheckDisable((v) => {
                        setColor(() => (!v ? "grey" : "red"));

                        return !v;
                    });
                }}
            />
        </div>
    );
}

export default App;
