import { describe, expect, it } from "vitest";
import BugReportIcon from "@mui/icons-material/BugReport";
import { Widget } from "@components/containers/widget/widget";
import { Box } from "@mui/system";
import { withRender } from "@utils/render";

describe("Component: Widget", () => {
    it("Widget should be able to render with correct title / subtitle.", () => {
        const { getByText, getByLabelText } = withRender(
            <Widget
                title="mockTitle"
                subtitle="subTitle"
                rightDecorum={<BugReportIcon aria-label="test-icon" />}
            />,
        );
        expect(getByText("mockTitle")).toBeInTheDocument();
        expect(getByText("subTitle")).toBeInTheDocument();
        expect(getByLabelText("test-icon")).toBeInTheDocument();
    });

    it("Widget should be able to render children elements correctly.", () => {
        const { getByText } = withRender(
            <Widget title="mockTitle">
                <Box>mockContent</Box>
            </Widget>,
        );
        expect(getByText("mockTitle")).toBeInTheDocument();
        expect(getByText("mockContent")).toBeInTheDocument();
    });

    it("Widget should be able to render children elements correctly with transparent variant.", () => {
        const { getByText } = withRender(
            <Widget title="mockTitle" variant="transparent">
                <Box>mockContent</Box>
            </Widget>,
        );
        expect(getByText("mockTitle")).toBeInTheDocument();
        expect(getByText("mockContent")).toBeInTheDocument();
    });
});
