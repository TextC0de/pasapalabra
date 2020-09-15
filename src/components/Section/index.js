import styled from 'styled-components';

const Wrapper = styled.section`
    padding: 3rem 0;
`;

const Title = styled.h3`
    font-size: 80%;
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: 600;
    text-transform: uppercase;
`;

const Description = styled.span`
    padding: 0 0 3rem 0;
    display: block;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 1.5rem;
`;

export default {
    Wrapper,
    Title,
    Description
};
