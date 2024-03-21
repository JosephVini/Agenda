const ContatoModel = require('../models/ContatoModel')

exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    })
}

exports.register = async (req, res) => {
    try {
        const contato = new ContatoModel(req.body)
        await contato.register()

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato/index/'))
            return
        }

        req.flash('success', 'Contato registrado com sucesso.')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
        return
    } catch (e) {
        console.log(e)
        return res.render('404')
    }
}

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404')
    const contato = await ContatoModel.buscaPorId(req.params.id)
    if (!contato) return res.render('404')
    res.render('contato', { contato })
}

exports.edit = async function (req, res) {
    try {
        if (!req.params.id) return res.render('404');
        const contato = new ContatoModel(req.body);
        const contatoID = req.params.id
        await contato.edit(contatoID);

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect(`/contato/index/${contatoID}`));
            return;
        }

        req.flash('success', 'Contato editado com sucesso.');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};

exports.delete = async function (req, res) {
    if (!req.params.id) return res.render('404')
    const contato = await ContatoModel.delete(req.params.id)
    if (!contato) return res.render('404')
    
    req.flash('success', 'Contato deletado com sucesso.')
    req.session.save(() => res.redirect('/'))
    return
}