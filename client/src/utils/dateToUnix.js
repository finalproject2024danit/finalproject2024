export const dateToUnix = (dateString) => {
    const date = new Date(dateString);

    // Перевірка на валідність дати
    if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString);
        return null;
    }

    // Повертаємо timestamp в мілісекундах (без ділення на 1000)
    return date.getTime();  // Повертаємо timestamp в мілісекундах
};
