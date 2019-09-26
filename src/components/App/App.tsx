import {
    AppBar, Button, CssBaseline, Divider, Drawer, Icon, IconButton, List,
    ListItem, ListItemText, Snackbar, Toolbar, Typography, withStyles,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import SyncIcon from "@material-ui/icons/Sync";

import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import * as Routes from "../../constants/routes.constants";
import { DrawerEntity } from "../../models";
import { areasLoad, nextCloudCredentialsLogout, periodicTasksLoad, routeSet, wirelessSocketsLoad } from "../../store/actions";
import { isAnythingLoading, snackbarContent } from "../../store/selectors";

import Areas from "../Areas/Areas";
import Loading from "../Loading/Loading";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import PeriodicTasks from "../PeriodicTasks/PeriodicTasks";
import Preferences from "../Preferences/Preferences";
import WirelessSockets from "../WirelessSockets/WirelessSockets";
import { IAppProps } from "./IAppProps";

import "./App.scss";

const drawerWidth: number = 240;

const styles = (theme: any): any => ({
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
    logoutButton: {
        color: "white",
        position: "absolute",
        right: 24,
        top: 18,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    root: {
        display: "flex",
    },
    snackbarClose: {
        padding: theme.spacing.unit / 2,
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

    public snackbarQueue: any[] = [];

    public state: any = {
        drawerOpen: false,
        snackbarDisplay: false,
        snackbarMessageInfo: { key: "", message: "" },
    };

    private readonly drawerButtonList: DrawerEntity[] = [
        { id: 0, title: "Areas", icon: "map", route: "/areas", action: () => this.props.dispatch(routeSet(Routes.areas)) },
        { id: 1, title: "WirelessSockets", icon: "wifi_tethering", route: "/wirelessSockets", action: () => this.props.dispatch(routeSet(Routes.wirelessSockets)) },
        { id: 2, title: "PeriodicTasks", icon: "alarm", route: "/periodicTasks", action: () => this.props.dispatch(routeSet(Routes.periodicTasks)) },
    ];

    private readonly drawerPreferencesList: DrawerEntity[] = [
        { id: 10, title: "Preferences", icon: "settings", route: "/preferences", action: () => this.props.dispatch(routeSet(Routes.preferences)) },
    ];

    constructor(props: IAppProps) {
        super(props);
    }

    public render() {
        const route: string = this.calculateRoute();
        const snackbarSelection: any = snackbarContent(this.props.state);
        if (snackbarSelection.display) {
            this.handleSnackbarDisplay(snackbarSelection.message);
        }

        return <div className={this.props.classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={classNames(this.props.classes.appBar, {
                    [this.props.classes.appBarShift]: this.state.drawerOpen,
                })}
            >
                <Toolbar disableGutters={!this.state.drawerOpen}>
                    {this.createDrawerToogleButton()}
                    <Typography variant="h6" color="inherit" noWrap />
                </Toolbar>
                {this.createReloadButton(route)}
                {this.createLogoutButton()}
            </AppBar>
            <Drawer
                variant="permanent"
                className={classNames(this.props.classes.drawer, {
                    [this.props.classes.drawerOpen]: this.state.drawerOpen,
                    [this.props.classes.drawerClose]: !this.state.drawerOpen,
                })}
                classes={{
                    paper: classNames({
                        [this.props.classes.drawerOpen]: this.state.drawerOpen,
                        [this.props.classes.drawerClose]: !this.state.drawerOpen,
                    }),
                }}
                open={this.state.drawerOpen}
            >
                <div className={this.props.classes.toolbar}>
                    <IconButton onClick={this.handleDrawerClose}>
                        {this.props.theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                {this.createDrawerButtonEntityList(route)}
                {this.createDrawerPreferencesList(route)}
            </Drawer>
            <main className={this.props.classes.content}>
                <div className={this.props.classes.toolbar} />
                {this.findContentComponent(route)}
            </main>
            <Snackbar
                key={this.state.snackbarMessageInfo.key}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom",
                }}
                open={this.state.snackbarDisplay}
                autoHideDuration={3000}
                onClose={this.handleSnackbarHide}
                onExited={this.handleSnackbarExited}
                ContentProps={{
                    "aria-describedby": "message-id",
                }}
                message={<span id="message-id">{this.state.snackbarMessageInfo.message}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={this.props.classes.snackbarClose}
                        onClick={this.handleSnackbarHide} >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </div>;
    }

    private calculateRoute = (): string => {
        let route: string = this.props.state.route;
        route = isAnythingLoading(this.props.state)
            ? Routes.loading
            : !this.props.state.nextCloudCredentials
                ? Routes.login
                : (route === Routes.loading && !isAnythingLoading(this.props.state)) || route === ""
                    ? Routes.wirelessSockets
                    : route;
        this.props.dispatch(routeSet(route));
        return route;
    }

    private createDrawerButtonEntityList = (route: string): JSX.Element => {
        return !this.props.state.nextCloudCredentials
            ? <List></List>
            : <List>
                {this.drawerButtonList.map((entity, _) => (
                    <ListItem button key={entity.id} onClick={entity.action} selected={entity.route === route}>
                        <Icon color={entity.route === route ? "secondary" : "primary"}>{entity.icon}</Icon>
                        <ListItemText primary={entity.title} />
                    </ListItem>
                ))}
            </List>;
    }

    private createDrawerPreferencesList = (route: string): JSX.Element => {
        return !this.props.state.nextCloudCredentials
            ? <List></List>
            : <List className="preferences-list">
                {this.drawerPreferencesList.map((entity, _) => (
                    <ListItem button key={entity.id} onClick={entity.action} selected={entity.route === route}>
                        <Icon color={entity.route === route ? "secondary" : "primary"}>{entity.icon}</Icon>
                        <ListItemText primary={entity.title} />
                    </ListItem>
                ))}
            </List>;
    }

    private createDrawerToogleButton = (): JSX.Element => {
        return !this.props.state.nextCloudCredentials
            ? undefined
            : <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(this.props.classes.menuButton, {
                    [this.props.classes.hide]: this.state.drawerOpen,
                })} >
                <MenuIcon />
            </IconButton>;
    }

    private createLogoutButton = (): JSX.Element => {
        return isAnythingLoading(this.props.state) || !this.props.state.nextCloudCredentials
            ? undefined
            : <Button className={this.props.classes.logoutButton} onClick={() => this.props.dispatch(nextCloudCredentialsLogout())}>Logout</Button>;
    }

    private createReloadButton = (route: string): JSX.Element => {
        return isAnythingLoading(this.props.state) || !this.props.state.nextCloudCredentials
            || (route !== Routes.areas && route !== Routes.periodicTasks && route !== Routes.wirelessSockets)
            ? undefined
            : <IconButton
                className="sync-button"
                color="inherit"
                aria-label="Sync"
                onClick={() => this.handleSync(route)} >
                <SyncIcon />
            </IconButton>;
    }

    private findContentComponent = (route: string): JSX.Element => {
        switch (route) {
            case Routes.login:
                return <Login></Login>;
            case Routes.areas:
                return <Areas></Areas>;
            case Routes.periodicTasks:
                return <PeriodicTasks></PeriodicTasks>;
            case Routes.wirelessSockets:
                return <WirelessSockets></WirelessSockets>;
            case Routes.preferences:
                return <Preferences></Preferences>;
            case Routes.loading:
                return <Loading></Loading>;
            case Routes.notFound:
            default:
                return <NotFound></NotFound>;
        }
    }

    private handleDrawerClose = (): void => this.setState({ drawerOpen: false });

    private handleDrawerOpen = (): void => this.setState({ drawerOpen: true });

    private handleSnackbarDisplay = (message: string): void => {
        this.snackbarQueue.push({
            key: new Date().getTime(),
            message,
        });

        if (this.state.snackbarDisplay) {
            this.setState({ snackbarDisplay: false });
        } else {
            this.processSnackbarQueue();
        }
    }

    private handleSnackbarExited = (): void => this.processSnackbarQueue();

    private handleSnackbarHide = (): void => this.setState({ snackbarDisplay: false });

    private handleSync = (route: string): void => {
        switch (route) {
            case Routes.areas:
                this.props.dispatch(areasLoad());
                break;
            case Routes.periodicTasks:
                this.props.dispatch(periodicTasksLoad());
                break;
            case Routes.wirelessSockets:
                this.props.dispatch(wirelessSocketsLoad());
                break;
        }
    }

    private processSnackbarQueue = (): void => {
        if (this.snackbarQueue.length > 0) {
            this.setState({
                snackbarDisplay: true,
                snackbarMessageInfo: this.snackbarQueue.shift(),
            });
        }
    }
}

const mapDispatchToProps = (dispatch: any): any => {
    return {
        dispatch,
    };
};

const mapStateToProps = (state: any): any => {
    return {
        state,
    };
};

// @ts-ignore
export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(App));
