import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Grid, withStyles } from '@mic3/platform-ui';

const styles = () => ({
    root: { flexGrow: 1 },
});

const Centered = ({ classes, children }) => {
    return (
        <Grid container direction="column" justify="center" alignItems="center" spacing={24} className={classes.root}>
            {children}
        </Grid>
    );
};

Centered.propTypes = {
    classes: PropTypes.object,
    children: PropTypes.node,
};

export default memo(withStyles(styles)(Centered));
