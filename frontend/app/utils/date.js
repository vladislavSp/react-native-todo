const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

export const getFormatedDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()} ${months[date.getMonth()]}`;
};

const arr = [];

// 
const groupByDate = (arr) => arr.reduce((acc, cur) => {
    const time = getFormatedDate(cur.fixture.date);

    // формируем объект на основе даты, если его нет - создаем,
    // если он был, просто переприсваиваем его же
    acc[time] = acc[time] || {
        date: time,
        matches: [],
    }

    // закидываем данные в объект определенной даты - т.е создаем привязку объекта к дате
    acc[time].matches.push(cur);

    // возвращаем массив, вместо объекта
    return Object.values(acc);
}, {});
