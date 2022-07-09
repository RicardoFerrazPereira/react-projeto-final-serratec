import { useRoutes } from "react-router-dom";
import AlunosListagem from "../pages/alunos/AlunosListagem";
import CadastrarAlunos from "../pages/alunos/CadastrarAlunos";
import Container from "@mui/material/Container";
import { useContext } from "react";
import { TemaContext } from "../context";
import tema from "../tema";
import Login from "../pages/Login";
import CadastroMaterias from "../pages/Materias/CadastroMaterias";
import ListagemMaterias from "../pages/Materias/ListagemMaterias";
import { AlunoProvider } from "../context";

const Routes = () => {
  const routes = useRoutes([
    { path: "/", element: <AlunosListagem /> },
    { path: "/cadastrar-alunos", element: <CadastrarAlunos /> },
    { path: "/editar-alunos/:id", element: <CadastrarAlunos /> },
    { path: "/login", element: <Login /> },
    { path: "/materias", element: <ListagemMaterias /> },
    { path: "/cadastro", element: <CadastroMaterias /> },
    { path: "/editar-materias/:id", element: <CadastroMaterias /> },
  ]);

  return routes;
};

const App = () => {
  const { temaSelecionado, setTemaSelecionado } = useContext(TemaContext);
  // tema.claro ou tema["claro"] fazem a mesma coisa
  return (
    <Container maxWidth="md" sx={tema[temaSelecionado]}>
      <AlunoProvider>
        <Routes />
      </AlunoProvider>
    </Container>
  );
};

export default App;
