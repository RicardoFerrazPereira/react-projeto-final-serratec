const express = require("express");
const cors = require("cors");
const { pool } = require("./config");

const app = express();

app.use(express.json());
app.use(cors());

const getAlunos = (request, response) => {
  pool.query("SELECT * FROM alunos", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addAluno = (request, response) => {
  console.log(request.body);
  const { nome, cidade, idade } = request.body;

  pool.query(
    `INSERT INTO alunos (nome, cidade, idade) VALUES ('${nome}', '${cidade}', ${idade})`,
    (error) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .json({ status: "success", message: "Aluno adicionado." });
    }
  );
};

const editAluno = (request, response) => {
  console.log(request.body);
  const { id, nome, cidade, idade } = request.body;

  pool.query(
    `update alunos set
      nome = '${nome}',
      cidade = '${cidade}',
      idade = ${idade}
      where id = ${id}`,
    (error) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .json({ status: "success", message: "Aluno editado." });
    }
  );
};

const removeAluno = (request, response) => {
  const { id } = request.body;

  pool.query(
    `delete from alunos
      where id = ${id}`,
    (error) => {
      if (error) {
        throw error;
      }
      response
        .status(202)
        .json({ status: "success", message: "Aluno deletado." });
    }
  );
};

const getMaterias = (request, response) => {
  pool.query("SELECT * FROM materias", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addMateria = (request, response) => {
  console.log(request.body);
  const { titulo, professor_nome } = request.body;

  pool.query(
    `INSERT INTO materias (titulo, professor_nome) VALUES ('${titulo}', '${professor_nome}')`,
    (error) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .json({ status: "success", message: "Matéria adicionada." });
    }
  );
};

const editMateria = (request, response) => {
  console.log(request.body);
  const { id, titulo, professor_nome } = request.body;

  pool.query(
    `update materias set
      titulo = '${titulo}',
      professor_nome = '${professor_nome}'
     where id = ${id}`,
    (error) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .json({ status: "success", message: "Matéria editada." });
    }
  );
};

const removeMateria = (request, response) => {
  const { id } = request.body;

  pool.query(
    `delete from materias
      where id = ${id}`,
    (error) => {
      if (error) {
        throw error;
      }
      response
        .status(202)
        .json({ status: "success", message: "Matéria deletada." });
    }
  );
};

const health = (request, response) => {
  response.status(200).json("Serviço funcionando!");
};

const getUsuario = (request, response) => {
  pool.query("SELECT * FROM usuarios", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addUsuario = (request, response) => {
  console.log(request.body);
  const { nome, email, senha } = request.body;

  pool.query(
    `INSERT INTO usuarios (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`,
    (error) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .json({ status: "success", message: "Usuário adicionado." });
    }
  );
};

const editUsuario = (request, response) => {
  console.log(request.body);
  const { id, nome, email } = request.body;

  pool.query(
    `update usuarios set
      nome = '${nome}',
      email = '${email}'
     where id = ${id}`,
    (error) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .json({ status: "success", message: "Usuário editado." });
    }
  );
};

const logar = (request, response) => {
  const { email, senha } = request.body;

  pool.query(`SELECT * FROM usuarios where email = '${email}' and senha = '${senha}' `, (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length > 0){
      response.status(200).json(results.rows[0]);
    } else {
      response.status(401).json("Usuário inválido");
    }
  });
}

app.
  route("/usuario")
  .post(addUsuario)
  .put(editUsuario)
  .get(getUsuario)

app.route("/logar").post(logar);

app
  .route("/alunos")
  .get(getAlunos)
  .post(addAluno)
  .put(editAluno)
  .delete(removeAluno);

app
  .route("/materias")
  .get(getMaterias)
  .post(addMateria)
  .put(editMateria)
  .delete(removeMateria);

app.route("/health").get(health);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server listening`);
});
