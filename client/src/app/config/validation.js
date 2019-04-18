export const phone = {
    presence: true,
    format: {
        pattern: `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`, // eslint-disable-line
        flags: 'im',
        message: 'is invalid',
    },
};

export const password = {
    presence: true,
    length: {
        minimum: 5,
    },
};

export const rePassword = {
    presence: true,
    equality: {
        attribute: 'password',
        message: '^The passwords does not match',
    },
};

export const name = {
    presence: true,
    length: {
        minimum: 3,
        maximum: 20,
    },
    format: {
        pattern: '[a-z0-9]+',
        flags: 'i',
        message: 'can only contain a-z and 0-9',
    },
};

export default {
    phone,
    password,
    rePassword,
    name,
};
