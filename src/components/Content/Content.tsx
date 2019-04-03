import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import * as React from "react";
import { IContentProps } from "./IContentProps";

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

class Content extends React.Component<IContentProps, any> {

    public state = {
        open: false,
    };

    constructor(props: IContentProps) {
        super(props);
    }

    public render() {
        return <div className={this.props.classes.root}>
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
                    {this.props.drawerList.map((entity, _) => (
                        <ListItem button key={entity.id}>
                            <Icon color={entity.iconColor}>{entity.icon}</Icon>
                            <ListItemText primary={entity.title} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={this.props.classes.content}>
                <div className={this.props.classes.toolbar} />
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
                    elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
                    hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
                    velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
                    Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis
                    viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo.
                    Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus
                    at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
                    ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
                </Typography>
            </main>
        </div>;
    }

    private handleDrawerOpen = () => this.setState({ open: true });
    private handleDrawerClose = () => this.setState({ open: false });
}

// @ts-ignore
export default withStyles(styles, { withTheme: true })(Content);
