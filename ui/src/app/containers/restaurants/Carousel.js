import React from 'react';
import SlickCarousel from 'react-slick';
import LocationOn from '@material-ui/icons/LocationOn';
import withStyles from '@material-ui/core/styles/withStyles';

import GridContainer from 'app/components/Grid/GridContainer.jsx';
import GridItem from 'app/components/Grid/GridItem.jsx';
import Card from 'app/components/Card/Card.jsx';
import CardBody from 'app/components/Card/CardBody.jsx';
import CardHeader from 'app/components/Card/CardHeader.jsx';
import Button from 'app/components/CustomButtons/Button.jsx';

import image1 from 'app/assets/img/bg.jpg';
import image2 from 'app/assets/img/bg2.jpg';
import image3 from 'app/assets/img/bg3.jpg';

import { cardTitle } from 'app/assets/jss/material-kit-react.jsx';
import imagesStyle from 'app/assets/jss/material-kit-react/imagesStyles.jsx';

const RestaurantCard = ({ classes, restaurant, index }) => (
    <Card style={{ width: '20rem', margin: '0 auto' }}>
        <CardHeader color="warning">Featured #{index}</CardHeader>
        <CardBody>
            <img className={`${classes.imgRaised} ${classes.imgRoundedCircle} ${classes.imgFluid}`} />
            <h4 className={classes.cardTitle}>{restaurant.name}</h4>
            <p>{restaurant.desc}</p>
            <Button color="primary">Book table</Button>
        </CardBody>
    </Card>
);

class Carousel extends React.PureComponent {
    render() {
        const { classes } = this.props;
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        return (
            <SlickCarousel className={classes.container} {...settings}>
                {restaraunts.map((restaurant, index) => (
                    <GridContainer justify="center">
                        <RestaurantCard key={index} restaurant={restaurant} index={index} classes={classes} />
                    </GridContainer>
                ))}
            </SlickCarousel>
        );
    }
}
const restaraunts = [
    { name: 'Restaurant #1', image: image1, desc: 'Some description soon...' },
    { name: 'Restaurant #2', image: image2, desc: 'Some description soon...' },
    { name: 'Restaurant #3', image: image3, desc: 'Some description soon...' },
];
const styles = () => ({
    container: {
        top: '-300px',
        position: 'relative',
        zIndex: 1,
    },
    cardTitle,
    ...imagesStyle,
});

export default withStyles(styles)(Carousel);
