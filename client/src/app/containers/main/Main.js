import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Paper, withStyles } from '@mic3/platform-ui';

import Centered from 'app/components/molecules/wrappers/Centered';

const styles = () => ({
    text: {
        width: '100%',
        textAlign: 'center',
    },
    paper: {
        padding: '1rem',
    },
});

const Layout = ({ classes }) => {
    return (
        <Centered>
            <Grid item className={classes.text}>
                <Paper className={classes.paper}>
                    <Typography variant="h1">Anycafe</Typography>
                </Paper>
                <Typography variant="h3">comming soon...</Typography>
            </Grid>
        </Centered>
    );
};

Layout.propTypes = {
    classes: PropTypes.object,
};

export default memo(withStyles(styles)(Layout));
