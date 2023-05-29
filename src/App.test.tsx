import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { replaceCamelWithSpaces } from "./App";

test("button has correct initial color, and updates when clicked", function () {
    render(<App />);

    // find an element with a role of button and text of 'Change to blue'
    const colorButton = screen.getByRole("button", {
        name: "Change to Medium Violet Red",
    });

    // assertion: expect the background color to be red
    expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

    // click button
    fireEvent.click(colorButton);

    // expect the background color to be blue
    expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
    // ==> assertion fail: rest tests aren't executed

    expect(colorButton).toHaveTextContent("Change to Midnight Blue");
});

test("initial conditions", function () {
    render(<App />);

    // check that the button starts out enabled
    const colorButton = screen.getByRole("button", {
        name: "Change to Medium Violet Red",
    });
    expect(colorButton).toBeEnabled();

    // check that the checkbox starts out unchecked
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
});

test("whether enable/disable button by checkbox checked", function () {
    render(<App />);

    // set component
    const colorButton = screen.getByRole("button", {
        name: "Change to Medium Violet Red",
    });
    const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

    // initial state
    expect(colorButton).toBeEnabled();

    // 1-1. click the checkbox
    fireEvent.click(checkbox);

    // 1-2. testing checkbox that is checked
    expect(checkbox).toBeChecked();

    // 1-3. testing button that is disabled
    expect(colorButton).toBeDisabled();
    expect(colorButton).toHaveStyle({ backgroundColor: "grey" });

    // 2-1. click the checkbox again
    fireEvent.click(checkbox);

    // 2-2. testing checkbox that is unchecked
    expect(checkbox).not.toBeChecked();

    // 2-3. testing button that is enabled
    expect(colorButton).toBeEnabled();
    expect(colorButton).not.toHaveStyle({ backgroundColor: "grey" });
});

// check whether the function is work well
describe("Spaces before camel-case capital letters", () => {
    test("Works for no inner capital letters", () => {
        expect(replaceCamelWithSpaces("Red")).toBe("Red");
    });

    test("Works for one inner capital letters", () => {
        expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
    });

    test("Works for multiple capital letters", () => {
        expect(replaceCamelWithSpaces("MediumVioletRed")).toBe(
            "Medium Violet Red"
        );
    });
});
