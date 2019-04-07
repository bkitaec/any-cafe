import { useState, useCallback } from 'react';

const useMenu = (initial = null) => {
    const [anchorEl, toggleElement] = useState(initial);

    const open = useCallback((event) => {
        toggleElement(event.currentTarget);
    }, []);

    const close = useCallback(() => {
        toggleElement(null);
    }, []);

    return [anchorEl, open, close];
};

export default useMenu;
