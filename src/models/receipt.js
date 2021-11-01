const { Schema, model, models } = require('mongoose')
const { uid } = require('uid')

const schema = new Schema({
  ID_AUTENTICACAO: { type: String, default: uid(16), unique: true },
  CNPJ_FAV: { type: String, required: true }, // CNPJ do Favorecido
  COD_BANCO: { type: String, required: true }, // Código do banco Favorecido
  AGENCIA: { type: String, required: true }, // Agencia favorecido
  CONTA: { type: String, required: true }, // Conta favorecido
  EMPRESA: { type: String, required: true }, // Nome da Empresa Favorecida
  DATA_PGTO: { type: Date, required: true, default: new Date() }, // Data pagamento - alterada para padronizar
  // HORA_PGTO: { type: String, required: true },
  DATA_VENC: { type: Date, required: true }, // Data de vecimento
  VALOR: { type: Number, required: true }, // Valor do pagamento
  VALOR_DESCONTO: { type: Number, required: false }, // Valor do desconto do pagamento
  IDENT_EXTRATO: { type: String, required: false }, // Identificação no extrato do favorecido > ID pagamento
})

const collection = model('receipt', schema)

module.exports = collection
