import {
    AppBar, CssBaseline, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemText, Toolbar, Typography, withStyles,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";

import classNames from "classnames";
import { ConnectedRouter, replace } from "connected-react-router";
import * as React from "react";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import { put } from "redux-saga/effects";

import * as Routes from "../../constants/routes.constants";
import { DrawerEntity } from "../../models/drawer-entity";
import Content from "../Content/Content";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import { IAppProps } from "./IAppProps";

import "../../../styles/main.scss";

const drawerWidth = 240;

const styles = (theme: any) => ({
    appBar: {
        transition: theme.transitions.create(["width", "margin"], {
            duration: theme.transitions.duration.leavingScreen,
            easing: theme.transitions.easing.sharp,
        }),
        zIndex: theme.zIndex.drawer + 1,
    },
    appBarShift: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["width", "margin"], {
            duration: theme.transitions.duration.enteringScreen,
            easing: theme.transitions.easing.sharp,
        }),
        width: `calc(100% - ${drawerWidth}px)`,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    drawer: {
        flexShrink: 0,
        whiteSpace: "nowrap",
        width: drawerWidth,
    },
    drawerClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            duration: theme.transitions.duration.leavingScreen,
            easing: theme.transitions.easing.sharp,
        }),
        width: theme.spacing.unit * 5 + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing.unit * 7 + 1,
        },
    },
    drawerOpen: {
        transition: theme.transitions.create("width", {
            duration: theme.transitions.duration.enteringScreen,
            easing: theme.transitions.easing.sharp,
        }),
        width: drawerWidth,
    },
    hide: {
        display: "none",
    },
    loginButton: {
        right: 24,
        position: "absolute",
        top: 18,
        color: "white",
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    root: {
        display: "flex",
    },
    toolbar: {
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-end",
        padding: "0 0.5rem",
        ...theme.mixins.toolbar,
    },
});

class App extends React.Component<IAppProps, any> {

    public state = {
        open: false,
    };

    private readonly drawerList: DrawerEntity[] = [
        { id: 0, title: "Areas", icon: "map", iconColor: "primary", action: () => { console.log("Areas"); put(replace(Routes.areas)); } },
        { id: 1, title: "WirelessSockets", icon: "wifi_tethering", iconColor: "primary", action: () => { console.log("WirelessSockets"); put(replace(Routes.wirelessSockets)); } },
        { id: 2, title: "PeriodicTasks", icon: "alarm", iconColor: "primary", action: () => { console.log("PeriodicTasks"); put(replace(Routes.periodicTasks)); } },
    ];

    constructor(props: IAppProps) {
        super(props);
        console.log(props);
        put(replace(Routes.login));
        console.log(props);
        props.history.replace(Routes.login);
        console.log(props);
    }

    public render() {
        return <ConnectedRouter history={this.props.history}><div className={this.props.classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={classNames(this.props.classes.appBar, {
                    [this.props.classes.appBarShift]: this.state.open,
                })}
            >
                <Toolbar disableGutters={!this.state.open}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(this.props.classes.menuButton, {
                            [this.props.classes.hide]: this.state.open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap />
                </Toolbar>
                <Link className={this.props.classes.loginButton} to={Routes.login}>Login</Link>
            </AppBar>
            <Drawer
                variant="permanent"
                className={classNames(this.props.classes.drawer, {
                    [this.props.classes.drawerOpen]: this.state.open,
                    [this.props.classes.drawerClose]: !this.state.open,
                })}
                classes={{
                    paper: classNames({
                        [this.props.classes.drawerOpen]: this.state.open,
                        [this.props.classes.drawerClose]: !this.state.open,
                    }),
                }}
                open={this.state.open}
            >
                <div className={this.props.classes.toolbar}>
                    <IconButton onClick={this.handleDrawerClose}>
                        {this.props.theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {this.drawerList.map((entity, _) => (
                        <ListItem button key={entity.id} onClick={entity.action}>
                            <Icon color={entity.iconColor}>{entity.icon}</Icon>
                            <ListItemText primary={entity.title} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={this.props.classes.content}>
                <div className={this.props.classes.toolbar} />
                <Switch>
                    <Route path={Routes.login} component={Login} exact />
                    <Route path={Routes.loading} component={Content} />
                    <Route path={Routes.areas} component={Content} />
                    <Route path={Routes.areasEdit} component={Content} />
                    <Route path={Routes.wirelessSockets} component={Content} />
                    <Route path={Routes.wirelessSocketsEdit} component={Content} />
                    <Route path={Routes.periodicTasks} component={Content} />
                    <Route path={Routes.periodicTasksEdit} component={Content} />
                    <Route component={NotFound} />
                </Switch>
            </main>
        </div>
        </ConnectedRouter>;
    }

    private handleDrawerOpen = () => this.setState({ open: true });
    private handleDrawerClose = () => this.setState({ open: false });
}

// @ts-ignore
export default withStyles(styles, { withTheme: true })(App);
