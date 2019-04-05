import {
    AppBar, Button, CssBaseline, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemText, Toolbar, Typography, withStyles,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";

import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import * as Routes from "../../constants/routes.constants";
import { DrawerEntity, NextCloudCredentials } from "../../models";
import { routeSet } from "../../store/actions/route.action";

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
        { id: 0, title: "Areas", icon: "map", iconColor: "primary", action: () => this.props.dispatch(routeSet(Routes.content)) },
        { id: 1, title: "WirelessSockets", icon: "wifi_tethering", iconColor: "primary", action: () => this.props.dispatch(routeSet(Routes.content)) },
        { id: 2, title: "PeriodicTasks", icon: "alarm", iconColor: "primary", action: () => this.props.dispatch(routeSet(Routes.notFound)) },
    ];

    constructor(props: IAppProps) {
        super(props);
    }

    public render() {
        const nextCloudCredentials: NextCloudCredentials = this.props.state.nextCloudCredentials;
        let route: string = this.props.state.route;
        route = !nextCloudCredentials ? Routes.login : route;

        const loginButton = !nextCloudCredentials
            ? <Button className={this.props.classes.loginButton} onClick={() => this.props.dispatch(routeSet(Routes.login))}>Login</Button>
            : null;

        const drawerToggleButton = !nextCloudCredentials
            ? null
            : <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(this.props.classes.menuButton, {
                    [this.props.classes.hide]: this.state.open,
                })} >
                <MenuIcon />
            </IconButton>;

        const drawerButtonList = !nextCloudCredentials
            ? <List></List>
            : <List>
                {this.drawerList.map((entity, _) => (
                    <ListItem button key={entity.id} onClick={entity.action}>
                        <Icon color={entity.iconColor}>{entity.icon}</Icon>
                        <ListItemText primary={entity.title} />
                    </ListItem>
                ))}
            </List>;

        let contentComponent = null;
        switch (route) {
            case Routes.login:
                contentComponent = <Login></Login>;
                break;
            case Routes.notFound:
                contentComponent = <NotFound></NotFound>;
                break;
            default:
                contentComponent = <Content></Content>
                break;
        }


        return <div className={this.props.classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={classNames(this.props.classes.appBar, {
                    [this.props.classes.appBarShift]: this.state.open,
                })}
            >
                <Toolbar disableGutters={!this.state.open}>
                    {drawerToggleButton}
                    <Typography variant="h6" color="inherit" noWrap />
                </Toolbar>
                {loginButton}
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
                {drawerButtonList}
            </Drawer>
            <main className={this.props.classes.content}>
                <div className={this.props.classes.toolbar} />
                {contentComponent}
            </main>
        </div>;
    }

    private handleDrawerOpen = () => this.setState({ open: true });
    private handleDrawerClose = () => this.setState({ open: false });
}

const mapStateToProps = (state) => {
    return {
        state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    };
};

// @ts-ignore
// export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(App));
export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(App));
// export default connect(mapStateToProps)(App);
