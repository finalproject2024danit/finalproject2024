export const unixToDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
        return '';
    }
    return date.toISOString().split("T")[0];
};