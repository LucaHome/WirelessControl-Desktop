import * as React from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import BrowserListItem from "./BrowserListItem";

export default class Help extends React.Component {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return <ListGroup>
            <BrowserListItem url="https://github.com/tcerdaITBA/electron-react-router-boilerplate">Boilerplate Repository</BrowserListItem>
            <BrowserListItem url="https://github.com/pbarbiero/basic-electron-react-boilerplate">Original Boilerplate Repository</BrowserListItem>
            <BrowserListItem url="https://electronjs.org/">Electron</BrowserListItem>
            <BrowserListItem url="https://nodejs.org/es/">Node</BrowserListItem>
            <BrowserListItem url="https://reactjs.org/">React</BrowserListItem>
            <BrowserListItem url="https://reacttraining.com/react-router/">React Router</BrowserListItem>
            <BrowserListItem url="https://reactstrap.github.io/">Reactstrap</BrowserListItem>
            <ListGroupItem>
                <Link to="/">Go Back</Link>
            </ListGroupItem>
        </ListGroup>;
    }
}
