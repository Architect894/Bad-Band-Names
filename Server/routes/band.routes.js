const bandController = require('../controllers/band.controller')

module.exports = (app) => {
    app.get('/api/findAllBands', bandController.findAllBands)
    app.get('/api/findOneBand/:id', bandController.findOneBand)
    app.post('/api/createBand', bandController.createBand)
    app.put('/api/updateBand/:id', bandController.updateBand)
    app.delete('/api/deleteBand/:id', bandController.deleteBand)
}