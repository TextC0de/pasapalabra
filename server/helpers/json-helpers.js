export const isJsonString = (str) => {
    console.log('STR', str);
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};
