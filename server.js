const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());
app.use(express.static('public'));

const db = new sqlite3.Database('database.db');

// Criar tabelas automaticamente
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS os (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente TEXT,
    aparelho TEXT,
    problema TEXT,
    status TEXT,
    valor REAL,
    custo REAL,
    data TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS financeiro (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT,
    descricao TEXT,
    valor REAL,
    data TEXT
  )`);
});

// Criar OS
app.post('/os', (req, res) => {
  const { cliente, aparelho, problema, valor, custo } = req.body;

  db.run(`
    INSERT INTO os (cliente, aparelho, problema, status, valor, custo, data)
    VALUES (?, ?, ?, 'Em andamento', ?, ?, datetime('now'))
  `, [cliente, aparelho, problema, valor, custo]);

  res.send("OS criada");
});

// Listar OS
app.get('/os', (req, res) => {
  db.all("SELECT * FROM os", (err, rows) => {
    res.json(rows);
  });
});

// Financeiro
app.get('/financeiro', (req, res) => {
  db.all("SELECT * FROM financeiro", (err, rows) => {
    res.json(rows);
  });
});

app.listen(3000, () => console.log("Rodando em http://localhost:3000"));
