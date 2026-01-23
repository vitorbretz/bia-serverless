// lambda.js
const serverlessExpress = require('@codegenie/serverless-express')
const app = require('./config/express-lambda')()

// Versão 4+ do @codegenie/serverless-express usa async/await
exports.handler = async (event, context) => {
  return serverlessExpress({ app })(event, context)
}
