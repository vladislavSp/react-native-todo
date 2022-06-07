const SeasonTeams = require('../model/SeasonTeams');

const getTeamsBySeason = async (req, res) => {
    if (!req?.query?.leagueId || !req?.query?.season) {
        return res.status(400).json({ 'message': 'League ID and season year required!'});
    }

    const { leagueId, season } = req.query;
    const seasonWithTeams = await SeasonTeams.findOne({ leagueId, season });

    if (!seasonWithTeams) {
        res.status(204).json({ 'message': `No data in ${season} year and league id ${leagueId}!` });
    }

    res.json(seasonWithTeams);
}

module.exports = getTeamsBySeason;
