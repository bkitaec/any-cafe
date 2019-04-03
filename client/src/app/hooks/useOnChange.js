import { useState, useEffect, useCallback } from 'react';

const useOnChange = (value, refresh = true) => {
    const [val, setValue] = useState(value);
    refresh &&
        useEffect(() => { // eslint-disable-line
            setValue(value);
        }, [value]);
    const onChange = useCallback(
        (e) => {
            setValue(e.target.value);
        },
        [setValue]
    );
    return [val, onChange, setValue];
};

export default useOnChange;
