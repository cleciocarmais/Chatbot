// index.js
const express = require("express");
const app = express();
const port = 3000;
const axios = require('axios');

// Middleware para aceitar JSON no corpo da requisição
app.use(express.json());

// Rota para teste simples
app.get("/", (req, res) => {
  res.send("🚀 Minha API está rodando e pronta para receber webhooks!");
});

// Rota que recebe o webhook do w-api
app.post("/w-api/webhook", (req, res) => {
  // console.log("📩 Webhook recebido do w-api:");
  // console.log(req.body);
  const token = 'SEU_TOKEN_AQUI';
  Dados = {
  "phone": req.body.chat.id,/* Telefone do destinatário*/
  "message": "Olá, em que posso usar vc?.",
  }


  axios.post('https://api.w-api.app/v1/message/send-text?instanceId=', 
  Dados, // corpo da requisição
  {
    headers: {
      'Authorization': `Bearer `,
      'Content-Type': 'application/json'
    }
  }
)
.then(res => console.log(res.data))
.catch(err => console.error(err.response ? err.response.data : err.message));


  if (req.body.status) {
    console.log(`Status recebido: ${req.body.status}`);
  }

});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Aguardando webhooks em http://localhost:${port}/w-api/webhook`);
});
