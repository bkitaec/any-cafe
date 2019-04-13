import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Dialog, Slide, withMobileDialog } from '@mic3/platform-ui';

import Restaurant from 'app/containers/restaurant/Restaurant';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
    render() {
        const { classes, open, toggle, activeRestaurant, ...restProps } = this.props;
        return (
            <Dialog fullScreen open={open} onClose={toggle} TransitionComponent={Transition}>
                <Restaurant {...restProps} activeRestaurant={activeRestaurant} />
            </Dialog>
        );
    }
}

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

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool,
    toggle: PropTypes.func,
    fullScreen: PropTypes.any,
};

export default withStyles(styles)(withMobileDialog()(FullScreenDialog));
