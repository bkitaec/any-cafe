/**
 * Creates and returns a new debounced version of the passed function.
 * The returned function will postpone its execution when
 * the specified delay is elapsed since the last time it was invoked.
 *
 * @param func the function to debounce.
 * @param dealy the debounce delay in milliseconds.
 */
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

export { debounce };
