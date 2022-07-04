const Fixtures = require('../model/Fixtures');

const getFixtures = async (req, res) => {
    if (!req?.query?.id || !req?.query?.season) {
        return res.status(404).json({ 'message': `League ID/Season params required!` });
    }

    const standings = await Fixtures.findOne({
        $or: [{ 'league.id': req.query.id, 'league.season': req.query.season }]
    });

    if (!standings) {
        return res.status(404).json({ 'message': `Standings for league/cup ${req.query.id} and season ${req.query.season} not found!` });
    }

    res.json(standings);
};

module.exports = getFixtures;
