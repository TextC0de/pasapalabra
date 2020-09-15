import React from 'react';
import { renderWithTheme } from '@src/helpers/testing';
import { sampleGames } from '@src/helpers/sample-data';
import GamesList from '../index';

const renderComponent = (games) => renderWithTheme(<GamesList games={games} />);

describe('GamesList', () => {
    it('renders all game items', async () => {
        const { getAllByTestId } = renderComponent(sampleGames);
        expect(getAllByTestId('gameItem').length).toBe(sampleGames.length);
    });
});
