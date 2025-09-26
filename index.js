// index.js
const express = require("express");
const app = express();
const port = 3000;

// Middleware para aceitar JSON no corpo da requisição
app.use(express.json());

// Rota para teste simples
app.get("/", (req, res) => {
  res.send("🚀 Minha API está rodando e pronta para receber webhooks!");
});

// Rota que recebe o webhook do w-api
app.post("/w-api/webhook", (req, res) => {
  console.log("📩 Webhook recebido do w-api:");
  console.log(req.body);

  // aqui você pode salvar no banco, enviar para outra API, etc.
  // Exemplo: se o webhook tiver um campo 'status'
  if (req.body.status) {
    console.log(`Status recebido: ${req.body.status}`);
  }

  // Sempre responder 200 para confirmar o recebimento
  res.status(200).send({ message: "Webhook do w-api recebido com sucesso!" });
});

// Inicia o servidor
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Aguardando webhooks em http://localhost:${port}/w-api/webhook`);
});
