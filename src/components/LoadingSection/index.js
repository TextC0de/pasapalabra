import React from 'react';
import Spinner from '@src/components/Spinner';
import styled from 'styled-components';

const SectionLoading = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 0;
`;

const LoadingSection = () => (
    <SectionLoading>
        <Spinner />
    </SectionLoading>
);

export default LoadingSection;
