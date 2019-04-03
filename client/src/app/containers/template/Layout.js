import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Typography, Grid, Paper, withStyles } from '@mic3/platform-ui';

const styles = (theme) => ({
    root: { flexGrow: 1 },
    paper: { paddingp: theme.spacing.unit * 2 },
});

const Layout = ({ classes }) => {
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={24}
            className={classes.root}
        >
            <Grid item spacing={16}>
                <Paper elevation={1} className={classes.paper}>
                    <Typography variant="h1">Anycafe</Typography>
                </Paper>
            </Grid>
            <Grid item>
                <Paper>
                    <Typography variant="h3">comming soon...</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

Layout.propTypes = {
    classes: PropTypes.object,
};

export default memo(withStyles(styles)(Layout));
