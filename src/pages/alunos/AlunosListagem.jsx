import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { StyledTableCell, StyledTableRow } from "./styles";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../lotties/78259-loading.json";
import { AlunoContext } from "../../context";


const AlunosListagem = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const {alunoSelecionado, setAlunoSelecionado} = useContext(AlunoContext);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    getAlunos();
  }, []);

  const getAlunos = () => {
    axios.get(API_URL).then((response) => {
      setAlunoSelecionado(response.data);
    });
  };

 

  const deletarAluno = (aluno) => {
    axios
      .delete(API_URL, { data: aluno })
      .then((response) => {
        MySwal.fire(<p>{response?.data?.message}</p>);

        const alunoIndex = alunoSelecionado.findIndex(
          (elemento) => elemento.id === aluno.id
        );
        let newAlunos = [...alunoSelecionado];
        newAlunos.splice(alunoIndex, 1);
        setAlunoSelecionado(newAlunos);
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      });
  };
  const editarAluno = (aluno) => {
    navigate(`/editar-alunos/${aluno.id}`);
  };

  // SE FOSSE USAR A ABSTRAÇÃO (aula 4)
  // const listaCampos = [
  //   "nome",
  //   "idade",
  //   "cidade"
  // ];

  // return (
  //   <Box sx={{ marginTop: "25px" }}>
  //     <TabelaSerratec listaCampos={listaCampos} listaValores={alunos} />
  //   </Box>
  // );

  return (
    <Box sx={{ marginTop: "25px" }}>
      {alunoSelecionado.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Nome</StyledTableCell>
                <StyledTableCell>Idade</StyledTableCell>
                <StyledTableCell>Cidade</StyledTableCell>
                <StyledTableCell>Ações</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alunoSelecionado.map((aluno) => (
                <StyledTableRow>
                  <StyledTableCell>{aluno.id}</StyledTableCell>
                  <StyledTableCell>{aluno.nome}</StyledTableCell>
                  <StyledTableCell>{aluno.idade}</StyledTableCell>
                  <StyledTableCell>{aluno.cidade}</StyledTableCell>
                  <StyledTableCell>
                    <Button onClick={() => editarAluno(aluno)} variant="text">
                      <EditIcon />
                    </Button>
                    <Button onClick={() => deletarAluno(aluno)} variant="text">
                      <DeleteIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <Lottie options={defaultOptions} height={500} width={500} />
        </>
      )}
    </Box>
  );
};

export default AlunosListagem;
