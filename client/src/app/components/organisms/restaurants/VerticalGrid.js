import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MdiIcon, GridList, GridListTile, GridListTileBar, IconButton, StarBorderIcon } from '@mic3/platform-ui';

const imagePath = 'https://image.shutterstock.com/z/stock-photo-close-up-of-a-cup-with-hot-cappuccino-in-a-cosy-cafe-with-foam-design-on-it-of-heart-1228620277.jpg';
const tileData = [
    {
        img: imagePath,
        title: 'Breakfast',
        author: 'jill111',
        cols: 2,
        featured: true,
    },
    {
        img: imagePath,
        title: 'Tasty burger',
        author: 'director90',
    },
    {
        img: imagePath,
        title: 'Camera',
        author: 'Danson67',
    },
    {
        img: imagePath,
        title: 'Morning',
        author: 'fancycrave1',
        featured: true,
    },
    {
        img: imagePath,
        title: 'Hats',
        author: 'Hans',
    },
    {
        img: imagePath,
        title: 'Honey',
        author: 'fancycravel',
    },
    {
        img: imagePath,
        title: 'Vegetables',
        author: 'jill111',
        cols: 2,
    },
    {
        img: imagePath,
        title: 'Water plant',
        author: 'BkrmadtyaKarki',
    },
    {
        img: imagePath,
        title: 'Mushrooms',
        author: 'PublicDomainPictures',
    },
];

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function VerticalGrid(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
                {tileData.map((tile, index) => (
                    <GridListTile key={index}>
                        <img src={tile.img} alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                            actionIcon={
                                <IconButton>
                                    <MdiIcon name="close" className={classes.title} />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

VerticalGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VerticalGrid);
