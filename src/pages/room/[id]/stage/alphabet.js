import React, { useState, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@src/components/Container';
import Section from '@src/components/Section';
import Button from '@src/components/Button';
import { normalizeString } from '@src/helpers/string';
import { reducer, initialState, actions } from '@src/reducers/alphabetMinigame';
import withMinigame from '@src/components/HOC/withMinigame';
import MinigameTimer from '@src/components/MinigameTimer';
import styled from 'styled-components';
import { guessingMinigameShape } from '@src/helpers/prop-types';
import { alphabet } from '@src/helpers/minigames';
import Text from '@src/components/Text';
import LoadingScreen from '@src/components/LoadingScreen';

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

    ${Button} {
        margin-top: 0.5rem;
    }
`;

const AlphabetStage = ({ minigame, minigameTitle, onFinish }) => {
    const [answer, setAnswer] = useState();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch(actions.setLettersLeft(alphabet));
    }, []);

    if (state.won || state.timeIsUp) {
        const child = (
            <div>
                <small>
                    <p>La palabras eran:</p>{' '}
                </small>
                {alphabet.map((letter) => {
                    const letterData = minigame.letters[letter.toUpperCase()] || {
                        word: '',
                        definition: ''
                    };

                    return (
                        <div key={letter} style={{ marginBottom: '.5rem' }}>
                            <Text uppercase bold>
                                Letra {letter.toLocaleUpperCase()}:
                            </Text>
                            <p style={{ marginBottom: '0' }}>
                                <small>Definicion: {letterData.definition}</small>
                            </p>
                            <p>
                                <small>Palabra: {letterData.answer}</small>
                            </p>
                        </div>
                    );
                })}
            </div>
        );

        const noWordsWhereGuessed = state.correctLetters.length === 0;
        const customTitle = noWordsWhereGuessed ? 'Has perdido' : '¡Felicitaciones!';
        const description = noWordsWhereGuessed
            ? 'El tiempo ha acabado.'
            : `Has conseguido adivinar ${state.correctLetters.length} palabras.`;

        onFinish({
            child,
            won: state.won,
            customTitle,
            description
        });

        return <LoadingScreen />;
    }

    const incrementEllapsedTime = () => {
        dispatch(actions.incrementEllapsedTime());
    };

    const timeIsUp = () => {
        dispatch(actions.onTimeUp());
    };

    const getActualLetter = () => {
        if (state.lettersLeft.length <= 0) {
            timeIsUp();
            return { answer: '', definition: '' };
        }

        return (
            minigame.letters[state.lettersLeft[state.letterIndex].toUpperCase()] || {
                answer: '',
                definition: ''
            }
        );
    };

    const formIsNotValid = () => !answer;

    const onChange = (event) => {
        event.preventDefault();
        setAnswer(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (formIsNotValid()) return;
        const normalizedAnswer = normalizeString(answer).trim().toLowerCase();
        const normalizedCorrectAnswer = normalizeString(getActualLetter().answer).toLowerCase();

        if (normalizedAnswer === normalizedCorrectAnswer) {
            dispatch(actions.pushCorrectLetter());
        } else {
            dispatch(actions.pushWrongLetter());
        }

        dispatch(actions.removeActualFromLettersLeft());
    };

    const onSkipClick = (event) => {
        event.preventDefault();
        dispatch(actions.pushSeenLetter());
        dispatch(actions.nextLetter());
    };

    if (!state.lettersLeftSetted) return <LoadingScreen />;
    if (state.lettersLeft.length <= 0) {
        timeIsUp();
        return <LoadingScreen />;
    }

    return (
        <div className="alphabet-page">
            <Section.Wrapper>
                <Container>
                    <H1>{minigameTitle}</H1>
                    <Topic>
                        <TopicLabel>Tema:</TopicLabel> {minigame.topic}
                    </Topic>

                    <HintAndFormContainer>
                        <small style={{ display: 'block' }}>
                            <Text as="small" primary bold uppercase>
                                Letras amarillas:
                            </Text>
                            {state.seenLetters.join(', ').toString()}
                        </small>
                        <small style={{ display: 'block' }}>
                            <Text as="small" primary bold uppercase>
                                Letras verdes:
                            </Text>
                            {state.correctLetters.join(', ').toString()}
                        </small>
                        <small style={{ marginBottom: '0.5rem', display: 'block' }}>
                            <Text as="small" primary bold uppercase>
                                Letras rojas:
                            </Text>
                            {state.wrongLetters.join(', ').toString()}
                        </small>

                        <small style={{ marginBottom: '1.5rem', display: 'block' }}>
                            <Text as="small" primary bold uppercase>
                                Tiempo restante:{' '}
                            </Text>

                            <MinigameTimer
                                startAt={alphabet.length * 5}
                                onTick={incrementEllapsedTime}
                                onFinish={timeIsUp}
                            />
                        </small>

                        <HintTitle>
                            Letra {state.lettersLeft[state.letterIndex].toUpperCase()}
                        </HintTitle>
                        <Hint>{getActualLetter().definition}</Hint>

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

                            <Button
                                disable={formIsNotValid()}
                                as="input"
                                type="submit"
                                value="Enviar"
                                block
                            />
                        </Form>

                        <Button
                            style={{ marginTop: '1.5rem' }}
                            disable={state.lettersLeft.length <= 1}
                            as="input"
                            type="submit"
                            value="Pasapalabra"
                            onClick={onSkipClick}
                            block
                        />
                    </HintAndFormContainer>
                </Container>
            </Section.Wrapper>
        </div>
    );
};

AlphabetStage.propTypes = {
    minigame: guessingMinigameShape.isRequired,
    minigameTitle: PropTypes.string.isRequired,
    onFinish: PropTypes.func.isRequired
};

export default withMinigame(AlphabetStage, {
    minigameTitle: 'El rosco',
    minigameCode: 'alphabet'
});
