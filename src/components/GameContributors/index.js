import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { userShape } from '@src/helpers/prop-types';

const Contributors = styled.div`
    display: block;
`;

const ContributorAnchor = styled.a`
    font-weight: 600;
`;

const GameContributors = ({ gameId, owner, contributors }) => (
    <Contributors data-testid="contributors">
        {contributors && contributors.length !== 0 ? (
            <small>
                por{' '}
                <Link href={`/profile/${owner.username}`} passHref>
                    <ContributorAnchor>{owner.username}</ContributorAnchor>
                </Link>{' '}
                y{' '}
                <Link href={`/game/${gameId}#contributors`} passHref>
                    <ContributorAnchor>{contributors.length} más</ContributorAnchor>
                </Link>
            </small>
        ) : (
            <small>
                por{' '}
                <Link href={`/profile/${owner.username}`} passHref>
                    <ContributorAnchor>{owner.username}</ContributorAnchor>
                </Link>
            </small>
        )}
    </Contributors>
);

GameContributors.propTypes = {
    gameId: PropTypes.string.isRequired,
    owner: userShape.isRequired,
    contributors: PropTypes.arrayOf(userShape).isRequired
};

export default GameContributors;
