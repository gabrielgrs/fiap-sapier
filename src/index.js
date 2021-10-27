require('dotenv').config()
const express = require('express')
const uuid = require('uuid')
const dateFNS = require('date-fns')

const app = express()

const validation = require('./validation')

const payments = []

const routes = {
  SEND_PAYMENT: '/envioPagamento',
  PROOF_OF_PAYMENT: '/comprovantePagamento',
  VOUCHER_QUERY: '/consultaComprovante',
  STATEMENT_PAYMENTS: '/extratoPagamentos',
}

app.get('/', (req, res) => {
  try {
    return res.status(200).send({
      endpoints: [
        {
          path: routes.SEND_PAYMENT,
          method: 'post',
          body: {
            CNPJ: 'string',
            COD_BANCO: 'string',
            AGENCIA: 'string',
            CONTA: 'string',
            EMPRESA: 'string',
            TIPO_PAGAMENTO: 'string',
            NOSSO_NUMERO: 'string',
            DATA_VENC: 'string',
            MOEDA: 'string',
            VALOR: 'string',
            IDENT_EXTRATO: 'string',
          },
        },
        {
          path: routes.PROOF_OF_PAYMENT,
          method: 'get',
          query: {
            ID_AUTENTICACAO: 'string',
          },
        },
        {
          path: routes.VOUCHER_QUERY,
          method: 'get',
          query: {
            ID_AUTENTICACAO: 'string',
          },
        },
        {
          path: routes.STATEMENT_PAYMENTS,
          method: 'get',
          query: {
            CNPJ: 'string',
            DATA_INI: 'date',
            DATA_FIM: 'date',
          },
        },
      ],
    })
  } catch (error) {
    return res.status(500).send(error)
  }
})

app.post(routes.SEND_PAYMENT, (req, res) => {
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
app.get(routes.PROOF_OF_PAYMENT, (req, res) => {
  try {
    // const comprovante_pagamento = {
    //   ID_AUTENTICACAO: '',
    //   CNPJ: '',
    //   COD_BANCO: '',CNPJ
    // }
    return res.status(200).send({ message: 'olá mundo' })
  } catch (error) {
    return res.status(500).send(error)
  }
})

// consultaComprovante
app.get(routes.VOUCHER_QUERY, (req, res) => {
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
app.get(routes.STATEMENT_PAYMENTS, (req, res) => {
  try {
    const { CNPJ, DATA_INI, DATA_FIM } = req.query

    const data = payments.filter((p) => {
      if (CNPJ && p.CNPJ === CNPJ) return p
      if (DATA_INI && dateFNS.isAfter(p.DATA_INI, DATA_INI)) return p
      if (DATA_FIM && dateFNS.isBefore(p.DATA_FIM, DATA_FIM)) return p
      return false
    })

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
    return res.status(200).send(data)
  } catch (error) {
    return res.status(500).send(error)
  }
})

app.listen(process.env.PORT, () =>
  console.log(`process runing at port ${process.env.PORT}`)
)

module.exports = app
