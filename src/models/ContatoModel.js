const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
})

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.prototype.register = async function () {
    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
}

Contato.prototype.valida = function () {
    console.log(this.body);
    this.cleanUp();
    console.log("Corpo do objeto após cleanUp:", this.body);

    if (!this.body.nome) {
        console.log("Nome é um campo obrigatório. Adicionando erro.");
        this.errors.push('Nome é um campo obrigatório.');
    };
    if (!this.body.email.trim() && !this.body.telefone.trim()) {
        console.log("Nenhum contato fornecido. Adicionando erro.");
        this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.')
    };
    if (this.body.email.trim() && !validator.isEmail(this.body.email)){
        console.log("E-mail inválido. Adicionando erro.");
        this.errors.push('E-mail inválido')
    };
    if (this.body.telefone.trim() && !validator.isMobilePhone(this.body.telefone.trim())) {
        console.log("Telefone inválido. Adicionando erro.");
        this.errors.push('Telefone inválido.');
    };
};

Contato.prototype.cleanUp = function () {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }
    this.body = {
        nome: this.body.nome.trim(),
        sobrenome: this.body.sobrenome.trim(),
        email: this.body.email.trim(),
        telefone: this.body.telefone.trim()
    }

}

Contato.prototype.edit = async function (id) {
    if (typeof id !== 'string') return;
    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
};

// Metodos estaticos
Contato.buscaPorId = async function (id) {
    if (typeof id !== 'string') return;
    const contato = await ContatoModel.findById(id);
    return contato
}

Contato.buscaContatos = async function () {
    const contatos = await ContatoModel.find()
        .sort({ criadoEm: -1 })
    return contatos
}

Contato.delete = async function (id) {
    if (typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({ _id: id })
    return contato
}


module.exports = Contato;