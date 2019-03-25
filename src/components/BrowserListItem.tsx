import { shell } from "electron";
import * as React from "react";
import { ListGroupItem } from "reactstrap";
import { IBrowserListItemProps } from "../props/IBrowserListItemProps";

export default class BrowserListItem extends React.Component<IBrowserListItemProps, any> {

    constructor(props: IBrowserListItemProps) {
        super(props);
    }

    public openBrowser = (event: any) => {
        event.preventDefault();

        const { url } = this.props;
        shell.openExternal(url);
    }

    public render() {
        return <ListGroupItem tag="a" href="#" onClick={this.openBrowser}>{this.props.children}</ListGroupItem>;
    }
}
