import React from 'react';
import { withStyles, Typography, DateTimePicker, MdiIcon, Button } from '@mic3/platform-ui';
import StarRatingComponent from 'react-star-rating-component';

import Header from 'app/components/uikit/Header/Header.jsx';
import GridContainer from 'app/components/uikit/Grid/GridContainer.jsx';
import GridItem from 'app/components/uikit/Grid/GridItem.jsx';
import HeaderLinks from 'app/containers/restaurant/HeaderLinks.js';
import Parallax from 'app/components/uikit/Parallax/Parallax.jsx';
import Counter from 'app/components/molecules/form/counter/Counter';
import tHeader from 'app/assets/img/examples/tHeader.jpg';
import tLogo from 'app/assets/img/examples/tLogo.jpg';

import profilePageStyle from 'app/assets/jss/material-kit-react/views/profilePage.jsx';

class ProfilePage extends React.Component {
    state = {
        rating: 4.5,
        people: 1,
    };

    onStarClick = (nextValue) => this.setState({ rating: nextValue });
    incrPeople = () => this.setState({ people: this.state.people + 1 });
    decrPeople = () => this.setState({ people: this.state.people - 1 });
    getStarIcon = () => <MdiIcon name="star" size={47} />;

    render() {
        const { classes } = this.props;
        const { people, rating } = this.state;
        const imageClasses = `${classes.imgRaised} ${classes.imgRoundedCircle} ${classes.imgFluid}`;
        return (
            <div>
                <Header
                    color="transparent"
                    brand="Terrace Sea View"
                    rightLinks={<HeaderLinks />}
                    fixed
                    changeColorOnScroll={{ height: 50, color: 'primary' }}
                />
                <Parallax small filter image={tHeader} />
                <div className={`${classes.main} ${classes.mainRaised}`}>
                    <div>
                        <div className={classes.container}>
                            <GridContainer justify="center" className={`${classes.profileImage}`}>
                                <GridItem xs={12} sm={12} md={6}>
                                    <div className={classes.profile}>
                                        <div>
                                            <img src={tLogo} alt="..." className={imageClasses} />
                                        </div>
                                    </div>
                                </GridItem>
                            </GridContainer>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={4}>
                                    <StarRatingComponent
                                        renderStarIcon={this.getStarIcon}
                                        name="rate1"
                                        starCount={5}
                                        value={rating}
                                        onStarClick={this.onStarClick}
                                    />
                                    <Typography variant="h6">Food and ambience</Typography>
                                    <Typography>Local cuisine, Japanese, Seafood, Mediterranean, European, Central European</Typography>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <Counter value={people} onIncrement={this.incrPeople} onDecrement={this.decrPeople} />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    {/*<Button variant="text" size="large" color="default">
                                        Now
                                    </Button>*/}
                                    <Typography variant="h4">Date/Time</Typography>
                                    <DateTimePicker ampm={false} />
                                    <Button variant="contained" size="large" color="default" >
                                        Book for {people}
                                    </Button>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(() => ({
    ...profilePageStyle,
    profileImage: {
        marginBottom: '-65px',
    },
}))(ProfilePage);
