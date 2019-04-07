import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Typography, Grid, Paper, withStyles } from '@mic3/platform-ui';

const styles = () => ({
    root: { flexGrow: 1 },
    text: {
        width: '100%',
        textAlign: 'center',
    },
    paper: {
        padding: '1rem',
    },
});

const PageNotFound = ({ classes }) => {
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={24}
            className={classes.root}
        >
            <Grid item className={classes.text}>
                <Paper className={classes.paper}>
                    <Typography variant="h1">UFO is here</Typography>
                </Paper>
                <Typography variant="h3">come on =)</Typography>
            </Grid>
        </Grid>
    );
};

PageNotFound.propTypes = {
    classes: PropTypes.object,
};

export default memo(withStyles(styles)(PageNotFound));
