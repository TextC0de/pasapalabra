import React from 'react';
import Link from 'next/link';
import Button from '@src/components/Button';
import Contributors from '@src/components/GameContributors';
import Tags from '@src/components/GameTags';
import Stats from '@src/components/GameStats';
import { gameShape } from '@src/helpers/prop-types';
import { GameItem, Details, Title, Description } from './style';

const GameItemContainer = ({ game }) => (
    <GameItem data-testid="gameItem">
        <Details>
            <Title data-testid="title">{game.title}</Title>
            <Contributors gameId={game._id} owner={game.owner} contributors={game.contributors} />
            <Description data-testid="description">
                <small>{game.description || 'Sin descripción'}</small>
            </Description>
            <Tags tags={game.tags} />
            <Stats likes={game.likes} timesPlayed={game.timesPlayed} />
        </Details>
        <Link href={`/game/${game._id}`} passHref>
            <Button as="a" data-testid="playLink" block fullWidth>
                Jugar
            </Button>
        </Link>
    </GameItem>
);

GameItemContainer.propTypes = {
    game: gameShape.isRequired
};

export default GameItemContainer;
