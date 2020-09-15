import React from 'react';
import theme from '@src/styles/theme';
import styled, { keyframes } from 'styled-components';

const offset = '187';
const durationTime = 1.4;
const durationTimeUnit = 's';

const rotate = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(270deg); }
`;

const colors = keyframes`
    0% { stroke: ${theme.colors.primary.main}; }
    33% { stroke: ${theme.colors.primary.light}; }
    66% { stroke: ${theme.colors.primary.dark}; }
    100% { stroke: ${theme.colors.primary.main}; }
`;

const dash = keyframes`
    0% { stroke-dashoffset: ${offset}; }
    50% {
        stroke-dashoffset: ${offset / 4};
        transform: rotate(135deg);
    }
    100% {
        stroke-dashoffset: ${offset};
        transform: rotate(450deg);
    }
`;

const Svg = styled.svg`
    animation: ${rotate} ${`${durationTime}${durationTimeUnit}`} linear infinite;
`;

const Circle = styled.circle`
    stroke-width: 4px;
    stroke-dasharray: ${offset};
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: ${dash} ${`${durationTime}${durationTimeUnit}`} ease-in-out infinite,
        ${colors} ${`${durationTime * 4}${durationTimeUnit}`} ease-in-out infinite;
`;

const Spinner = () => (
    <Svg width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <Circle fill="none" stroke-linecap="round" cx="33" cy="33" r="30" />
    </Svg>
);

export default Spinner;
