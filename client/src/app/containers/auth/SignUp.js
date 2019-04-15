import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, Button, CssBaseline, TextField, Paper, Typography, withStyles } from '@mic3/platform-ui';
import { connect } from 'react-redux';
import validate from 'validate.js';
import PhoneInput from 'react-phone-number-input';

import Centered from 'app/components/molecules/wrappers/Centered';
import constraintsConfig from 'app/config/validation';
import { userSignUpAction } from 'store/actions/user';
import { useOnPlainForm } from 'app/hooks/useOnForm';
import { getValidationProps } from 'utils/form/validation';
import { get } from 'utils/lo/lo';

import 'react-phone-number-input/style.css';

const initialForm = {
    phone: '',
    password: '',
    rePassword: '',
};

const constraints = {
    phone: constraintsConfig.phone,
    password: constraintsConfig.password,
    rePassword: constraintsConfig.rePassword,
};

const SignUp = (props) => {
    const { classes, userSignUpAction } = props;
    const [form, onChange, setForm] = useOnPlainForm(initialForm);
    const [validation, setValidation] = useState({});
    const onSubmit = useCallback(
        (event) => {
            event.preventDefault();
            const invalid = validate(form, constraints);
            setValidation(invalid);
            if (!invalid) {
                userSignUpAction(form);
            }
        },
        [form, userSignUpAction]
    );
    const onChangePhone = useCallback(
        (value) => {
            setForm({ ...form, phone: value });
        },
        [form, setForm]
    );

    return (
        <Centered>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form}>
                    <PhoneInput
                        placeholder="Enter phone number"
                        value={form.phone}
                        onChange={onChangePhone}
                        error={
                            get(getValidationProps('phone', validation), 'error')
                                ? get(getValidationProps('phone', validation), 'helperText')
                                : undefined
                        }
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
                        variant="standard"
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
                        variant="standard"
                    />
                    <Button onClick={onSubmit} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign up
                    </Button>
                </form>
            </Paper>
        </Centered>
    );
};

const styles = (theme) => ({
    paper: {
        maxWidth: '450px',
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
