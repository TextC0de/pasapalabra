import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '@src/components/Spinner';
import styled from 'styled-components';

const LoadingText = styled.h1`
    margin: 1rem 0 0 0;
    font-weight: 600;
    font-size: 1rem;
    text-transform: uppercase;
`;

const FullScreenLoading = styled.div`
    height: 100vh;
    width: 100vw;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const LoadingFullScreen = ({ message }) => (
    <FullScreenLoading>
        <Spinner />
        <LoadingText>{message || 'Cargando'}</LoadingText>
    </FullScreenLoading>
);

LoadingFullScreen.propTypes = {
    message: PropTypes.string
};

LoadingFullScreen.defaultProps = {
    message: undefined
};

export default LoadingFullScreen;
