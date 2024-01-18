const Player = require('../models/player');

const addPlayer = (req, res) => {
    const player = new Player(req.body);

    player.save()
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
        })
}

const getPlayersBySearch = (req, res) => {
    const search = req.params.search;
    const searchRegex = new RegExp(search, 'i');
    Player.find({
        $or: [
          { $text: { $search: searchRegex } }, // Za pretragu po punom imenu i prezimenu koristimo $text operator
        ],
      })
        .sort({ createdAt: -1 })
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
        })
};

const getPlayerById = (req, res) => {
    const id = req.params.id;
    Player.findById(id)
        .populate('team')
        .exec()
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
        })
};

const updatePlayer = (req, res) => {
    const player = new Player(req.body);
    Player.findByIdAndUpdate(
        player._id,
        player,
        { new: true }
    )
        .then(() => {
            res.json(player);
        })
        .catch((error) => {
            console.error(error);
        })
}

const deletePlayer = (req, res) => {
    const id = req.params.id;
    Player.deleteOne({ _id: id })
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
        })
}

module.exports = {
    addPlayer,
    getPlayersBySearch,
    getPlayerById,
    updatePlayer,
    deletePlayer
}