import React from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Button,
    Dialog,
    ListItemText,
    ListItem,
    List,
    Divider,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    MdiIcon,
    Slide,
    Card,
    CardHeader,
    CardMedia,
    Avatar,
    CardContent,
    CardActions,
    Collapse,
    TextField,
    withMobileDialog,
} from '@mic3/platform-ui';

import SmallCard from 'app/containers/restaurants/SmallCard';

const styles = {
    flex: {
        flex: 1,
    },
    card: {
        maxHeight: '100%',
        overflow: 'scroll',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        marginLeft: 'auto',
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
    render() {
        const { classes, open, toggle, fullScreen } = this.props;
        return (
            <Dialog fullScreen={fullScreen} open={open} onClose={toggle} TransitionComponent={Transition}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={<Avatar aria-label="Recipe">R</Avatar>}
                        action={
                            <IconButton>
                                <MdiIcon name="unfold-more-vertical" />
                            </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        className={classes.media}
                        image="https://image.shutterstock.com/z/stock-photo-close-up-of-a-cup-with-hot-cappuccino-in-a-cosy-cafe-with-foam-design-on-it-of-heart-1228620277.jpg"
                        title="Paella dish"
                    />
                    <CardContent>
                        <Typography component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of
                            frozen peas along with the mussels, if you like.
                        </Typography>
                        <SmallCard />
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton>
                            <MdiIcon name="heart" />
                        </IconButton>
                        <IconButton aria-label="Share" className={classes.expand}>
                            <MdiIcon name="share" />
                        </IconButton>
                    </CardActions>
                </Card>
            </Dialog>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool,
    toggle: PropTypes.func,
    fullScreen: PropTypes.any,
};

export default withStyles(styles)(withMobileDialog()(FullScreenDialog));
