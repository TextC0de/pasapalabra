import React from 'react';
import Link from 'next/link';
import Seo from '@src/components/Seo';
import Button from '@src/components/Button';
import GamesList from '@src/components/GamesList';
import Container from '@src/components/Container';
import Hero from '@src/components/Hero';
import Section from '@src/components/Section';
import CallToAction from '@src/components/CallToAction';
import useGames from '@src/hooks/useGames';
import { GamesGallerySection } from './IndexStyles';

const Index = () => {
    const { games, error, fetching } = useGames(true, 'index');

    return (
        <div className="home-page">
            <Seo />

            <Hero.Wrapper>
                <Container>
                    <Hero.Title>Diviertete con Pasapalabra</Hero.Title>

                    <Hero.Description>
                        Disfruta jugando con tus amigos y personas alrededor del mundo con este
                        divertido juego basado en el famoso programa de televisión Pasapalabra.
                    </Hero.Description>
                    <Button variant="outline-contrast-primary" as="a">
                        Juega ahora
                    </Button>
                </Container>
            </Hero.Wrapper>

            <main role="main">
                <GamesGallerySection>
                    <Container>
                        <Section.Title>Tendencias</Section.Title>
                        <Section.Description>Lo más jugado</Section.Description>

                        <GamesList games={games} error={error} fetching={fetching} />
                    </Container>
                </GamesGallerySection>

                <CallToAction.Wrapper>
                    <Container>
                        <CallToAction.Title>Crea tu propio juego</CallToAction.Title>
                        <CallToAction.Description>
                            Con Pasapalabra Maker podrás crear un Pasapalabra desde cero y luego
                            compartirlo con el mundo.
                        </CallToAction.Description>
                        <Link href="/create-game" passHref>
                            <Button variant="outline-contrast-primary" as="a">
                                Empezar ahora
                            </Button>
                        </Link>
                    </Container>
                </CallToAction.Wrapper>
            </main>
        </div>
    );
};

export default Index;
