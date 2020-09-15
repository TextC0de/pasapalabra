import styled from 'styled-components';
import Section from '@src/components/Section';

const Wrapper = styled(Section.Wrapper)`
    text-align: center;
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrastText};
    text-align: center;
    min-height: 100vh;
    display: flex;
    align-items: center;
`;

const Title = styled.h1`
    color: ${({ theme }) => theme.colors.primary.contrastText};
    font-weight: 600;
`;

const Description = styled.p`
    color: rgba(249, 249, 249, 0.75);
    margin: 0 0 3rem 0;
`;

export default {
    Wrapper,
    Title,
    Description
};
