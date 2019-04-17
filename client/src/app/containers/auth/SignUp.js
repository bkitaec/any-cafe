import React, { memo, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { IconButton, MdiIcon, Button, Typography, InputAdornment } from '@mic3/platform-ui';
import { connect } from 'react-redux';
import validate from 'validate.js';
import MuiPhoneInput from 'material-ui-phone-number';
import { useTranslation } from 'react-i18next';

import Card from 'app/components/uikit/Card/Card.jsx';
import CardBody from 'app/components/uikit/Card/CardBody.jsx';
import CardFooter from 'app/components/uikit/Card/CardFooter.jsx';
import CardHeader from 'app/components/uikit/Card/CardHeader.jsx';
import GridContainer from 'app/components/uikit/Grid/GridContainer.jsx';
import GridItem from 'app/components/uikit/Grid/GridItem.jsx';
import constraintsConfig from 'app/config/validation';
import { userSignUpAction } from 'store/actions/user';
import { useOnPlainForm } from 'app/hooks/useOnForm';
import { getValidationProps } from 'utils/form/validation';
import useMenu from 'app/hooks/useMenu';

import loginPageStyle from 'app/assets/jss/material-kit-react/views/loginPage.jsx';

import AuthBack from 'app/assets/img/auth.back.jpg';

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
    const [showPassword, toggleShowPassword] = useMenu(false);
    const { t } = useTranslation('auth');
    const [cardAnimaton, setCardAnimaton] = useState('cardHidden');
    useEffect(() => {
        setTimeout(() => {
            setCardAnimaton('');
        }, 700);
    });

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
        <div
            className={classes.pageHeader}
            style={{
                backgroundImage: 'url(' + AuthBack + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
            }}
        >
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={4}>
                        <Card className={classes[cardAnimaton]}>
                            <form className={classes.form}>
                                <CardHeader color="primary" className={classes.cardHeader}>
                                    <Typography className={classes.textColor} variant="h5">
                                        {t('registrationTitle')}
                                    </Typography>
                                    <div className={classes.socialLine}>
                                        <IconButton fontSize={40} className={classes.textColor} onClick={(e) => e.preventDefault()}>
                                            <MdiIcon name="facebook-box" size={40} />
                                        </IconButton>
                                        <IconButton className={classes.textColor} onClick={(e) => e.preventDefault()}>
                                            <MdiIcon name="google-plus" size={40} />
                                        </IconButton>
                                    </div>
                                </CardHeader>
                                <p className={classes.divider}>{t('orBeClassical')}</p>
                                <CardBody>
                                    <MuiPhoneInput
                                        {...getValidationProps('phone', validation)}
                                        label={t('form.phone')}
                                        value={form.phone}
                                        defaultCountry="ua"
                                        onChange={onChangePhone}
                                    />
                                    <TextField
                                        {...getValidationProps('email', validation)}
                                        margin="normal"
                                        onChange={onChange}
                                        value={form.password}
                                        name="email"
                                        type="email"
                                        label={t('form.email')}
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton aria-label="Email">
                                                        <MdiIcon size={20} name="at" />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        {...getValidationProps('password', validation)}
                                        margin="normal"
                                        onChange={onChange}
                                        value={form.password}
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        label="Password"
                                        id="password"
                                        autoComplete="new-password"
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton aria-label="Toggle password visibility" onClick={toggleShowPassword}>
                                                        {showPassword ? (
                                                            <MdiIcon size={20} name="eye" />
                                                        ) : (
                                                            <MdiIcon size={20} name="eye-off" />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </CardBody>
                                <CardFooter className={classes.cardFooter}>
                                    <Button color="default" size="lg" onClick={onSubmit}>
                                        {t('form.submitRegistrationButton')}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
};

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    userSignUpAction: PropTypes.func.isRequired,
};

export default memo(
    withStyles(loginPageStyle)(
        connect(
            (state) => ({
                isLoading: state.user,
                userProfile: state.user,
            }),
            { userSignUpAction }
        )(SignUp)
    )
);
