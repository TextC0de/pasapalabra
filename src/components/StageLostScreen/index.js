import React from 'react';
import styled from 'styled-components';
import Text from '@src/components/Text';
import Section from '@src/components/Section';
import Container from '@src/components/Container';

const StageWonScreen = () => (
    <Section.Wrapper>
        <Container>
            <h1>Perdiste</h1>
            <p>Se ha acabado el tiempo.</p>
            <small>
                <Text as="span" primary uppercase bold>
                    La respuesta era:
                </Text>{' '}
                Jonás
            </small>
        </Container>
    </Section.Wrapper>
);

export default StageWonScreen;
