import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Typography, Grid, Paper, withStyles } from '@mic3/platform-ui';

import Centered from 'app/components/molecules/wrappers/Centered';

const Layout = ({ classes }) => {
    const { t } = useTranslation('app');
    return (
        <Centered>
            <Grid item className={classes.text}>
                <Paper className={classes.paper}>
                    <Typography variant="h1">Anycafe</Typography>
                </Paper>
                <Typography variant="h3">{t('commingSoon')}</Typography>
            </Grid>
        </Centered>
    );
};

const styles = () => ({
    text: {
        width: '100%',
        textAlign: 'center',
    },
    paper: {
        padding: '1rem',
    },
});

Layout.propTypes = {
    classes: PropTypes.object,
};

export default memo(withStyles(styles)(Layout));
