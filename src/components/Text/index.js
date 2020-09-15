import styled from 'styled-components';

const Text = styled.span`
    text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'initial')};
    font-weight: ${({ bold }) => (bold ? 600 : 'initial')};
    color: ${({ primary, theme }) =>
        primary ? theme.colors.textPrimary : theme.colors.textSecondary};
`;

export default Text;
