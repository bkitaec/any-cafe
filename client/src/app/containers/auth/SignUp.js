import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, Button, CssBaseline, Checkbox, TextField, Paper, Typography, Grid, withStyles } from '@mic3/platform-ui';
import { connect } from 'react-redux';
import validate from 'validate.js';

import Centered from 'app/components/molecules/wrappers/Centered';
import { userSignUpAction } from 'store/actions/user';
import { useOnPlainForm } from 'app/hooks/useOnForm';
import { get } from 'utils/lo/lo';

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
const constraints = {
    email: {
        presence: true,
        email: true,
    },
    password: {
        presence: true,
        length: {
            minimum: 5,
        },
    },
    rePassword: {
        presence: true,
        equality: {
            attribute: 'password',
            message: '^The passwords does not match',
        },
    },
    name: {
        presence: true,
        length: {
            minimum: 3,
            maximum: 20,
        },
        format: {
            pattern: '[a-z0-9]+',
            flags: 'i',
            message: 'can only contain a-z and 0-9',
        },
    },
    remember: {},
};

const getValidationProps = (fieldName, validation) => ({
    error: get(validation, `${fieldName}.length`),
    helperText: get(validation, `${fieldName}.length`) > 0 ? get(validation, `${fieldName}[0]`, '') : '',
});

const SignUp = (props) => {
    const { classes, userSignUpAction } = props;
    const [form, onChange] = useOnPlainForm(initialForm);
    const [validation, setValidation] = useState({});
    const onSubmit = useCallback(() => {
        const invalid = validate(form, constraints);
        setValidation(invalid);
        if (!invalid) {
            userSignUpAction(form);
        }
    }, [form, userSignUpAction]);
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
                        <TextField
                            {...getValidationProps('name', validation)}
                            onChange={onChange}
                            value={form.name}
                            label="Name"
                            id="name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            {...getValidationProps('email', validation)}
                            onChange={onChange}
                            value={form.email}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            {...getValidationProps('password', validation)}
                            onChange={onChange}
                            value={form.password}
                            name="password"
                            type="password"
                            label="Password"
                            id="password"
                            autoComplete="new-password"
                        />
                        <TextField
                            {...getValidationProps('rePassword', validation)}
                            onChange={onChange}
                            label="Re-Password"
                            value={form.rePassword}
                            name="rePassword"
                            type="password"
                            id="rePassword"
                            autoComplete="re-new-password"
                        />
                        <Checkbox name="remember" value="remember" onChange={onChange} color="primary" label="Remember me" />
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
                userProfile: state.user,
            }),
            { userSignUpAction }
        )(SignUp)
    )
);
