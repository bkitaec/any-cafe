import MuiPhoneInput from 'material-ui-phone-number';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, IconButton, MdiIcon, InputAdornment, Typography } from '@mic3/platform-ui';
import { withTranslation } from 'react-i18next';

import Card from 'app/components/uikit/Card/Card.jsx';
import CardBody from 'app/components/uikit/Card/CardBody.jsx';
import CardFooter from 'app/components/uikit/Card/CardFooter.jsx';
import CardHeader from 'app/components/uikit/Card/CardHeader.jsx';
import GridContainer from 'app/components/uikit/Grid/GridContainer.jsx';
import GridItem from 'app/components/uikit/Grid/GridItem.jsx';
import loginPageStyle from 'app/assets/jss/material-kit-react/views/loginPage.jsx';

import AuthBack from 'app/assets/img/auth.back.jpg';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            cardAnimaton: 'cardHidden',
            showPassword: false,
            form: {
                phone: '',
                password: '',
            },
        };
    }
    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        setTimeout(
            function() {
                this.setState({ cardAnimaton: '' });
            }.bind(this),
            700
        );
    }
    onChangePhone = (value) => this.setState({ form: { phone: value } });
    onChangePass = (event) => this.setState({ form: { password: event.target.value } });
    toggleShowPassword = () => this.setState({ showPassword: !this.state.showPassword });

    render() {
        const { classes, t } = this.props;
        const { form, showPassword } = this.state;
        return (
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: 'url(' + AuthBack + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                }}
            >
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[this.state.cardAnimaton]}>
                                <form className={classes.form}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <Typography className={classes.textColor} variant="h5">
                                            {t('loginTitle')}
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
                                            key={9}
                                            label={t('form.phone')}
                                            value={form.phone}
                                            defaultCountry="ua"
                                            onChange={this.onChangePhone}
                                        />
                                        <TextField
                                            key={8}
                                            margin="normal"
                                            onChange={this.onChangePass}
                                            value={form.password}
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            label={t('form.password')}
                                            id="password"
                                            autoComplete="new-password"
                                            variant="standard"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconButton
                                                            aria-label="Toggle password visibility"
                                                            onClick={this.toggleShowPassword}
                                                        >
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
                                        <Button color="default" size="lg">
                                            {t('form.submitLoginButton')}
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        );
    }
}

export default withStyles(loginPageStyle)(withTranslation('auth')(LoginPage));
