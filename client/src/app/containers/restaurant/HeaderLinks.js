import React, { memo } from 'react';

import { withStyles, List, ListItem, Tooltip } from '@mic3/platform-ui';

import Button from 'app/components/uikit/CustomButtons/Button.jsx';

import headerLinksStyle from 'app/assets/jss/material-kit-react/components/headerLinksStyle.jsx';

const HeaderLinks = memo(({ classes }) => {
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Tooltip
                    id="instagram-facebook"
                    title="Follow us on facebook"
                    placement={window.innerWidth > 959 ? 'top' : 'left'}
                    classes={{ tooltip: classes.tooltip }}
                >
                    <Button color="transparent" href="https://www.facebook.com/CreativeTim" target="_blank" className={classes.navLink}>
                        <i className={classes.socialIcons + ' fab fa-facebook'} />
                    </Button>
                </Tooltip>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Tooltip
                    id="instagram-tooltip"
                    title="Follow us on instagram"
                    placement={window.innerWidth > 959 ? 'top' : 'left'}
                    classes={{ tooltip: classes.tooltip }}
                >
                    <Button
                        color="transparent"
                        href="https://www.instagram.com/CreativeTimOfficial"
                        target="_blank"
                        className={classes.navLink}
                    >
                        <i className={classes.socialIcons + ' fab fa-instagram'} />
                    </Button>
                </Tooltip>
            </ListItem>
        </List>
    );
});

export default withStyles(headerLinksStyle)(HeaderLinks);
