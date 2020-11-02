export const validateEmail = (email) => {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const filterObject = (object, func) => {
    return Object.keys(object)
        .filter((key) => func(key))
        .reduce((obj, key) => {
            obj[key] = object[key]; // eslint-disable-line
            return obj;
        }, {});
};

export default {};
