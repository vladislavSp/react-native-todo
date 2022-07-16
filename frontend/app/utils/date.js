const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

export const getFormatedDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()} ${months[date.getMonth()]}`;
};

const arr = [];

// 
const groupByDate = (arr) => arr.reduce((acc, cur) => {
    const time = getFormatedDate(cur.fixture.date);
    acc[time] = acc[time] || {
        date: time,
        matches: [],
    }

    acc[time].matches.push(cur);
    return Object.values(acc);
}, {});
