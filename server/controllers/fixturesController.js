const Fixtures = require('../model/Fixtures');

const getFixtures = async (req, res) => {
    if (!req?.query?.id || !req?.query?.season) {
        return res.status(404).json({ 'message': `League ID/Season params required!` });
    }

    const page = req?.query?.page || 1; // return 1 if no exist from query
    const PAGE_SIZE = 7;
    const skip = (page - 1) * PAGE_SIZE;

    const query = {
        $or: [{
            league: req.query.id,
            season: req.query.season,
        }]
    };

    const standings = await Fixtures.findOne(query, { fixtures: { $slice: [skip, PAGE_SIZE] }});

    if (!standings) {
        return res.status(404).json({ 'message': `Standings for league/cup ${req.query.id} and season ${req.query.season} not found!` });
    }

    res.json(standings);
};

module.exports = getFixtures;
