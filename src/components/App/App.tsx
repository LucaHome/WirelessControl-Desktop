import {
    AppBar, Button, CssBaseline, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemText, Snackbar, Toolbar, Typography, withStyles,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from "@material-ui/icons/Menu";

import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import * as Routes from "../../constants/routes.constants";
import { DrawerEntity, NextCloudCredentials } from "../../models";
import { nextCloudCredentialsLogout, routeSet } from "../../store/actions";
import { isAnythingLoading, snackbarContent } from "../../store/selectors";

import Areas from "../Areas/Areas";
import Loading from "../Loading/Loading";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import PeriodicTasks from "../PeriodicTasks/PeriodicTasks";
import WirelessSockets from "../WirelessSockets/WirelessSockets";
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
    logoutButton: {
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

    public snackbarQueue = [];

    public state = {
        drawerOpen: false,
        snackbarDisplay: false,
        snackbarMessageInfo: { key: "", message: "" },
    };

    private readonly drawerList: DrawerEntity[] = [
        { id: 0, title: "Areas", icon: "map", iconColor: "primary", action: () => this.props.dispatch(routeSet(Routes.areas)) },
        { id: 1, title: "WirelessSockets", icon: "wifi_tethering", iconColor: "primary", action: () => this.props.dispatch(routeSet(Routes.wirelessSockets)) },
        { id: 2, title: "PeriodicTasks", icon: "alarm", iconColor: "primary", action: () => this.props.dispatch(routeSet(Routes.periodicTasks)) },
    ];

    constructor(props: IAppProps) {
        super(props);
    }

    public render() {
        const snackbarSelection: any = snackbarContent(this.props.state);
        const nextCloudCredentials: NextCloudCredentials = this.props.state.nextCloudCredentials;

        if (snackbarSelection.display) {
            this.handleSnackbarDisplay(snackbarSelection.message);
        }

        const logoutButton = isAnythingLoading(this.props.state)
            ? null
            : !nextCloudCredentials
                ? null
                : <Button className={this.props.classes.logoutButton} onClick={() => this.props.dispatch(nextCloudCredentialsLogout())}>Logout</Button>;

        const drawerToggleButton = !nextCloudCredentials
            ? null
            : <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(this.props.classes.menuButton, {
                    [this.props.classes.hide]: this.state.drawerOpen,
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

        let route: string = this.props.state.route;
        route = isAnythingLoading(this.props.state)
            ? Routes.loading
            : !nextCloudCredentials
                ? Routes.login
                : (route === Routes.loading && !isAnythingLoading(this.props.state)) || route === ""
                    ? Routes.areas
                    : route;

        let contentComponent = null;
        switch (route) {
            case Routes.login:
                contentComponent = <Login></Login>;
                break;
            case Routes.areas:
                contentComponent = <Areas></Areas>;
                break;
            case Routes.periodicTasks:
                contentComponent = <PeriodicTasks></PeriodicTasks>;
                break;
            case Routes.wirelessSockets:
                contentComponent = <WirelessSockets></WirelessSockets>;
                break;
            case Routes.loading:
                contentComponent = <Loading></Loading>;
                break;
            case Routes.notFound:
            default:
                contentComponent = <NotFound></NotFound>
                break;
        }
        this.props.dispatch(routeSet(route));

        return <div className={this.props.classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={classNames(this.props.classes.appBar, {
                    [this.props.classes.appBarShift]: this.state.drawerOpen,
                })}
            >
                <Toolbar disableGutters={!this.state.drawerOpen}>
                    {drawerToggleButton}
                    <Typography variant="h6" color="inherit" noWrap />
                </Toolbar>
                {logoutButton}
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
                {drawerButtonList}
            </Drawer>
            <main className={this.props.classes.content}>
                <div className={this.props.classes.toolbar} />
                {contentComponent}
            </main>
            <Snackbar
                key={this.state.snackbarMessageInfo.key}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.state.snackbarDisplay}
                autoHideDuration={3000}
                onClose={this.handleSnackbarHide}
                onExited={this.handleSnackbarExited}
                ContentProps={{
                    'aria-describedby': 'message-id',
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

    private handleDrawerOpen = () => this.setState({ drawerOpen: true });
    private handleDrawerClose = () => this.setState({ drawerOpen: false });
    private handleSnackbarDisplay = (message: string) => {
        this.snackbarQueue.push({
            key: new Date().getTime(),
            message,
        });

        if (this.state.snackbarDisplay) {
            this.setState({ snackbarDisplay: false });
        } else {
            this.processSnackbarQueue();
        }
    };
    private handleSnackbarHide = () => this.setState({ snackbarDisplay: false });
    private handleSnackbarExited = () => this.processSnackbarQueue();
    private processSnackbarQueue = () => {
        if (this.snackbarQueue.length > 0) {
            this.setState({
                snackbarDisplay: true,
                snackbarMessageInfo: this.snackbarQueue.shift(),
            });
        }
    };
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
export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(App));
