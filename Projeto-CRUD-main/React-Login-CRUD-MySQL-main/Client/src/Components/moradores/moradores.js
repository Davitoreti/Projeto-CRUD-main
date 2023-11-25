import React, { useState } from "react";
import FormDialog from "../dialog/dialog";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import '../../Styles/Crud.css'
import Axios from "axios";

export default function Pessoas(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickMorador = () => {
    setOpen(true);
  };
  
  const [editValues, setEditValues] = useState({
    id: props.id,
    nome: props.nome,
    idade: props.idade,
    localizacao: props.localizacao,
    informacao: props.informacao,
  });

  const handleDeleteMorador = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`);
    window.location.reload()
  };

  
  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        nome={props.nome}
        idade={props.idade}
        localizacao={props.localizacao}
        informacao={props.informacao}
        listPessoa={props.listPessoa}
        setListPessoa={props.setListPessoa}
        id={props.id} 
      />

      <div className="main">
        <table className="table">
          <thead className="table">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Idade</th>
              <th scope="col">Localização</th>
              <th scope="col">Informação adicional:</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            <tr className='linha-prod'>
              <th scope="row">{props.id}</th>
              <td>{props.nome}</td>
              <td>{props.idade}</td>
              <td className='quebra'>{props.localizacao}</td>
              <td className='quebra'>{props.informacao}</td>
              <td className="btn-func">
                <button
                  type="button"
                  className="btn btn-primary edit"
                  onClick={() => handleClickMorador()}
                >
                  Editar <FaEdit />
                </button>
                <button
                  type="button"
                  onClick={handleDeleteMorador}
                  className="btn btn-primary del"
                >
                  Excluir <FaTrashAlt />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
