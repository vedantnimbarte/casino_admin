function allInputValuesExists(values) {
    const response = Object.values(values).every((value) => {
        if (value === '') {
            return false;
        }
        return true;
    });
    return response;
}

export default allInputValuesExists;
