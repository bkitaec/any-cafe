export const SHOW_TOASTR = '@@anycafe/app/SHOW_TOASTR';

export const showToastr = (options: Object) => (dispatch: Function) => {
    dispatch({ type: SHOW_TOASTR, payload: options });
};
