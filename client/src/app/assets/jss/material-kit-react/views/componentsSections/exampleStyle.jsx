import { conatinerFluid } from 'app/assets/jss/material-kit-react.jsx';

import imagesStyle from 'app/assets/jss/material-kit-react/imagesStyles.jsx';

const exampleStyle = {
    section: {
        padding: '70px 0',
    },
    container: {
        ...conatinerFluid,
        textAlign: 'center !important',
    },
    ...imagesStyle,
    link: {
        textDecoration: 'none',
    },
};

export default exampleStyle;
