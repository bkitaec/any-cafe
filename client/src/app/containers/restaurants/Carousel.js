import React, { PureComponent } from 'react';
import SlickCarousel from 'react-slick';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import GridContainer from 'app/components/uikit/Grid/GridContainer.jsx';
import Card from 'app/components/uikit/Card/Card.jsx';
import CardBody from 'app/components/uikit/Card/CardBody.jsx';
import CardFooter from 'app/components/uikit/Card/CardFooter.jsx';

import { cardTitle } from 'app/assets/jss/material-kit-react.jsx';
import imagesStyle from 'app/assets/jss/material-kit-react/imagesStyles.jsx';
import skewStyles from 'app/assets/jss/styles/skewStyles.jsx';

const RestaurantCard = ({ classes, restaurant }) => (
    <Card className={`${classes.skew} ${classes.card}`}>
        <CardBody className={`${classes.skewChild} ${classes.cardBody}`}>
            <div className={`${classes.imgRaised} ${classes.imageWrapper} ${classes.imgRounded} ${classes.imgFluid} ${classes.skew}`}>
                <img className={`${classes.skewChild} ${classes.image}`} src={restaurant.image} alt={restaurant.name} />
            </div>
            <h4 className={classes.cardTitle}>{restaurant.name}</h4>
            <p>{restaurant.phone}</p>
        </CardBody>
        <CardFooter className={`${classes.cardFooter} ${classes.skewChild} ${classes.cardBody}`}>
            <div className={classes.flex}>
                <Icon>star</Icon>
                <Typography>4.7</Typography>
            </div>
            <Icon>place</Icon>
        </CardFooter>
    </Card>
);

class Carousel extends PureComponent {
    render() {
        const { classes, restaraunts } = this.props;
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        return (
            <SlickCarousel className={classes.container} {...settings}>
                {restaraunts.map((restaurant, index) => (
                    <GridContainer justify="center" key={index}>
                        <RestaurantCard restaurant={restaurant} index={index} classes={classes} />
                    </GridContainer>
                ))}
            </SlickCarousel>
        );
    }
}

const styles = () => ({
    ...imagesStyle,
    ...skewStyles,
    cardTitle,
    container: {
        top: '-175px',
        position: 'relative',
        zIndex: 1,
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
    card: {
        width: '20rem',
        margin: '0 auto',
        '@media (max-width: 320px)': {
            maxWidth: '14rem',
            right: '-2rem',
        },
        '@media (min-width: 321px) and (max-width: 576px)': {
            maxWidth: '18rem',
            right: '-2rem',
        },
    },
    cardBody: {
        padding: '0px 10px 0px 60px',
    },
    cardFooter: {
        justifyContent: 'space-between',
    },
    imageWrapper: {
        width: '70px',
        height: '70px',
        overflow: 'hidden',
        textAlign: 'center',
        position: 'absolute',
        left: '-25px',
        top: '20px',
    },
    image: {
        width: 'auto',
        height: '110px',
        position: 'absolute',
    },
});

export default withStyles(styles)(Carousel);
