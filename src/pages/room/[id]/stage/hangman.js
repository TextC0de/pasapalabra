import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getRoomsApiURL } from '@src/helpers/axios';
import withAuth from '@src/components/HOC/withAuth';
import withMinigame from '@src/components/HOC/withMinigame';
import Container from '@src/components/Container';
import Section from '@src/components/Section';
import ButtonLoading from '@src/components/ButtonLoading';
import { alphabet } from '@src/helpers/minigames';
import styled from 'styled-components';
import Text from '@src/components/Text';
import LoadingScreen from '@src/components/LoadingScreen';
import { reducer, initialState, actions } from '@src/reducers/hangmanMinigame';

const H1 = styled.h1``;

const Topic = styled.small``;

const TopicLabel = styled.span`
    font-weight: 600;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textPrimary};
`;

const WordAndFormContainer = styled.div`
    background: #fff;
    padding: 1.5rem;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    border-radius: 4px;
`;

const WordTitle = styled.h3`
    font-weight: 600;
    text-transform: uppercase;
    font-size: 1rem;
`;

const Word = styled.p``;

const LettersWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    ${ButtonLoading} {
        flex: 1 0 25%;
        margin: 0.2rem;
        cursor: pointer;
    }
`;

const Form = styled.form`
    margin-top: 2rem;

    ${ButtonLoading} {
        margin-top: 0.5rem;
    }
`;

const HangmanStage = ({ onFinish }) => {
    const router = useRouter();
    const { id } = router.query;
    const [fetching, setFetching] = useState(true);
    const [sendingAnswer, setSendingAnswer] = useState(false);
    const [sendingLetter, setSendingLetter] = useState(false);
    const [letterBeingSend, setLetterBeingSend] = useState();
    const [state, dispatch] = useReducer(reducer, initialState);

    const getWord = useCallback(() => {
        axios
            .get(`${getRoomsApiURL()}/find/${id}/hangman/word`)
            .then(({ data }) => {
                console.log(data);
                const { word, wordIndex, correctWords, incorrectWords, timeLeft } = data.data;
                dispatch(
                    actions.setWord({ word, wordIndex, correctWords, incorrectWords, timeLeft })
                );
                getWord();
            })
            .catch((e) => {
                if (e.response) {
                    dispatch(actions.setHasFinished(e.response.data.finished));
                }

                if (!e.response || typeof e.response.data.finished === 'undefined') {
                    getWord();
                }
            });
    }, [id]);

    useEffect(() => {
        setFetching(true);
        if (!id) return;

        axios
            .get(`${getRoomsApiURL()}/find/${id}`)
            .then(({ data }) => {
                const { started, finished, won } = data.data.player.minigamesStatus.hangman;
                dispatch(
                    actions.init({
                        topic: data.data.game.minigames.hangman.topic,
                        won,
                        started,
                        finished
                    })
                );

                if (!started) {
                    axios
                        .post(`${getRoomsApiURL()}/find/${id}/hangman/start`)
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
            });
    }, [id]);

    const onMinigameFinished = () => {
        axios
            .get(`${getRoomsApiURL()}/find/${id}/hangman/data-and-stats`)
            .then(({ data }) => {
                const child = (
                    <small>
                        <Text as="span" primary uppercase bold>
                            Las palabras:
                        </Text>{' '}
                        {data.data.words.join(', ').toString().trim()}
                    </small>
                );

                const description = state.won
                    ? `¡Felicitaciones! Has conseguido ${data.data.secondsWinned} segundos más para tu Rosco.`
                    : `El tiempo ha acabado.`;

                onFinish({
                    child,
                    description,
                    won: state.won,
                    nextMinigameCode: 'alphabet'
                });
            })
            .catch((e) => {
                console.error(e);
                onMinigameFinished();
                return <h1>Ha habido un error</h1>;
            });
    };

    useEffect(() => {
        if (!id) return;
        getWord();
    }, [id, getWord]);

    if (state.finished) {
        onMinigameFinished();
        return <LoadingScreen message="Cargando resultados" />;
    }

    if (fetching || !state.word) {
        return <LoadingScreen message="Cargando juego" />;
    }

    const answerIsNotValid = () => !state.answer || sendingAnswer;
    const letterIsNotValid = () => sendingLetter;

    const onChange = (event) => {
        event.preventDefault();
        dispatch(actions.setAnswer(event.target.value));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (answerIsNotValid()) return;
        setSendingAnswer(true);

        axios
            .post(`${getRoomsApiURL()}/find/${id}/hangman/answer`, {
                answer: state.answer
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                setSendingAnswer(false);
            });
    };

    const onLetterClick = (event) => {
        event.preventDefault();
        if (letterIsNotValid()) return;

        setLetterBeingSend(event.target.textContent);
        setSendingLetter(true);

        axios
            .post(`${getRoomsApiURL()}/find/${id}/hangman/letter`, {
                letter: event.target.textContent
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                setSendingLetter(false);
                setLetterBeingSend();
            });
    };

    return (
        <div className="hangman-page">
            <Section.Wrapper>
                <Container>
                    <H1>El ahorcado</H1>
                    <Topic>
                        <TopicLabel>Tema:</TopicLabel> {state.topic}
                    </Topic>

                    <WordAndFormContainer>
                        <small style={{ marginBottom: '1.5rem', display: 'block' }}>
                            <Text as="small" primary bold uppercase>
                                Tiempo restante:{' '}
                            </Text>
                            <span>{state.timeLeft}</span>
                        </small>

                        <WordTitle>Palabra {state.wordIndex + 1}</WordTitle>
                        <Word>{state.word}</Word>
                        <p>Selecciona una letra o ingresa una palabra</p>
                        <LettersWrapper>
                            {alphabet.map((letter) => (
                                <ButtonLoading
                                    variant="outline-primary"
                                    disabled={letterIsNotValid()}
                                    loading={letterBeingSend === letter}
                                    key={letter}
                                    onClick={onLetterClick}
                                    value="Enviar"
                                    block
                                >
                                    {letter.toUpperCase()}
                                </ButtonLoading>
                            ))}
                        </LettersWrapper>

                        <Form onSubmit={onSubmit}>
                            <label htmlFor="answer">
                                Palabra completa
                                <input
                                    id="answer"
                                    type="text"
                                    placheholder="Ingresa una respuesta"
                                    onChange={onChange}
                                />
                            </label>

                            <ButtonLoading
                                disabled={answerIsNotValid()}
                                loading={sendingAnswer}
                                value="Enviar"
                                block
                                asSubmitInput
                            />
                        </Form>
                    </WordAndFormContainer>
                </Container>
            </Section.Wrapper>
        </div>
    );
};

HangmanStage.propTypes = {
    onFinish: PropTypes.func.isRequired
};

export default withAuth(withMinigame(HangmanStage));
