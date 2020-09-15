import React from 'react';
import { renderWithTheme } from '@src/helpers/testing';
import { sampleGames as games } from '@src/helpers/sample-data';
import GameItem from '../index';

describe('GameItem', () => {
    describe('renders correctly (with contributors)', () => {
        let game;
        let wrapper;
        beforeEach(() => {
            // eslint-disable-next-line prefer-destructuring
            game = games[0];
            wrapper = renderWithTheme(<GameItem game={game} />);
        });

        it('renders title correctly', async () => {
            const { getByTestId } = wrapper;
            expect(getByTestId('title').textContent).toBe(game.title);
        });

        it('renders contributors correctly', async () => {
            const { getByTestId } = wrapper;
            expect(getByTestId('contributors').textContent).toBe(
                `por ${game.owner.username} y ${game.contributors.length} más`
            );
        });

        it('renders description correctly', async () => {
            const { getByTestId } = wrapper;
            expect(getByTestId('description').textContent).toBe(game.description);
        });

        it('renders times played correctly', async () => {
            const { getByTestId } = wrapper;
            expect(getByTestId('stats')).toHaveTextContent(`${game.timesPlayed} veces jugado`);
        });

        it('renders likes correctly', async () => {
            const { getByTestId } = wrapper;
            expect(getByTestId('stats')).toHaveTextContent(`${game.likes} me gusta`);
        });

        it('renders play link correctly', async () => {
            const { getByTestId } = wrapper;
            expect(getByTestId('playLink').href).toContain(`/game/${game._id}`);
        });
    });

    describe('renders correctly (no contributors)', () => {
        let game;
        let wrapper;
        beforeEach(() => {
            // eslint-disable-next-line prefer-destructuring
            game = games[2];
            wrapper = renderWithTheme(<GameItem game={game} />);
        });

        it('renders title correctly', async () => {
            const { getByTestId } = wrapper;
            expect(getByTestId('title').textContent).toBe(game.title);
        });

        it('renders contributors correctly', async () => {
            const { getByTestId } = wrapper;
            expect(getByTestId('contributors').textContent).toBe(`por ${game.owner.username}`);
        });

        it('renders likes correctly', async () => {
            const { getByTestId } = wrapper;
            expect(getByTestId('stats')).toHaveTextContent(`${game.likes} me gusta`);
        });

        it('renders times played correctly', async () => {
            const { getByTestId } = wrapper;
            expect(getByTestId('stats')).toHaveTextContent(`${game.timesPlayed} veces jugado`);
        });

        it('renders play link correctly', async () => {
            const { getByTestId } = wrapper;
            expect(getByTestId('playLink').href).toContain(`/game/${game._id}`);
        });
    });
});
