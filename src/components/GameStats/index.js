import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LikeIcon, TimesPlayedIcon } from '@src/components/Icons';

const Count = styled.span`
    color: ${({ theme }) => theme.colors.textPrimary};
`;

const GameStat = ({ className, icon, count, description }) => (
    <div className={className}>
        {icon && icon}
        <small data-testid="stat">
            <Count>{count}</Count> <span>{description}</span>
        </small>
    </div>
);

GameStat.propTypes = {
    className: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    icon: PropTypes.element,
    description: PropTypes.string.isRequired
};

GameStat.defaultProps = {
    icon: undefined
};

const StyledGameStat = styled(GameStat)`
    align-items: center;
    display: flex;

    & > small {
        font-weight: 400;
        margin-left: 0.25rem;
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`;

const GameStatsContainer = styled.div`
    margin: 1.875rem 0 0 0;
    padding: 0.5rem 0;
    border: 1px solid #eee;
    border-left: 0;
    border-right: 0;

    ${StyledGameStat}:not(:last-child) {
        margin-bottom: 0.5rem;
    }
`;

const Stats = ({ timesPlayed, likes }) => (
    <GameStatsContainer data-testid="stats">
        <StyledGameStat
            icon={<TimesPlayedIcon style={{ width: '1.5rem' }} played={true ? 1 : 0} />}
            count={timesPlayed}
            description="veces jugado"
        />

        <StyledGameStat
            icon={<LikeIcon style={{ width: '1.5rem' }} liked={true ? 1 : 0} />}
            count={likes}
            description="me gusta"
        />
    </GameStatsContainer>
);

Stats.propTypes = {
    likes: PropTypes.number.isRequired,
    timesPlayed: PropTypes.number.isRequired
};

export default Stats;
