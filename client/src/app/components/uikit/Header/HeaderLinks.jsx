import React from 'react';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';

// @material-ui/icons
import { Apps, CloudDownload } from '@material-ui/icons';

// core components
import CustomDropdown from 'app/components/uikit/CustomDropdown/CustomDropdown.jsx';
import Button from 'app/components/uikit/CustomButtons/Button.jsx';

import headerLinksStyle from 'app/assets/jss/material-kit-react/components/headerLinksStyle.jsx';

function HeaderLinks({ ...props }) {
    const { classes } = props;
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    buttonText="Components"
                    buttonProps={{
                        className: classes.navLink,
                        color: 'transparent',
                    }}
                    buttonIcon={Apps}
                    dropdownList={[
                        <Link key={1} to="/" className={classes.dropdownLink}> {/*eslint-disable-line*/}
                            All components
                        </Link>,
                        <a
                            key={2}
                            href="https://creativetimofficial.github.io/material-kit-react/#/documentation"
                            className={classes.dropdownLink}
                        >
                            Documentation
                        </a>,
                    ]}
                />
            </ListItem>
            <ListItem className={classes.listItem}>
                <Button
                    href="https://www.creative-tim.com/product/material-kit-react"
                    color="transparent"
                    target="_blank"
                    className={classes.navLink}
                >
                    <CloudDownload className={classes.icons} /> Download
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Tooltip
                    id="instagram-twitter"
                    title="Follow us on twitter"
                    placement={window.innerWidth > 959 ? 'top' : 'left'}
                    classes={{ tooltip: classes.tooltip }}
                >
                    <Button href="https://twitter.com/CreativeTim" target="_blank" color="transparent" className={classes.navLink}>
                        <i className={classes.socialIcons + ' fab fa-twitter'} />
                    </Button>
                </Tooltip>
            </ListItem>
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
}

export default withStyles(headerLinksStyle)(HeaderLinks);
