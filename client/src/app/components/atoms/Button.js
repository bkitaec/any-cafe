import React, { useCallback } from 'react';
import { Button as PUIButton } from '@mic3/platform-ui';

import history from 'store/History';

const Button = ({ onClick, to, ...restProps }) => {
    const selfOnClick = useCallback(
        (e) => {
            if (to) {
                history.push(to);
            } else {
                onClick(e);
            }
        },
        [onClick, to]
    );
    return <PUIButton {...restProps} onClick={selfOnClick} />;
};

export default Button;
