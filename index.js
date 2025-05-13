const axios = require('axios');
const qs = require('qs');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 80;
app.use(cors());
const apiUrl = 'https://duspay.com.br/v3/pix/qrcode';

var client_id = `lucia_7023993087`
var client_secret = `1d0bbddc0024054bcfed1acfde824c5ea115a639ef3912947596e5cad86d69de`

async function genQR( val ){
  const postData = {
    client_id,
    client_secret,
    nome: 'pcc',
    cpf: 'pcc',
    valor: val,
    descricao: 'Descrição do pagamento',
    urlnoty: 'https://seuservidor.com/callback'
  };
  
  return await axios.post(apiUrl, qs.stringify(postData), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => {
    return response.data.qrcode
  })
  .catch(error => {
    console.error('Erro na requisição:', error.response ? error.response.data : error.message);
  });
  
}







// Middleware opcional para servir arquivos estáticos
app.use(express.static('public'));

// Rota raiz
app.get('/gen',async (req, res) => {
  await genQR(req.query.val)
  .then(( a) => res.send(a))
  
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
