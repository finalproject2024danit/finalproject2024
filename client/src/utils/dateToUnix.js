export const dateToUnix = (dateString) => {
    const date = new Date(dateString);

        if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString);
        return null;
    }

        return date.getTime();  
};
