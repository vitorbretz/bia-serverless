const express = require("express");
var cors = require("cors");
const config = require("config");
var bodyParser = require("body-parser");

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set("port", process.env.PORT || config.get("server.port"));

  // parse request bodies (req.body)
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(cors());

  // Rotas da API
  require("../api/routes/ping")(app);
  require("../api/routes/tarefas")(app);
  require("../api/routes/versao")(app);

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  return app;
};
