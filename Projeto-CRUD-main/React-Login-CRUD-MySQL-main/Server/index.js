const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const saltRounds = 10;

{/*Conexão Com o banco de dados */}

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "cadastromoradores_de_rua",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      bcrypt.hash(senha, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO usuarios (email, senha) VALUE (?,?)",
          [email, hash],
          (error, response) => {
            if (err) {
              res.send(err);
            }

            res.send({ msg: "Usuário cadastrado com sucesso" });
          }
        );
      });
    } else {
      res.send({ msg: "Email já cadastrado" });
    }
  });
});

{/*Verificação de login*/}

app.post("/login", (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(senha, result[0].senha, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response === true) {
          res.send(response)
          
        } else {
          res.send({ msg: "email ou senha incorreta" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});


// Configs do CRUD
app.post("/insert", (req, res) => {
  const { nome } = req.body;
  const { idade } = req.body;
  const { localizacao } = req.body;
  const { informacao } = req.body;
  let SQL = "INSERT INTO moradores (nome,idade,localizacao,informacao) VALUES (?,?,?,?)"

    db.query(SQL,[nome,idade,localizacao,informacao], (err, result) => {
        console.log(err);
   }) 
});

app.get("/get", (req, res) => {
    let SQL = "SELECT * FROM moradores"

    db.query(SQL, (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});

app.get("/getMoradores/:nome", (req,res) => {
  const nome = req.params.nome;
  let sql = `SELECT * FROM moradores WHERE nome LIKE '${nome}%'`;
  db.query(sql, [nome],(err, result) => {
    if (err) {
      console.log(err);
    }else {
      res.send(result);
    }
  })
});

app.put("/edit", (req,res)=>{
    const { id } = req.body;
    const { nome } = req.body;
    const { idade } = req.body;
    const { localizacao } = req.body;
    const { informacao } = req.body;

    let SQL = "UPDATE moradores SET nome= ?, idade= ?, localizacao= ?, informacao=? WHERE idmoradores = ?";

    db.query(SQL, [nome, idade, localizacao, informacao, id], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });

});

app.delete("/delete/:id",(req,res)=>{
        const {id} = req.params;
        let SQL = "DELETE FROM moradores WHERE idmoradores = ?";
         
        db.query(SQL,[id],(err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
})


app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
