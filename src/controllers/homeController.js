const ContatoModel = require('../models/ContatoModel.js')

exports.index = async (req, res) => {
    const contatos = await ContatoModel.buscaContatos()
    res.render('index', { contatos })
}
