import "../Styles/Cadastro.css"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function Cadastro({ logado = false }) {
    const [showPassword, setShowPassword] = React.useState(false)

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = (values) => {
        Axios.post("http://localhost:3001/register", {
            email: values.email,
            senha: values.senha,
        }).then((response) => {
            alert(response.data.msg);
            console.log(response);
            window.location.reload();
        });
    };

    const validationsRegister = yup.object().shape({
        email: yup
            .string()
            .email("E-mail inválido")
            .required("O e-mail é obrigatório"),
        senha: yup
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .required("A senha é obrigatória"),
        confirmation: yup
            .string()
            .oneOf([yup.ref("senha"), null], "As senhas são diferentes")
            .required("A confirmação da senha é obrigatória"),
    });


return (
    <div className="body">
        <div className="card-cadastro">
            <div className="user-links">
                <div className="user-link-home">
                    {!logado && <Link to="/">Home</Link>}
                </div>

                <div className="user-link-cad">
                    {!logado && <Link to="/cadastro">Cadastro</Link>}
                </div>
            </div>
            <h1>CADASTRO</h1>
            <Formik
                initialValues={{}}
                onSubmit={handleRegister}
                validationSchema={validationsRegister}
            >
                <Form className="login-form">
                    <div className="form-group">
                        <label form="email">Usuário</label>

                        <Field name="email" type='email' className="form-field" placeholder="E-mail" />

                        <ErrorMessage
                            component="span"
                            name="email"
                            className="form-error-usuario"
                        />
                    </div>

                    {/*Outro campo*/}

                    <div className="form-group">
                        <label form="email">Senha</label>
                        <div className="password-container">
                            <Field name="senha" type={showPassword ? 'text' : 'password'} className="form-field" placeholder="Senha" />
                            <button
                                type="button"
                                className="password-btn"
                                onClick={handleTogglePassword}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <ErrorMessage
                            component="span"
                            name="senha"
                            className="form-error"
                        />
                    </div>

                    {/*Confirmação*/}

                    <div className="form-group">
                        <label form="email">Confirme sua senha</label>
                        <div className="password-container">
                            <Field name="confirmation" type={showPassword ? 'text' : 'password'} className="form-field" placeholder="Senha" />
                            <button
                                type="button"
                                className="password-btn"
                                onClick={handleTogglePassword}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <ErrorMessage
                            component="span"
                            name="confirmation"
                            className="form-error"
                        />
                    </div>
                    <button className="button" type="submit">
                        CADASTRAR
                    </button>
                </Form>
            </Formik>
        </div>
    </div>
  );
}

export default Cadastro;