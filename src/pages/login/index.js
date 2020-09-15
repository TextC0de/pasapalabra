import React, { useState, useReducer } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getUsersApiURL } from '@src/helpers/axios';
import { reducer, initialState, actions } from '@src/reducers/form';
import Seo from '@src/components/Seo';
import Section from '@src/components/Section';
import Container from '@src/components/Container';
import ButtonLoading from '@src/components/ButtonLoading';
import { AlertSecondary } from '@src/components/Alert';
import Form from '@src/components/Form';
import FormAuthAlternativeLink from '@src/components/FormAuthAlternativeLink';
import WrapperTextCenter from '@src/components/WrapperTextCenter';

const Login = () => {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [error, setError] = useState();
    const [loggingIn, setLoggingIn] = useState(false);

    const formIsNotValid = () => !state.username || !state.password;

    const onChange = (e) => {
        e.preventDefault();
        dispatch(actions.setFieldChange(e.target.name, e.target.value));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (loggingIn || formIsNotValid()) return;

        setLoggingIn(true);
        axios
            .post(`${getUsersApiURL()}/login`, {
                username: state.username,
                password: state.password
            })
            .then(() => {
                router.back('/');
                setError(null);
            })
            .catch((e) => {
                switch (e.response.status) {
                    case 400:
                        setError('El nombre de usuario o la contraseña son incorrectos');
                        break;
                    default:
                        setError(
                            'Ha ocurrido un error al iniciar sesión, por favor intentalo más tarde.'
                        );
                        break;
                }
            })
            .finally(() => {
                setLoggingIn(false);
            });
    };

    return (
        <div className="login-page">
            <Seo title="Iniciar sesión | Pasapalabra" description="Inicia sesión en pasapalabra" />
            <Section.Wrapper>
                <Container>
                    <WrapperTextCenter>
                        <h3>Inicia sesión</h3>
                        <p>Inicia sesión en Pasapalabra para jugar y crear tus propios juegos.</p>
                    </WrapperTextCenter>
                    <Form onSubmit={onSubmit}>
                        <label htmlFor="username">
                            Usuario
                            <input
                                required
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="off"
                                autoCapitalize="off"
                                onChange={onChange}
                            />
                        </label>

                        <label htmlFor="password">
                            Contraseña
                            <input
                                required
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="off"
                                autoCapitalize="off"
                                onChange={onChange}
                            />
                        </label>

                        <ButtonLoading
                            loading={loggingIn}
                            disabled={formIsNotValid()}
                            value="Iniciar Sesión"
                            asSubmitInput
                            block
                            fullWidth
                        />

                        {router.query.denied && !error && !loggingIn && (
                            <AlertSecondary>Necesitas iniciar sesión</AlertSecondary>
                        )}
                        {!loggingIn && error && <AlertSecondary>{error}</AlertSecondary>}
                    </Form>

                    <WrapperTextCenter>
                        <Link href="/register" passHref>
                            <FormAuthAlternativeLink>
                                ¿Todavia no tienes una cuenta? <b>Registrate</b>
                            </FormAuthAlternativeLink>
                        </Link>
                    </WrapperTextCenter>
                </Container>
            </Section.Wrapper>
        </div>
    );
};

export default Login;
