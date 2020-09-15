import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Item from '@src/components/GameItem';
import { gameShape } from '@src/helpers/prop-types';
import Text from '@src/components/Text';
import Spinner from '@src/components/Spinner';

const GamesList = styled.div``;

const GamesListContainer = ({ games, error, fetching }) => {
    if (fetching) {
        return <Spinner />;
    }

    if (error || !games || games.length === 0) {
        return (
            <Text as="small" uppercase bold>
                No se han encontrado juegos
            </Text>
        );
    }

    return (
        <GamesList>
            {games.map((game) => (
                <Item key={game._id} game={game} />
            ))}
        </GamesList>
    );
};

GamesListContainer.propTypes = {
    games: PropTypes.arrayOf(gameShape),
    error: PropTypes.string,
    fetching: PropTypes.bool.isRequired
};

GamesListContainer.defaultProps = {
    games: [],
    error: ''
};

export default GamesListContainer;
