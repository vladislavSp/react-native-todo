// Controller from MVC model - leagues
const Leagues = require('../model/Leagues');

const getAllLeagues = async (req, res) => {
    const leagues = await Leagues.find();
    if (!leagues) return res.status(404).json({ 'message': 'Leagues not found!' });
    res.json(leagues);
};

const createNewLeague = (req, res) => {
    const newLeague = {
        id: data.leagues[data.leagues.length - 1].id + 1 || 1,
        name: req.body.name,
        country: req.body.country,
    }

    if (!newLeague.name || !newLeague.country) {
        return res.status(400).json({ "message": "Name and country are required."});
    }

    data.setLeagues([...data.leagues, newLeague]);
    res.status(201).json(data.leagues);
};

const updateLeague = (req, res) => {
    const league = data.leagues.find(l => l.id === parseInt(req.body.id));
    if (!league) {
        return res.json({ "message": `League ID ${req.body.id} not found` });
    }
    if (req.body.name) league.name = req.body.name;
    if (req.body.country) league.country = req.body.country;
    const filteredArray = data.leagues.filter(league => league.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, league];
    data.setLeagues(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.leagues);
};

const deleteLeague = (req, res) => {
    const league = data.leagues.find(league => league.id === parseInt(req.body.id));
    if (!league) {
        res.status(404).json({ "message": `League ID ${req.body.id} not found`});
    }

    const filteredArray = data.leagues.filter(league => league.id !== parseInt(req.body.id));
    data.setLeagues([...filteredArray]);
    res.json(data.leagues);
};

const getLeague = async (req, res) => {
    if(!req?.params?.id) {
        res.status(404).json({ 'message': `League ID params required!` });
    }

    const league = await Leagues.findOne({ 'league.id': req.params.id });
    res.json(league);
};

module.exports = {
    getAllLeagues,
    createNewLeague,
    updateLeague,
    deleteLeague,
    getLeague
};
