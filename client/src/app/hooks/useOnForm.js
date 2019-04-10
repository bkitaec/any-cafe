import { useState, useEffect, useCallback } from 'react';

const useOnForm = (form = {}, refresh = true) => {
    const [val, setValue] = useState(form);
    refresh &&
        useEffect(() => { // eslint-disable-line
            setValue(form);
        }, [form]);
    const onChange = useCallback(
        (e) => {
            setValue({
                ...(val || {}),
                [e.target.name]: e.target.value,
            });
        },
        [val]
    );
    return [val, onChange, setValue];
};

const useOnPlainForm = (form = {}) => {
    const [val, setValue] = useState(form);
    const onChange = useCallback(
        (e) => {
            setValue({
                ...(val || {}),
                [e.target.name]: e.target.value,
            });
        },
        [val]
    );
    return [val, onChange, setValue];
};

export { useOnForm, useOnPlainForm };
