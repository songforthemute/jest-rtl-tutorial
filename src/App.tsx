import { useState } from "react";

function App() {
    const [color, setColor] = useState("red");
    const [checkDisable, setCheckDisable] = useState(false);

    const txt = color === "red" ? "blue" : "red";

    return (
        <div className="App">
            <button
                disabled={checkDisable}
                style={{ backgroundColor: color }}
                onClick={() => {
                    setColor((v) => (v === "red" ? "blue" : "red"));
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
