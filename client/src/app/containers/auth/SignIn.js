import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhoneInput from 'react-phone-number-input';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Button from 'app/components/uikit/CustomButtons/Button.jsx';
import Card from 'app/components/uikit/Card/Card.jsx';
import CardBody from 'app/components/uikit/Card/CardBody.jsx';
import CardFooter from 'app/components/uikit/Card/CardFooter.jsx';
import CardHeader from 'app/components/uikit/Card/CardHeader.jsx';
import CustomInput from 'app/components/uikit/CustomInput/CustomInput.jsx';
import Footer from 'app/components/uikit/Footer/Footer.jsx';
import GridContainer from 'app/components/uikit/Grid/GridContainer.jsx';
import GridItem from 'app/components/uikit/Grid/GridItem.jsx';
import image from 'app/assets/img/bg7.jpg';
import loginPageStyle from 'app/assets/jss/material-kit-react/views/loginPage.jsx';

import 'react-phone-number-input/style.css';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            cardAnimaton: 'cardHidden',
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

    render() {
        const { classes, ...rest } = this.props;
        const { form } = this.state;
        return (
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: 'url(' + image + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                }}
            >
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[this.state.cardAnimaton]}>
                                <form className={classes.form}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Login</h4>
                                        <div className={classes.socialLine}>
                                            <Button
                                                justIcon
                                                href="#pablo"
                                                target="_blank"
                                                color="transparent"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className={'fab fa-twitter'} />
                                            </Button>
                                            <Button
                                                justIcon
                                                href="#pablo"
                                                target="_blank"
                                                color="transparent"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className={'fab fa-facebook'} />
                                            </Button>
                                            <Button
                                                justIcon
                                                href="#pablo"
                                                target="_blank"
                                                color="transparent"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className={'fab fa-google-plus-g'} />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <p className={classes.divider}>Or Be Classical</p>
                                    <CardBody>
                                        <PhoneInput placeholder="Enter phone number" value={form.phone} onChange={this.onChangePhone} />
                                        <CustomInput
                                            name="password"
                                            labelText="Enter password"
                                            id="pass"
                                            onChange={this.onChangePass}
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                type: 'password',
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button simple color="primary" size="lg">
                                            Get started
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont />
            </div>
        );
    }
}

export default withStyles(loginPageStyle)(LoginPage);
