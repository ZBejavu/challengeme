import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import "./Header.css";
import DarkModeToggle from "react-dark-mode-toggle";
import Search from "./Search/Search";
import { Logged } from "../../context/LoggedInContext";
import { useHistory } from "react-router-dom";
import network from "../../services/network";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    // root: {
    //     flexGrow: 0,
    // },
    // menuButton: {
    //     marginRight: theme.spacing(2),
    // },
    // search: {
    //     position: "relative",
    //     borderRadius: theme.shape.borderRadius,
    //     backgroundColor: fade(theme.palette.common.white, 0.15),
    //     "&:hover": {
    //         backgroundColor: fade(theme.palette.common.white, 0.25),
    //     },
    //     marginRight: theme.spacing(2),
    //     marginLeft: 0,
    //     width: "100%",
    //     [theme.breakpoints.up("sm")]: {
    //         marginLeft: theme.spacing(3),
    //         width: "auto",
    //     },
    // },
    // searchIcon: {
    //     padding: theme.spacing(0, 2),
    //     height: "100%",
    //     position: "absolute",
    //     pointerEvents: "none",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    // },
    // inputRoot: {
    //     color: "inherit",
    // },
    // inputInput: {
    //     padding: theme.spacing(1, 1, 1, 0),
    //     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    //     transition: theme.transitions.create("width"),
    //     width: "100%",
    //     [theme.breakpoints.up("md")]: {
    //         width: "20ch",
    //     },
    // },
    appBarRegolar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),

    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    darkModeToggle: {
        marginRight: "10px;",
    },
    infoButton: {
        margin: "10px",
    },
    logOutButton: {
        margin: "10px",
    },
    root: {
        display: "flex",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    generalDrawerHeader: {
        display: "flex",
    },
    drawerHeader: {
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    list: {
        padding: 0,
    },
    avatarUserInfo: {
        margin: "20px",
    },
}));

export default function WideNav({ darkMode, setDarkMode }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const location = useHistory();
    const value = useContext(Logged);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = async () => {
        try {
            await network.post("/api/v1/auth/logout", {
                token: Cookies.get("refreshToken"),
            });
            Cookies.remove("refreshToken");
            Cookies.remove("accessToken");
            Cookies.remove("name");
            Cookies.remove("userId");
            value.setLogged(false);
            location.push("/login");
        } catch (error) {
            console.error(error);
        }
    };

    const headerStyle = {
        backgroundColor: darkMode ? "rgb(51,51,51)" : "white",
    };
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBarRegolar)}
            //     [classes.appBarShift]: open,
            // })}
            style={headerStyle}
        >
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <NavLink
                        to="/"
                        exact
                        // activeStyle={{ color: darkMode ? "#F5CB39" : "black" }}
                        className="link-rout"
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginRight: "10px",
                            }}
                        >
                            <HomeIcon />
                            &nbsp;
                            <span className="header-link-title">ChallangeMe</span>
                        </div>
                    </NavLink>
                </Typography>
                <Search />
                <div style={{ flex: 1 }}></div>
                {/* Make space between the search input and the rest of the header. */}
                <DarkModeToggle
                    className={classes.darkModeToggle}
                    checked={darkMode}
                    onChange={() => {
                        localStorage.setItem("darkMode", !darkMode);
                        setDarkMode((prev) => !prev);
                    }}
                    size={45}
                />
                <Tooltip title={Cookies.get("name")}>
                    <Avatar
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        style={{
                            cursor: "pointer",
                            backgroundColor: darkMode ? "rgb(140,110,99)" : "#7BACB4",
                        }}
                    >
                        {Cookies.get("name").slice(0, 2)}
                    </Avatar>
                </Tooltip>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                >
                    <Link to="/user_info" className="link-rout">
                        <Button
                            className={classes.infoButton}
                            style={{ minWidth: 150 }}
                            variant="contained"
                            color="default"
                        >
                            info
                        </Button>
                    </Link>
                    <Button
                        className={classes.logOutButton}
                        onClick={logOut}
                        style={{ minWidth: 150 }}
                        variant="contained"
                        color="secondary"
                    >
                        Log Out
                    </Button>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
