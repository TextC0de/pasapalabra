/* eslint-disable import/prefer-default-export */
import React from 'react';
import { render } from '@testing-library/react';
import theme from '@src/styles/theme';
import { ThemeProvider } from 'styled-components';

export const withMarkup = (query) => (text) =>
    query((content, node) => {
        const hasText = (actualNode) => actualNode.textContent === text;
        const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child));
        return hasText(node) && childrenDontHaveText;
    });

export const renderWithTheme = (children) =>
    render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
