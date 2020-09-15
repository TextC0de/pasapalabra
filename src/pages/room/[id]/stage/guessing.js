import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getRoomsApiURL } from '@src/helpers/axios';
import withAuth from '@src/components/HOC/withAuth';
import withMinigame from '@src/components/HOC/withMinigame';
import Container from '@src/components/Container';
import Section from '@src/components/Section';
import { AlertSecondary } from '@src/components/Alert';
import ButtonLoading from '@src/components/ButtonLoading';
import styled from 'styled-components';
import Text from '@src/components/Text';
import LoadingScreen from '@src/components/LoadingScreen';
import { reducer, initialState, actions } from '@src/reducers/guessingMinigame';

const H1 = styled.h1``;

const Topic = styled.small``;

const TopicLabel = styled.span`
    font-weight: 600;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textPrimary};
`;

const HintAndFormContainer = styled.div`
    background: #fff;
    padding: 1.5rem;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    border-radius: 4px;
`;

const HintTitle = styled.h3`
    font-weight: 600;
    text-transform: uppercase;
    font-size: 1rem;
`;

const Hint = styled.p``;

const Form = styled.form`
    margin-top: 2rem;

    ${ButtonLoading} {
        margin-top: 0.5rem;
    }
`;

const GuessingStage = ({ onFinish }) => {
    const router = useRouter();
    const { id } = router.query;
    const [fetching, setFetching] = useState(true);
    const [sendingAnswer, setSendingAnswer] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    const getHint = useCallback(() => {
        axios
            .get(`${getRoomsApiURL()}/find/${id}/guessing/hint`)
            .then(({ data }) => {
                const { hint, hintIndex, timeTillNextHint, answeredHints } = data.data;
                dispatch(actions.setHint({ hint, hintIndex, timeTillNextHint, answeredHints }));
                getHint();
            })
            .catch((e) => {
                if (!e.response || typeof e.response.data.finished === 'undefined') {
                    getHint();
                }

                dispatch(actions.setHasFinished(e.response.data.finished));
            });
    }, [id]);

    useEffect(() => {
        setFetching(true);
        if (!id) return;

        axios
            .get(`${getRoomsApiURL()}/find/${id}`)
            .then(({ data }) => {
                const { started, finished, won } = data.data.player.minigamesStatus.guessing;
                dispatch(
                    actions.init({
                        topic: data.data.game.minigames.guessing.topic,
                        won,
                        started,
                        finished
                    })
                );

                if (!started) {
                    axios
                        .post(`${getRoomsApiURL()}/find/${id}/guessing/start`)
                        .then(() => {
                            dispatch(actions.setStarted(true));
                        })
                        .catch((e) => {
                            console.error(e);
                            dispatch(actions.setStarted(false));
                        });
                }
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                setFetching(false);
                getHint();
            });
    }, [id, getHint]);

    const onMinigameFinished = () => {
        axios
            .get(`${getRoomsApiURL()}/find/${id}/guessing/data-and-stats`, {
                params: {
                    minigameCode: 'guessing'
                }
            })
            .then(({ data }) => {
                const child = (
                    <small>
                        <Text as="span" primary uppercase bold>
                            La respuesta era:
                        </Text>{' '}
                        {data.data.answer}
                    </small>
                );

                const description = state.won
                    ? `¡Felicitaciones! Has conseguido ${data.data.secondsWinned} segundos más para tu Rosco.`
                    : `El tiempo ha acabado.`;

                onFinish({
                    child,
                    description,
                    won: state.won,
                    nextMinigameCode: 'hangman'
                });
            })
            .catch((e) => {
                console.error(e.response);
                return <h1>Ha habido un error</h1>;
            });
    };

    if (state.won || state.finished) {
        onMinigameFinished();
        return <LoadingScreen message="Cargando resultados" />;
    }

    if (fetching || !state.hint) {
        return <LoadingScreen message="Cargando juego" />;
    }

    const formIsNotValid = () => !state.answer || state.answeredHints.includes(state.hintIndex);

    const onChange = (event) => {
        event.preventDefault();
        dispatch(actions.setAnswer(event.target.value));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (formIsNotValid()) return;
        setSendingAnswer(true);

        axios
            .post(`${getRoomsApiURL()}/find/${id}/guessing/answer`, {
                minigameCode: 'guessing',
                answer: state.answer
            })
            .then(() => {
                dispatch(actions.setWon(true));
            })
            .catch((e) => {
                console.error(e);
                dispatch(actions.setWon(false));
            })
            .finally(() => {
                setSendingAnswer(false);
            });
    };

    return (
        <div className="guessing-page">
            <Section.Wrapper>
                <Container>
                    <H1>La pista</H1>
                    <Topic>
                        <TopicLabel>Tema:</TopicLabel> {state.topic}
                    </Topic>

                    <HintAndFormContainer>
                        <small style={{ marginBottom: '1.5rem', display: 'block' }}>
                            <Text as="small" primary bold uppercase>
                                Tiempo restante:{' '}
                            </Text>
                            <span>{state.timeTillNextHint}</span>
                        </small>

                        <HintTitle>Pista {state.hintIndex + 1}</HintTitle>
                        <Hint>{state.hint}</Hint>

                        <Form onSubmit={onSubmit}>
                            <label htmlFor="answer">
                                Respuesta
                                <input
                                    id="answer"
                                    type="text"
                                    placheholder="Ingresa una respuesta"
                                    onChange={onChange}
                                />
                            </label>

                            <ButtonLoading
                                disabled={formIsNotValid()}
                                loading={sendingAnswer}
                                value="Enviar"
                                block
                                asSubmitInput
                            />
                        </Form>
                    </HintAndFormContainer>
                    {!state.won && state.answeredHints.includes(state.hintIndex) && (
                        <AlertSecondary>Respuesta incorrecta</AlertSecondary>
                    )}
                </Container>
            </Section.Wrapper>
        </div>
    );
};

GuessingStage.propTypes = {
    onFinish: PropTypes.func.isRequired
};

export default withAuth(withMinigame(GuessingStage));
