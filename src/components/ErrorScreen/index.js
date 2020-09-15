import React from 'react';
import styled from 'styled-components';
import Container from '@src/components/Container';

const ErrorScreenContainer = styled.div`
    background: #fff;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    margin: 3rem 0 0.5rem 0;
    font-weight: 600;
    font-size: 1rem;
    text-transform: uppercase;
`;

const Description = styled.p`
    margin: 0 0 1.5rem 0;
    font-size: 1rem;
`;

const ErrorScreen = () => (
    <ErrorScreenContainer>
        <Container>
            <Title>Partida no encontrada</Title>
            <Description>Parece que ha habido un problema al obtener esta partida.</Description>
        </Container>
    </ErrorScreenContainer>
);

export default ErrorScreen;
