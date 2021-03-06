import React from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";
import NavBarStatistics from '../components/NavBarStatistics';
import ThemeApi from "../services/Theme"
import StatisticsHome from '../components/StatisticsHome';
import UserStatistics from '../components/UserStatistics';
import TeamStatistics from '../components/TeamStatistics';
import Insights from '../components/Insights';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: "grid",
        gridTemplateColumns: "6% 94%"
    },
    navBar: {

    },
    main: {
    }
});
function Statistics() {
    const darkMode = React.useContext(ThemeApi).darkTheme
    const classes = useStyles()
    const { path } = useRouteMatch();
    const res = useRouteMatch();
    console.log(res);
    return (
        <div className={darkMode ? "dark-home-page" : "light-home-page"}>
            <div className={classes.root} >
                <div className={classes.navBar}>
                    <NavBarStatistics />
                </div>
                <div className={classes.main} >
                    <Router>
                        <Switch>
                            <Route exact path={`${path}`} component={StatisticsHome} />
                            <Route path={`${path}/users`} component={UserStatistics} />
                            <Route path={`${path}/teams`} component={TeamStatistics} />
                            <Route path={`${path}/insights`} component={Insights} />
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>



    )
}

export default Statistics;
