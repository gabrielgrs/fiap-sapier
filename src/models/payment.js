const { Schema, model, models } = require('mongoose')
const { uid } = require('uid')

const schema = new Schema({
  ID_AUTENTICACAO: { type: String, default: uid(16), unique: true },
  CNPJ_DEB: { type: String, required: true }, // CNPJ debitado
  CNPJ_FAV: { type: String, required: true }, // CNPJ favorecido
  COD_BANCO: { type: String, required: true }, // Código Banco favorecido
  AGENCIA: { type: String, required: true }, // Agencia Favorecida
  CONTA: { type: String, required: true }, // Conta favorecida
  EMPRESA: { type: String, required: true }, // Nome da Empresa Favorecida
  TIPO_PAGAMENTO: { type: String, required: true, enum: [1, 2] }, // Tipo de pagamento, 1 - consumo, 2 - impostos
  NOSSO_NUMERO: { type: String, required: false }, // Número atribuído pelo banco
  DATA_VENC: { type: String, required: true }, // Data de vencimento
  MOEDA: { type: String, required: true, role: ['REA', '009'] }, // Moeda REA ou 009
  VALOR: { type: Number, required: true }, // Valor do pagamento
  IDENT_EXTRATO: { type: String, required: false }, // Identificação do extrato do favorecido
})

const collection = model('payment', schema)

module.exports = collection
