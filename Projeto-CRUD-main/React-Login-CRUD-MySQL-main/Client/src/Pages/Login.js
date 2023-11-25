import React from 'react';
import "../Styles/Login.css"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { Link } from 'react-router-dom';

function Login({ logado = false }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      senha: values.senha,
    }).then((response) => {

      const page = response.data;

      if (page === true) {
        localStorage.setItem('@user', JSON.stringify(response.config.data));
        window.location.reload();
      } else {
        alert(response.data.msg);
      }

    });
  };

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("email inválido")
      .required("O e-mail é obrigatório"),
    senha: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
  });


  return (
    <div className="body">
      <div className="card-login">
        <div className="user-links">
          <div className="user-link-home">
            {!logado && <Link to="/">Home</Link>}
          </div>

          <div className="user-link-cad">
            {!logado && <Link to="/cadastro">Cadastro</Link>}
          </div>
        </div>
        <h1>LOGIN</h1>
        <Formik
          initialValues={{}}
          onSubmit={handleLogin}
          validationSchema={validationsLogin}
        >
          <Form className="login-form">
            <div className="form-group">
              <label form="email">Usuário</label>

              <Field name="email" type='email' className="form-field" placeholder="E-mail" />

              <ErrorMessage
                component="span"
                name="email"
                className="form-error"
              />
            </div>

            {/*Outro campo*/}

            <div className="form-group">
              <label form="email">Senha</label>
              <Field name="senha" type={showPassword ?'text' : 'password'} className="form-field" placeholder="Senha" />
              <span className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              >
              {showPassword ? '👁️' : '👁️'} 
              </span>

              <ErrorMessage
                component="span"
                name="senha"
                className="form-error"
              />
            </div>

            <button className="button" type="submit">
              ENTRAR
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;