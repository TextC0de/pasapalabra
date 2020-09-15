import React from 'react';
import { renderWithTheme } from '@src/helpers/testing';
import { sampleGames as games } from '@src/helpers/sample-data';
import GameTags from '../index';

const { tags } = games[0];

const renderComponent = () => renderWithTheme(<GameTags tags={tags} />);

describe('GameTags', () => {
    it('renders all tags', async () => {
        const { getAllByTestId } = renderComponent();
        expect(getAllByTestId('tag').length).toBe(tags.length);
    });

    it('renders tag text correctly', async () => {
        const { getAllByTestId } = renderComponent();
        expect(getAllByTestId('tag')[0]).toHaveTextContent(tags[0]);
    });

    it('renders tag href correctly', async () => {
        const { getAllByTestId } = renderComponent();
        expect(getAllByTestId('tag')[0].href).toContain(`/tags/${tags[0].toLocaleLowerCase()}`);
    });
});
