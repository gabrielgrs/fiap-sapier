const { Router } = require('express')

const { cnpj } = require('cpf-cnpj-validator')

const paymentModel = require('./models/payment')
const paymentReceiptModel = require('./models/receipt')

const app = Router()

app.get('/', (req, res) => res.status(200).send('API working!'))

/*
 * comportamento: cria o pagamento
 * descrição: Interface responsável por enviar pagamento do App para a Instituição Financeira.
 */
app.post('/envioPagamento', async (req, res) => {
  try {
    const { ID_AUTENTICACAO, DATA_ENVIO } = await paymentModel.create({
      ...req.body,
      CNPJ_DEB: cnpj.strip(req.body.CNPJ_DEB),
      CNPJ_FAV: cnpj.strip(req.body.CNPJ_FAV),
    })
    return res.status(201).send({ ID_AUTENTICACAO, DATA_ENVIO })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Falha ao processar requisição' })
  }
})

/*
 * comportamento: cria comprovante de pagamento
 * descrição: Interface Webhook responsável por enviar o Comprovante de Efetivação do Pagamento da Instituição Financeira para o App.
 */
app.post('/comprovantePagamento', async (req, res) => {
  try {
    const { ID_AUTENTICACAO } = await paymentReceiptModel.create({
      ...req.body,
      CNPJ_FAV: cnpj.strip(req.body.CNPJ_FAV),
    })
    return res
      .status(201)
      .send({ ID_AUTENTICACAO, message: 'Comprovante gerado com sucesso' })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Falha ao processar requisição' })
  }
})

/*
 * comportamento: consulta comprovante
 * descrição: Interface responsável por consultar o Comprovante do Pagamento da Instituição Financeira para o App.
 */
app.get('/consultaComprovante', async (req, res) => {
  try {
    const { ID_AUTENTICACAO } = req.query
    const data = await paymentReceiptModel.findOne({ ID_AUTENTICACAO })
    return res.status(200).send(data)
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Falha ao processar requisição' })
  }
})

/*
 * comportamento: procura pagamentos por cnpj, startDate ou endDate
 * descrição: Interface responsável por receber o Extrato de Pagamentos da Instituição Financeira para o App.
 */
app.get('/extratoPagamentos', async (req, res) => {
  try {
    const { CNPJ_FAV, DATA_INI, DATA_FIM } = req.query

    if (!CNPJ_FAV || !DATA_INI || !DATA_FIM)
      return res
        .status(500)
        .send({ message: 'CNPJ_FAV, DATA_INI e DATA_FIM são obrigatório' })

    const data = await paymentReceiptModel.find({
      // CNPJ_FAV: { $regex: cnpj.strip(CNPJ_FAV), $options: 'i' },
      // DATA_PGTO: { $gte: new Date(DATA_INI), $lt: new Date(DATA_FIM) },
    })

    return res.status(200).send(data)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
})

module.exports = app
