export const unixToDate = (timestamp) => {
    // Перевірка, чи timestamp в мілісекундах, і якщо так, то поділити на 1000
    const timestampInSeconds = timestamp > 10000000000 ? timestamp / 1000 : timestamp;
    const date = new Date(timestampInSeconds * 1000);
    return date.toISOString().split("T")[0]; // форматуємо дату у вигляді YYYY-MM-DD
};
