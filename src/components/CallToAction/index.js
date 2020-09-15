import styled from 'styled-components';
import Section from '@src/components/Section';

const Wrapper = styled(Section.Wrapper)`
    text-align: center;
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrastText};
`;

const Description = styled.p`
    color: rgba(249, 249, 249, 0.75);
    margin: 0 0 1.5rem 0;
`;

const Title = styled.h4`
    color: ${({ theme }) => theme.colors.primary.contrastText};
    font-weight: 600;
`;

export default {
    Wrapper,
    Description,
    Title
};
