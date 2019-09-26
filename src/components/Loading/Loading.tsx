import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { ILoadingProps } from "./ILoadingProps";

import "../../../styles/main.scss";

const styles = (theme: any): any => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class Loading extends React.Component<ILoadingProps, any> {
    constructor(props: ILoadingProps) {
        super(props);
    }

    public render() {
        return <div className="wc-window-centered-display">
            <CircularProgress className={this.props.classes.progress} />
        </div>;
    }
}

export default withStyles(styles, { withTheme: true })(Loading);
