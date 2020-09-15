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
import WrapperTextCenter from '@src/components/WrapperTextCenter';
import FormAuthAlternativeLink from '@src/components/FormAuthAlternativeLink';

const Register = () => {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [error, setError] = useState();
    const [registering, setRegistering] = useState(false);

    const formIsNotValid = () => !state.username || !state.password || state.password.length < 8;

    const onChange = (e) => {
        e.preventDefault();
        dispatch(actions.setFieldChange(e.target.name, e.target.value));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (registering || formIsNotValid()) return;

        setRegistering(true);
        axios
            .post(`${getUsersApiURL()}/register`, {
                email: state.email,
                username: state.username,
                password: state.password
            })
            .then(() => {
                router.replace('/');
            })
            .catch((e) => {
                setError(e);
            })
            .finally(() => {
                setRegistering(false);
            });
    };

    return (
        <div className="register-page">
            <Seo title="Crear cuenta | Pasapalabra" description="Registrate en pasapalabra" />
            <Section.Wrapper>
                <Container>
                    <WrapperTextCenter>
                        <h3>¡Bienvenido!</h3>
                        <p>Unete a Pasapalabra para jugar y crear tus propios juegos.</p>
                    </WrapperTextCenter>
                    <Form onSubmit={onSubmit}>
                        <label htmlFor="email">
                            Email
                            <input
                                required
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="off"
                                autoCapitalize="off"
                                onChange={onChange}
                            />
                        </label>

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
                            loading={registering}
                            disabled={formIsNotValid()}
                            value="Crear cuenta"
                            asSubmitInput
                            block
                            fullWidth
                        />

                        {error && (
                            <AlertSecondary>
                                Ha ocurrido al registrar tu cuenta, por favor intentalo más tarde.
                            </AlertSecondary>
                        )}
                    </Form>

                    <WrapperTextCenter>
                        <Link href="/login" passHref>
                            <FormAuthAlternativeLink>
                                ¿Ya tienes una cuenta? <b>Inicia Sesión</b>
                            </FormAuthAlternativeLink>
                        </Link>
                    </WrapperTextCenter>
                </Container>
            </Section.Wrapper>
        </div>
    );
};

export default Register;
