import React, { useState, useEffect } from "react";
import Axios from "axios";
import Morador from "../moradores/moradores";
import { FaSearch } from "react-icons/fa";
import { FaRedo } from 'react-icons/fa';
import { FaAngleUp } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb'
import axios from "axios";

export default function HomeCrud() {
  const [values, setValues] = useState();
  const [listMoradores, setListMoradores] = useState();

  function handleChangeValues(nome, value) {
    setValues((prevValue) => ({
      ...prevValue,
      [nome]: value,
    }));
  };

  function handleClickSearch() {
    const nome = values.pesquisa
    Axios.get(`http://localhost:3001/getMoradores/${nome}`)
      .then(({ data }) => {
        setListMoradores(data);
      });
  }

  const handleClickButton = () => {
    console.log(values)
    Axios.post("http://localhost:3001/insert", {
      nome: values.nome,
      idade: values.idade,
      localizacao: values.localizacao,
      informacao: values.informacao,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(({ data }) => setListMoradores(data))
  }, [values]);

  const sair = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="content">
      <header className="py-3 mb-3 border-bottom">
        <div className="container-fluid d-grid gap-3 align-items-center header-display">
          <div class="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none dropdown">

          </div>
          <div className="container-fluid d-grid gap-3 align-items-center ">
            <div className="d-flex align-items-center">
              <form onSubmit={(event) => { event.preventDefault() }} class="w-100 me-2">
                <div className="search">
                  <input
                    type="Search"
                    name="pesquisa"
                    className="form-control pesquisar"
                    placeholder="Pesquisar..."
                    aria-label="Search"
                    onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
                  />
                  <button
                    className="search-input"
                    onClick={() => handleClickSearch()}>
                    <FaSearch />
                  </button>
                  <button
                    className="search-input"
                    onClick={() => window.location.reload()}>
                    <FaRedo />
                  </button>
                  <button
                    onClick={sair}
                    className="exit">
                    <TbLogout/>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="inserts">
        <h2>Para cadastrar um morador, preencha os campos abaixo!</h2>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          className="form-control nome"
          onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
        />

        <input
          type="text"
          name="idade"
          placeholder="Idade"
          className="form-control idade"
          onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
        />

          <input
          type="text"
          name="localizacao"
          placeholder="Localização"
          className="form-control localizacao"
          onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
        />

          <input
          type="text"
          name="informacao"
          placeholder="Informação adicional"
          className="form-control informacao"
          onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
        />

        <button
          className="btn btn-primary botao"
          onClick={() => {
            handleClickButton()
            window.location.reload()
          }}
        >
          Cadastrar Morador
        </button>
      </div>

      {typeof listMoradores !== "undefined" &&
        listMoradores.map((value) => {
          return (
            <Morador
              key={value.id}
              listPessoa={listMoradores}
              setListPessoa={setListMoradores}
              id={value.idmoradores}
              nome={value.nome}
              idade={value.idade}
              localizacao={value.localizacao}
              informacao={value.informacao} />
          );
        })}

      <a className="scroll" href="#"><FaAngleUp/></a>

    </div>
  );
}


