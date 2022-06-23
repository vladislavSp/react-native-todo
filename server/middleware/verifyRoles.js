const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.endStatus(401);
        const rolesArray = [...allowedRoles];
        // проверка, если есть роль в массиве юзера - значит даем доступ к запросу
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles;
