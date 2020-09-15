import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Section from '@src/components/Section';
import Container from '@src/components/Container';
import Button from '@src/components/Button';
import styled from 'styled-components';

const ButtonsWrapper = styled.div`
    padding-top: 1.5rem;

    ${Button}:not(:last-child) {
        margin-bottom: 0.5rem;
    }
`;

const StageFinishedScreen = ({ children, customTitle, description, won, nextMinigameCode }) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Section.Wrapper>
            <Container>
                <h1>{customTitle || (won ? 'Has ganado' : 'Has perdido')}</h1>
                <p>{description}</p>
                <div>{children}</div>

                <ButtonsWrapper>
                    {nextMinigameCode && (
                        <Link href={`/room/${id}/stage/${nextMinigameCode}/`} passHref>
                            <Button block as="a">
                                Ir al siguiente juego
                            </Button>
                        </Link>
                    )}

                    <Link href={`/room/${id}/`} passHref>
                        <Button block as="a">
                            Ir a la pagina principal del juego
                        </Button>
                    </Link>
                </ButtonsWrapper>
            </Container>
        </Section.Wrapper>
    );
};

StageFinishedScreen.propTypes = {
    children: PropTypes.element.isRequired,
    customTitle: PropTypes.string,
    description: PropTypes.string.isRequired,
    won: PropTypes.bool.isRequired,
    nextMinigameCode: PropTypes.string
};

StageFinishedScreen.defaultProps = {
    customTitle: undefined,
    nextMinigameCode: ''
};

export default StageFinishedScreen;
