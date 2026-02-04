const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

// Token fixo da API do Clash of Clans
const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImQ5MGY0YWI0LTlmMzUtNDQ1Ni04N2UyLTY0OTg4YTM0YzQ4MyIsImlhdCI6MTc3MDIyNjE0Nywic3ViIjoiZGV2ZWxvcGVyLzA3MWEzY2Q1LWZmNGMtNWY1Yi04OWY2LTI2YTE5OTc2ZjdjYyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE2Ny4yNTAuMTU1LjY5Il0sInR5cGUiOiJjbGllbnQifV19.r2QJ9MWPMcnsOp5358owSD1OX5KBrD72g42lWGwccpTtLBcHr_H_alkOfvASDN9EmWglobjVJTNwiuunNaxlxw';

// Middleware
app.use(cors());
app.use(express.json());

// Rota para buscar dados do jogador
app.get('/api/player/:playerId', async (req, res) => {
  try {
    let playerId = req.params.playerId;
    
    // Garantir que o playerId tenha o formato correto com #
    if (!playerId.startsWith('#')) {
      playerId = '#' + playerId;
    }

    console.log(`Buscando jogador: ${playerId}`);

    const encodedPlayerId = encodeURIComponent(playerId);
    const response = await fetch(`https://api.clashofclans.com/v1/players/${encodedPlayerId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });

    if (!response.ok) {
      console.error(`Erro na API: ${response.status} - ${response.statusText}`);
      
      if (response.status === 403) {
        return res.status(403).json({ error: 'Token inválido ou expirado' });
      }
      if (response.status === 404) {
        return res.status(404).json({ error: 'Jogador não encontrado' });
      }
      if (response.status === 429) {
        return res.status(429).json({ error: 'Muitas requisições. Tente novamente em alguns minutos.' });
      }
      
      return res.status(response.status).json({ 
        error: `Erro na API: ${response.status} - ${response.statusText}` 
      });
    }

    const data = await response.json();
    console.log(`Jogador encontrado: ${data.name}`);
    
    res.json(data);
  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend funcionando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});