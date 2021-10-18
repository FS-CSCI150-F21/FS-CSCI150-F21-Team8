import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";

import Page from "./Components/Page/Page";
import Navbar from "./Components/navbar/navbar";
import profile from './images/profile.png';
import useStyles from './styles';

const App = () => {
    const classes = useStyles();

    return(
        <Container maxidth="lg">
            <AppBar className={classes.Profilepic} position="static" color="inherit">
                  <img className={classes.image} src={profile} alt="profile" height="80" />
                  <Typography classes ={classes.heading} variant = "h4" align="center"> Profile </Typography>
              
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid itemxs={12} sm={4}>
                            <Navbar />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

    export default App;
