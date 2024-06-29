import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AlertBox } from "@components/ui/alert-box/alert-box.component";

describe('Component: alert-box', () => {
    it('should render be able to render an alert.', () => {
        const { getByText } = render(
            <AlertBox 
                alerts={[
                    {
                        message: 'mockMessage',
                        type: "success",
                        duration: Infinity,
                        unclosable: false,
                        id: "mockId",
                        active: false
                    }
                ]}
                removeAlert={vi.fn()}

            />
        );
        
        expect(getByText('mockMessage')).toBeInTheDocument();
    });

    it('should call the removeAlert function when removing an alert.', () => {
        const deleteMessageMock = vi.fn();
        const { getByText, getByLabelText } = render(
            <AlertBox 
                alerts={[
                    {
                        message: 'mockMessage',
                        type: "success",
                        duration: Infinity,
                        unclosable: false,
                        id: "mockId",
                        active: false
                    }
                ]}
                removeAlert={deleteMessageMock}
            />
        );

        expect(getByText('mockMessage')).toBeInTheDocument();
        fireEvent.click(getByLabelText('Close'));
        expect(deleteMessageMock).toHaveBeenCalled();
    });

    it('only shows the last N alerts based on the maxAlerts prop.', () => {
        const deleteMessageMock = vi.fn();
        const { getByText, queryByText } = render(
            <AlertBox 
                maxAlerts={1}
                alerts={[
                    {
                        message: 'messageA',
                        type: "success",
                        duration: Infinity,
                        unclosable: false,
                        id: "mockId",
                        active: true
                    },
                    {
                        message: 'messageB',
                        type: "success",
                        duration: Infinity,
                        unclosable: false,
                        id: "mockId",
                        active: true
                    }
                ]}
                removeAlert={deleteMessageMock}
            />
        );
        expect(queryByText('messageA')).not.toBeInTheDocument();
        expect(getByText('messageB')).toBeInTheDocument();
    });
});