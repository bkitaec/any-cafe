import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Header from 'app/components/Header/Header.jsx';
import Button from 'app/components/CustomButtons/Button.jsx';

import navbarsStyle from 'app/assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx';

const dashboardRoutes = [];

class SectionNavbars extends React.Component {
    render() {
        const { classes, ...restProps } = this.props;
        return (
            <Header
                brand="Anycafe"
                routes={dashboardRoutes}
                rightLinks={
                    <List className={classes.list}>
                        <ListItem className={classes.listItem}>
                            <Button href="#pablo" className={classes.navLink} onClick={(e) => e.preventDefault()} color="transparent">
                                Discover
                            </Button>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <Button href="#pablo" className={classes.navLink} onClick={(e) => e.preventDefault()} color="transparent">
                                Wishlist
                            </Button>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <Button
                                href="#pablo"
                                className={classes.registerNavLink}
                                onClick={(e) => e.preventDefault()}
                                color="rose"
                                round
                            >
                                Register
                            </Button>
                        </ListItem>
                    </List>
                }
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: 'white',
                }}
                {...restProps}
            />
        );
    }
}

export default withStyles(navbarsStyle)(SectionNavbars);
