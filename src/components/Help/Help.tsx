import * as React from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import { IHelpProps } from "./IHelpProps";

export default class Help extends React.Component<IHelpProps, any> {

    constructor(props: IHelpProps) {
        super(props);
    }

    public render() {
        return <ListGroup>
            <ListGroupItem>
                <Link to="/">Go Back</Link>
            </ListGroupItem>
        </ListGroup>;
    }
}
