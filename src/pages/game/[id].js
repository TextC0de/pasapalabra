import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getRoomsApiURL } from '@src/helpers/axios';
import withAuth from '@src/components/HOC/withAuth';
import Seo from '@src/components/Seo';
import Container from '@src/components/Container';
import Section from '@src/components/Section';
import Tags from '@src/components/GameTags';
import Stats from '@src/components/GameStats';
import Contributors from '@src/components/GameContributors';
import useGame from '@src/hooks/useGame';
import ButtonLoading from '@src/components/ButtonLoading';
import styled from 'styled-components';
import LoadingFullScreen from '@src/components/LoadingScreen';
import ErrorScreen from '@src/components/ErrorScreen';
import { AlertSecondary } from '@src/components/Alert';

export const Description = styled.p`
    margin: 1rem 0;
`;

const Game = () => {
    const router = useRouter();
    const { id } = router.query;
    const { game, error, fetching } = useGame(id);
    const [creatingRoom, setCreatingRoom] = useState(false);
    const [creatingRoomError, setCreatingRoomError] = useState();

    if (fetching) return <LoadingFullScreen />;
    if (error) return <ErrorScreen />;

    const onPlayClick = (event) => {
        event.preventDefault();
        setCreatingRoom(true);
        axios
            .post(`${getRoomsApiURL()}/create`, {
                game
            })
            .then((response) => {
                router.push(`/room/${response.data.data}/stage/guessing`);
                setCreatingRoom(false);
            })
            .catch((e) => {
                setCreatingRoomError(e);
                setCreatingRoom(false);
            });
    };

    return (
        <div className="game-page">
            <Seo title={`${game.title} | Pasapalabra`} description="Juego de pasapalabra" />
            <Section.Wrapper>
                <Container>
                    <h1>{game.title}</h1>
                    <Contributors
                        gameId={game._id}
                        owner={game.owner}
                        contributors={game.contributors}
                    />
                    <Description data-testid="description">
                        <small>{game.description || 'Sin descripción'}</small>
                    </Description>
                    <Tags tags={game.tags} />
                    <Stats likes={game.likes} timesPlayed={game.timesPlayed} />
                    <div style={{ margin: '1.5rem 0 .5rem 0', textAlign: 'center' }}>
                        <ButtonLoading onClick={onPlayClick} loading={creatingRoom} block fullWidth>
                            Jugar ahora
                        </ButtonLoading>
                    </div>
                    {creatingRoomError && (
                        <AlertSecondary>Hubo un error al crear la partida</AlertSecondary>
                    )}
                </Container>
            </Section.Wrapper>
        </div>
    );
};

export default withAuth(Game);
