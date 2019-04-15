import React, { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import styled from 'styled-components';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Drawer, Typography, withStyles, AppBar, Toolbar, IconButton, InputBase, MenuItem, Menu } from '@mic3/platform-ui';

import Link from 'app/components/atoms/Link';
import Button from 'app/components/atoms/Button';
import useMenu from 'app/hooks/useMenu';
import Logo from 'app/assets/img/logomini.png';

const LogoStyled = styled.img`
    padding: 0 5px;
    max-width: 170px;
`;

const Navbar = ({ classes }) => {
    const [anchorEl, handleProfileMenuOpen, handleProfielMenuClose] = useMenu();
    const [mobileAnchorEl, handleMobileMenuOpen, handleMobileMenuClose] = useMenu();

    const { t, i18n } = useTranslation('app');
    const [currentI18n, setCurrentI18n] = useState('en');
    const changeLanguage = useCallback(
        (event, lng) => {
            i18n.changeLanguage(lng);
            setCurrentI18n(lng);
        },
        [i18n]
    );

    const [isOpenDrawer, setDrawer] = useState(false);
    const toggleDrawer = useCallback(() => {
        setDrawer(!isOpenDrawer);
    }, [isOpenDrawer]);

    const handleClose = useCallback(() => {
        handleProfielMenuClose();
        handleMobileMenuClose();
    }, [handleProfielMenuClose, handleMobileMenuClose]);

    const isMenuOpen = !!anchorEl;
    const isMobileMenuOpen = !!mobileAnchorEl;

    const isLogin = false;
    const menuItems = [
        <Button key={2} variant="text" color="primary" to="/about">
            {t('navbar.about')}
        </Button>,
        <Button key={1} variant="text" color="primary" to="/signin">
            {t('navbar.login')}
        </Button>,
        isLogin && (
            <IconButton
                key={3}
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
        ),
    ];

    const renderProfileMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleClose}
        >
            <MenuItem onClick={handleProfielMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfielMenuClose}>My account</MenuItem>
        </Menu>
    );

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleClose}
        >
            {useMemo(() => menuItems.map((item, index) => <MenuItem key={index}>{item}</MenuItem>), [menuItems])}
        </Menu>
    );
    return (
        <div className={classes.root}>
            <AppBar color="default" position="static">
                <Toolbar>
                    <IconButton onClick={toggleDrawer} className={classes.menuButton} color="inherit" aria-label="Open drawer">
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        <Link to="/">
                            <img className={classes.logo} src={Logo} alt="Anycafe" />
                        </Link>
                    </Typography>
                    <div className={`${classes.search} ${classes.grow}`}>
                        <InputBase
                            placeholder="Search.…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                    <div className={classes.sectionDesktop}>{useMemo(() => menuItems.map((item) => item), [menuItems])}</div>
                    <div className={classes.sectionMobile}>
                        <IconButton aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer open={isOpenDrawer} onClose={toggleDrawer}>
                <LogoStyled src={Logo} alt="Anycafe" />
                {useMemo(
                    () => [
                        ...menuItems.map((item, index) => <MenuItem key={index}>{item}</MenuItem>),
                        <ToggleButtonGroup key={991} value={currentI18n} exclusive onChange={changeLanguage}>
                            <ToggleButton value="en">
                                <Typography>EN</Typography>
                            </ToggleButton>
                            <ToggleButton value="ru">
                                <Typography>RU</Typography>
                            </ToggleButton>
                            <ToggleButton value="ua">
                                <Typography>UA</Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>,
                    ],
                    [changeLanguage, currentI18n, menuItems]
                )}
            </Drawer>
            {renderProfileMenu}
            {renderMobileMenu}
        </div>
    );
};

Navbar.propTypes = {
    classes: PropTypes.object,
};

const styles = (theme) => ({
    root: {
        width: '100%',
        position: 'relative',
        zIndex: '7',
    },
    logo: {
        height: '50px',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        alignSelf: 'stretch',
        margin: '13px 20px',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.common.white,
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit / 2,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit / 2,
        paddingLeft: theme.spacing.unit,
        transition: theme.transitions.create('width'),
        width: '100%',
        fontSize: '1.5rem',
        lineHeight: '1.5rem',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

export default memo(withStyles(styles)(Navbar));
