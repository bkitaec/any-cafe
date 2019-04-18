import { get } from 'utils/lo/lo';

export const getValidationProps = (fieldName, validation) => ({
    error: get(validation, `${fieldName}.length`),
    helperText: get(validation, `${fieldName}.length`) > 0 ? get(validation, `${fieldName}[0]`, '') : '',
});
