const sendPayment = (data) => {
  if (!data.cnpj) return 'CNPJ é obrigatório'

  return null
}

module.exports = {
  sendPayment,
}
