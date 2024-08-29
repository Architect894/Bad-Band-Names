const Band = require('../models/band.model')

module.exports = {
    // Read All
    findAllBands: (req, res) => {
        Band.find()
            .then((allBands) => {
                res.status(200).json(allBands)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    // Read One (Finding by _id)
    findOneBand: (req, res) => {
        console.log(req.params);
        Band.findOne({_id: req.params.id})
            .then((oneBand) => {
                res.status(200).json(oneBand)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    // Create
    createBand: (req, res) => {
        console.log(req.body);
        Band.create(req.body)
            .then((newBand) => {
                res.status(201).json(newBand)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    // Update (Finding by _id)
    updateBand: (req, res) => {
        Band.findOneAndUpdate({ _id: req.params.id },
            req.body,
            { new: true, runValidators: true })
            .then((updatedBand) => {
                res.json(updatedBand)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    // Delete (Finding by _id)
    deleteBand: (req, res) => {
        Band.deleteOne({_id: req.params.id})
            .then((result) => {
                res.status(201).json(result)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
}