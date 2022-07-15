const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

const getFormatedDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()} ${months[date.getMonth()]}`;
};

const arr = [];

const newDateObj = arr.reduce((acc, cur) => {
    const time = getFormatedDate(cur.fixture.date);
    acc[time] = acc[time] || {
        date: time,
        fixture: [],
        league: [],
        teams: [],
        goals: [],
        score: [],
    }

    acc[time].fixture.push(cur.fixture);
    acc[time].league.push(cur.league);
    acc[time].teams.push(cur.teams);
    acc[time].goals.push(cur.goals);
    acc[time].score.push(cur.score);
    return acc;
}, {});