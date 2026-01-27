import { fireEvent } from "@testing-library/react";
import { withRender } from "@utils/render";
import { describe, expect, it, vi } from "vitest";

import { AlertBox } from "./..";

describe("Component: alert-box", () => {
    it("should render be able to render an alert.", () => {
        const { getByText } = withRender(
            <AlertBox
                alerts={[
                    {
                        active: false,
                        duration: Infinity,
                        id: "mockId",
                        message: "mockMessage",
                        type: "success",
                        unclosable: false
                    }
                ]}
                removeAlert={vi.fn()}

            />
        );

        expect(getByText("mockMessage")).toBeInTheDocument();
    });

    it("should call the removeAlert function when removing an alert.", () => {
        const deleteMessageMock = vi.fn();
        const { getByLabelText, getByText } = withRender(
            <AlertBox
                alerts={[
                    {
                        active: false,
                        duration: Infinity,
                        id: "mockId",
                        message: "mockMessage",
                        type: "success",
                        unclosable: false
                    }
                ]}
                removeAlert={deleteMessageMock}
            />
        );

        expect(getByText("mockMessage")).toBeInTheDocument();
        fireEvent.click(getByLabelText("Close"));
        expect(deleteMessageMock).toHaveBeenCalled();
    });

    it("only shows the last N alerts based on the maxAlerts prop.", () => {
        const deleteMessageMock = vi.fn();
        const { getByText, queryByText } = withRender(
            <AlertBox
                alerts={[
                    {
                        active: true,
                        duration: Infinity,
                        id: "mockId",
                        message: "messageA",
                        type: "success",
                        unclosable: false
                    },
                    {
                        active: true,
                        duration: Infinity,
                        id: "mockId",
                        message: "messageB",
                        type: "success",
                        unclosable: false
                    }
                ]}
                maxAlerts={1}
                removeAlert={deleteMessageMock}
            />
        );
        expect(queryByText("messageA")).not.toBeInTheDocument();
        expect(getByText("messageB")).toBeInTheDocument();
    });
});
