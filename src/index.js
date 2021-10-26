require('dotenv').config()
const express = require('express')
const uuid = require('uuid')

const app = express()

const validation = require('./validation')

const payments = []

app.post('/sendPaymnet', (req, res) => {
  try {
    // const envio_pagamento = {
    //   CNPJ: '',
    //   COD_BANCO: '',
    //   AGENCIA: '',
    //   CONTA: '',
    //   EMPRESA: '',
    //   TIPO_PAGAMENTO: '',
    //   NOSSO_NUMERO: '',
    //   DATA_VENC: '',
    //   MOEDA: '',
    //   VALOR: '',
    //   IDENT_EXTRATO: '',
    // }
    const error = validation.sendPayment(req.body)
    if (error) return res.status(400).send({ error: error })
    const ID_AUTENTICACAO = uuid()
    payments.push({ ...req.body, ID_AUTENTICACAO })

    return res.status(200).send({ ID_AUTENTICACAO, DATA_ENVIO: new Date() })
  } catch (error) {
    return res.status(500).send(error)
  }
})

// comprovanteDePagamento
app.get('/proofOfPayment', (req, res) => {
  try {
    // const comprovante_pagamento = {
    //   ID_AUTENTICACAO: '',
    //   CNPJ: '',
    //   COD_BANCO: '',
    //   AGENCIA: '',
    //   CONTA: '',
    //   EMPRESA: '',
    //   DATA_PGTO: '',
    //   HORA_PGTO: '',
    //   DATA_VENC: '',
    //   VALOR: '',
    //   VALOR_DESCONTO: '',
    //   IDENT_EXTRATO: '',
    // }
    return res.status(200).send({ message: 'olá mundo' })
  } catch (error) {
    return res.status(500).send(error)
  }
})

// consultaComprovante
app.get('/voucherQuery', (req, res) => {
  try {
    // const consulta_comprovante = {
    //   ID_AUTENTICACAO: '',
    //   CNPJ: '',
    //   COD_BANCO: '',
    //   AGENCIA: '',
    //   CONTA: '',
    //   EMPRESA: '',
    //   DATA_PGTO: '',
    //   HORA_PGTO: '',
    //   DATA_VENC: '',
    //   VALOR: '',
    //   VALOR_DESCONTO: '',
    //   IDENT_EXTRATO: '',
    // }
    const { ID_AUTENTICACAO } = req.query
    const data = payments.find((x) => x.ID_AUTENTICACAO === ID_AUTENTICACAO)
    return res.status(200).send(data)
  } catch (error) {
    return res.status(500).send(error)
  }
})

// extratoPagamentos
app.get('/statementPayments', (req, res) => {
  try {
    // const extrato_pagament = {
    //   CNPJ: '',
    //   EMPRESA: '',
    //   COD_BANCO: '',
    //   AGENCIA: '',
    //   CONTA: '',
    //   EMPRESA: '',
    //   DATA_PGTO: '',
    //   HORA_PGTO: '',
    //   DATA_VENC: '',
    //   VALOR: '',
    //   VALOR_DESCONTO: '',
    //   IDENT_EXTRATO: '',
    // }
    return res.status(200).send({ message: 'olá mundo' })
  } catch (error) {
    return res.status(500).send(error)
  }
})

app.listen(process.env.PORT, () =>
  console.log(`process runing at port ${process.env.PORT}`)
)

module.exports = app
