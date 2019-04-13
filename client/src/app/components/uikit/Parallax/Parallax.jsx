import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';

import parallaxStyle from 'app/assets/jss/material-kit-react/components/parallaxStyle.jsx';

class Parallax extends React.PureComponent {
    constructor(props) {
        super(props);
        const windowScrollTop = window.pageYOffset / 3;
        this.state = {
            transform: 'translate3d(0,' + windowScrollTop + 'px,0)',
        };
        this.resetTransform = this.resetTransform.bind(this);
    }
    componentDidMount() {
        const windowScrollTop = window.pageYOffset / 3;
        this.setState({
            transform: 'translate3d(0,' + windowScrollTop + 'px,0)',
        });
        window.addEventListener('scroll', this.resetTransform);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.resetTransform);
    }
    resetTransform() {
        var windowScrollTop = window.pageYOffset / 3;
        this.setState({
            transform: 'translate3d(0,' + windowScrollTop + 'px,0)',
        });
    }
    render() {
        const { classes, filter, className, children, style, image, small, medium } = this.props;
        return (
            <div
                className={`
                        ${classes.parallax}
                        ${filter ? classes.filter : ''}
                        ${medium ? classes.medium : ''}
                        ${small ? classes.small : ''}
                        ${className ? className : ''}
                    `}
                style={{
                    ...style,
                    backgroundImage: 'url(' + image + ')',
                    ...this.state,
                }}
            >
                {children}
            </div>
        );
    }
}

Parallax.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    filter: PropTypes.bool,
    children: PropTypes.node,
    style: PropTypes.string,
    image: PropTypes.string,
};

export default withStyles(parallaxStyle)(Parallax);
