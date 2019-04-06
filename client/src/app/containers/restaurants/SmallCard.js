import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardContent, CardMedia, IconButton, Typography, MdiIcon } from '@mic3/platform-ui';

const styles = (theme) => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

function MediaControlCard(props) {
    const { classes } = props;

    return (
        <Card className={classes.card}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        Live From Space
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Mac Miller
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <IconButton aria-label="Previous">
                        <MdiIcon name="close" />
                    </IconButton>
                    <IconButton aria-label="Play/pause">
                        <MdiIcon name="close" className={classes.playIcon} />
                    </IconButton>
                    <IconButton aria-label="Next">
                        <MdiIcon name="close" />
                    </IconButton>
                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image="https://image.shutterstock.com/z/stock-photo-close-up-of-a-cup-with-hot-cappuccino-in-a-cosy-cafe-with-foam-design-on-it-of-heart-1228620277.jpg"
                title="Live from space album cover"
            />
        </Card>
    );
}

MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaControlCard);
