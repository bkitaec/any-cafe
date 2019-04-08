import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
    Avatar,
    Button,
    CssBaseline,
    FormControl,
    FormControlLabel,
    Checkbox,
    Input,
    InputLabel,
    Paper,
    Typography,
    Grid,
    withStyles,
} from '@mic3/platform-ui';
import { connect } from 'react-redux';

import Centered from 'app/components/molecules/wrappers/Centered';
import { userSignUpAction } from 'store/actions/user';
import { useOnPlainForm } from 'app/hooks/useOnForm';

const styles = (theme) => ({
    paper: {
        maxWidth: '450px',
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

const initialForm = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    remember: false,
};

const SignUp = (props) => {
    const { classes, userSignUpAction } = props;
    const [form, onChange] = useOnPlainForm(initialForm);
    const onSubmit = useCallback(
        (event) => {
            event.preventDefault();
            userSignUpAction(form);
        },
        [form, userSignUpAction]
    );
    return (
        <Centered>
            <Grid item>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input onChange={onChange} value={form.name} id="name" name="name" autoComplete="name" autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input onChange={onChange} value={form.email} id="email" name="email" autoComplete="email" autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                onChange={onChange}
                                value={form.password}
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="rePassword">Re-Password</InputLabel>
                            <Input
                                onChange={onChange}
                                value={form.rePassword}
                                name="rePassword"
                                type="password"
                                id="rePassword"
                                autoComplete="re-new-password"
                            />
                        </FormControl>
                        <FormControlLabel control={<Checkbox value="remember" onChange={onChange} color="primary" />} label="Remember me" />
                        <Button onClick={onSubmit} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            Sign up
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Centered>
    );
};

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    userSignUpAction: PropTypes.func.isRequired,
};

export default memo(
    withStyles(styles)(
        connect(
            (state) => ({
                isLoading: state.user,
                userProfile: state.user.profile,
            }),
            { userSignUpAction }
        )(SignUp)
    )
);
