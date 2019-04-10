import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Header from 'app/components/Header/Header.jsx';
import Button from 'app/components/CustomButtons/Button.jsx';
import Logo from 'logo1.png';
import navbarsStyle from 'app/assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx';
console.log('$$$ [navbarsStyle]', navbarsStyle);
const dashboardRoutes = [];

class SectionNavbars extends React.Component {
    render() {
        const { classes, ...restProps } = this.props;
        return (
            <Header
                brand={<img className={classes.logo} src={Logo} alt="Anycafe" />}
                routes={dashboardRoutes}
                rightLinks={
                    <List className={`${classes.list} ${classes.navbarList}`}>
                        <ListItem className={classes.listItem}>
                            <Button href="#pablo" className={classes.navLink} onClick={(e) => e.preventDefault()} color="transparent">
                                Search
                            </Button>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <Button size="sm" href="#pablo" className={classes.navLink} onClick={(e) => e.preventDefault()} color="transparent">
                                Wishlist
                            </Button>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <Button
                                href={'/signin'}
                                className={classes.registerNavLink}
                                onClick={(e) => e.preventDefault()}
                                color="danger"
                                size="sm"
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

const styles = (theme) => ({
    ...navbarsStyle(theme),
    logo: {
        height: '50px',
    },
});

export default withStyles(styles)(SectionNavbars);
