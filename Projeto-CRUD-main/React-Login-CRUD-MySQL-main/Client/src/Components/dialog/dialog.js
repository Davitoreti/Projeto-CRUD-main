import React,{useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
    const [editValues,setEditValues] = useState({
        id: props.id,
        name: props.name,
        idade: props.idade,
        localizacao: props.localizacao,
    });

   const handleEditGame = () => {
        Axios.put("http://localhost:3001/edit",{
            id: editValues.id,
            name: editValues.name,
            idade: editValues.idade,
            localizacao: editValues.localizacao,
            
        });
        handleClose();
        window.location.reload()
   };     


  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChangeValues = value =>{
    setEditValues(prevValues=>({
        ...prevValues,
        [value.target.id]: value.target.value,
    }))
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Editar</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nome do jogo"
          defaultValue={props.name}
          onChange={handleChangeValues}
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="idade"
          label="Valor"
          defaultValue={props.idade}
          onChange={handleChangeValues}
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="localizacao"
          label="Valor"
          defaultValue={props.localizacao}
          onChange={handleChangeValues}
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{
          handleClose()
        }}>Cancel</Button>
        <Button onClick={()=>{
          handleEditGame(); 
        }}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
