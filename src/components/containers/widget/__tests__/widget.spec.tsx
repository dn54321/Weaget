import { Widget } from "@components/containers/widget/widget";
import BugReportIcon from "@mui/icons-material/BugReport";
import { Box } from "@mui/system";
import { withRender } from "@utils/render";
import { describe, expect, it } from "vitest";

describe("Component: Widget", () => {
    it("Widget should be able to render with correct title / subtitle.", () => {
        const { getByLabelText, getByText } = withRender(
            <Widget
                rightDecorum={<BugReportIcon aria-label="test-icon" />}
                subtitle="subTitle"
                title="mockTitle"
            />
        );
        expect(getByText("mockTitle")).toBeInTheDocument();
        expect(getByText("subTitle")).toBeInTheDocument();
        expect(getByLabelText("test-icon")).toBeInTheDocument();
    });

    it("Widget should be able to render children elements correctly.", () => {
        const { getByText } = withRender(
            <Widget title="mockTitle">
                <Box>mockContent</Box>
            </Widget>
        );
        expect(getByText("mockTitle")).toBeInTheDocument();
        expect(getByText("mockContent")).toBeInTheDocument();
    });

    it("Widget should be able to render children elements correctly with transparent variant.", () => {
        const { getByText } = withRender(
            <Widget title="mockTitle" variant="transparent">
                <Box>mockContent</Box>
            </Widget>
        );
        expect(getByText("mockTitle")).toBeInTheDocument();
        expect(getByText("mockContent")).toBeInTheDocument();
    });
});
