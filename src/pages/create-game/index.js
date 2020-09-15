import React, { useState, useReducer } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getGamesApiURL } from '@src/helpers/axios';
import withAuth from '@src/components/HOC/withAuth';
import { AlertSecondary } from '@src/components/Alert';
import ButtonLoading from '@src/components/ButtonLoading';
import { reducer, initialState, actions } from '@src/reducers/form';
import Section from '@src/components/Section';
import Container from '@src/components/Container';
import Form from '@src/components/Form';
import WrapperTextCenter from '@src/components/WrapperTextCenter';

const CreateGamePage = () => {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [error, setError] = useState(null);
    const [creating, setCreating] = useState(null);

    const formIsNotValid = () => !state.title;

    const onChange = (e) => {
        e.preventDefault();
        dispatch(actions.setFieldChange(e.target.name, e.target.value));
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (formIsNotValid()) return;
        setCreating(true);

        axios
            .post(`${getGamesApiURL()}/create`, {
                title: state.title,
                description: state.description,
                tags: state.tags
            })
            .then((response) => {
                router.push(`/game/${response.data.data}`);
            })
            .catch((e) => {
                setError(e);
            })
            .finally(() => {
                setCreating(false);
            });
    };

    return (
        <div className="create-game">
            <Section.Wrapper>
                <Container>
                    <WrapperTextCenter>
                        <h1>Crea un juego</h1>
                        <p>
                            Ingresa el nombre de tu juego, categorizalo y añade una pequeña
                            descripción sobre que tratara
                        </p>
                    </WrapperTextCenter>

                    <Form onSubmit={onSubmit}>
                        <label htmlFor="title">
                            Título
                            <input
                                required
                                id="title"
                                name="title"
                                onChange={onChange}
                                placeholder="Título"
                            />
                        </label>

                        <label htmlFor="tags">
                            Tags
                            <input id="tags" name="tags" onChange={onChange} placeholder="Tags" />
                        </label>

                        <label htmlFor="description">
                            Descripción
                            <input
                                id="description"
                                name="description"
                                onChange={onChange}
                                placeholder="Descripción"
                            />
                        </label>

                        <ButtonLoading
                            disabled={formIsNotValid()}
                            loading={creating}
                            value="Crear juego"
                            asSubmitInput
                            block
                            fullWidth
                        />

                        {error && <AlertSecondary>No se pudo crear el juego</AlertSecondary>}
                    </Form>
                </Container>
            </Section.Wrapper>
        </div>
    );
};

export default withAuth(CreateGamePage, 'create-game');
