const Team = require('../models/team');

const getTeamsBySearch = (req, res) => {
    const search = req.params.search;
    Team.find({ teamName: { $regex: new RegExp(search, 'i') } }).sort({createdAt: -1})
    .then((result) => {
        res.json(result);
        res.send();
    })
    .catch((error) => {
        console.error(error);
    })
};

const getAllTeams = (req, res) => {
    Team.find().sort({createdAt: -1})
    .then((result) => {
        res.json(result);
        res.send();
    })
    .catch((error) => {
        console.error(error);
    })
};

const getTeamById = (req, res) => {
    const id = req.params.id;
    Team.findById(id)
    .then((result) => {
        res.json(result);
        res.send();
    })
    .catch((error) => {
        console.error(error);
    })
}

const addTeam = (req, res) => {
    const team = new Team(req.body);
    team.save()
    .then(() => {
        res.write(JSON.stringify(team));
        res.send();
    })
    .catch((error) => {
        console.error(error);
    })
}

const updateTeam = (req, res) => {
    const team = new Team(req.body);
    Team.findByIdAndUpdate(
        team._id,
        team,
        {new: true}
    )
    .then(() => {
        res.write(JSON.stringify(team));
        res.send();
    })
    .catch((error) => {
        console.error(error);
    })
}

const deleteTeam = (req, res) => {
    const id = req.params.id;
    Team.deleteOne({_id: id})
    .then((result) => {
        res.json(result);
        res.send();
    })
    .catch((error) => {
        console.error(error);
    })
}

module.exports = {
    getTeamsBySearch,
    addTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam
}