import styled from 'styled-components';

const getButtonStyles = (theme) => ({
    primary: {
        border: 'none',
        color: {
            initial: theme.colors.primary.contrastText,
            hovered: theme.colors.primary.contrastText
        },
        background: {
            initial: theme.colors.primary.main,
            hovered: theme.colors.primary.dark,
            disabled: theme.colors.primary.light
        }
    },
    'outline-primary': {
        border: `2px solid ${theme.colors.primary.light}`,
        color: {
            initial: theme.colors.secondaryText,
            hovered: '#555'
        },
        background: {
            initial: '#fff',
            hover: '#ccc',
            disabled: '#ccc'
        }
    },
    'outline-contrast-primary': {
        border: `2px solid ${theme.colors.primary.contrastText}`,
        color: {
            initial: theme.colors.primary.contrastText,
            hovered: theme.colors.primary.light
        },
        background: {
            normal: 'transparent',
            hover: 'transparent',
            disabled: 'transparent'
        }
    }
});

const StyledButton = styled.button.attrs(({ type, value, disabled }) => ({
    value,
    type: type || 'button',
    disabled
}))`
    font-family: ${({ theme }) => theme.fonts[1]}, cursive;
    width: ${({ fullWidth }) => (fullWidth ? '100%' : 'max-content')};
    display: ${({ block }) => (block ? 'block' : 'inline-block')};
    border-radius: ${({ block }) => (block ? 0 : '5px')};
    cursor: ${({ disabled }) => (disabled ? 'initial' : 'pointer')};
    padding: 15px 20px;
    transition: 0.15s ease-in-out;

    border: ${({ theme, variant = 'primary' }) => getButtonStyles(theme)[variant].border};
    color: ${({ theme, variant = 'primary' }) => getButtonStyles(theme)[variant].color.initial};
    background: ${({ theme, variant = 'primary', disabled }) =>
        getButtonStyles(theme)[variant].background[disabled ? 'disabled' : 'initial']};

    &:hover {
        color: ${({ theme, variant = 'primary' }) => getButtonStyles(theme)[variant].color.hovered};
        background: ${({ theme, variant = 'primary', disabled }) =>
            getButtonStyles(theme)[variant].background[disabled ? 'disabled' : 'hovered']};
    }
`;

export default StyledButton;
