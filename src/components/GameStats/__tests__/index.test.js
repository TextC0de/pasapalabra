import React from 'react';
import { withMarkup, renderWithTheme } from '@src/helpers/testing';
import { sampleGames } from '@src/helpers/sample-data';
import GameStat from '../index';

const renderComponent = (count, description) =>
    renderWithTheme(<GameStat count={count} description={description} />);

describe('GameStat', () => {
    it('renders likes stat correctly', async () => {
        const { likes } = sampleGames[0];
        const { getByText } = renderComponent(likes, 'me gusta');
        const getByTextWithMarkup = withMarkup(getByText);
        expect(getByTextWithMarkup(`${likes} me gusta`)).toBeInTheDocument();
    });

    it('renders times played stat correctly', async () => {
        const { timesPlayed } = sampleGames[0];
        const { getByText } = renderComponent(timesPlayed, 'veces jugado');
        const getByTextWithMarkup = withMarkup(getByText);
        expect(getByTextWithMarkup(`${timesPlayed} veces jugado`)).toBeInTheDocument();
    });
});
