import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html {
        min-height: 100vh;
        font-family: ${({ theme }) => theme.fonts[0]}, sans-serif;
        line-height: 1.15;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        -ms-overflow-style: scrollbar;
        -webkit-tap-highlight-color: transparent;
    }

    body {
        margin: 0;
        font-weight: 400;
        background: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.textSecondary};
    }

    article,
    aside,
    dialog,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    main,
    nav,
    section {
        display: block;
    }

    h1, h2, h3, h4, h5, h6,
    .h1, .h2, .h3, .h4, .h5, .h6 {
        color: ${({ theme }) => theme.colors.textPrimary};
        line-height: 1.2;
        font-weight: 500;
        margin: 0 0 0.5rem 0;
    }
    
    h1, .h1 {
        font-size: 2.5rem;
    }

    h2, .h2 {
        font-size: 2rem;
    }

    h3, .h3 {
        font-size: 1.75rem;
    }

    h4, .h4 {
        font-size: 1.5rem;
    }

    h5, .h5 {
        font-size: 1.25rem;
    }

    h6, .h6 {
        font-size: 1rem;
    }

    p, ol, ul {
        margin: 0 0 1rem 0;
    }

    ol, ul {
        padding: 0;
    }

    b, strong {
        font-weight: 600;
    }

    a {
        text-decoration: none;
        color: ${({ theme }) => theme.colors.primary.light};
        background-color: transparent;
        -webkit-text-decoration-skip: objects;
        transition: .15s ease-in-out;

        &:hover {
            color: ${({ theme }) => theme.colors.primary.dark};
        }
    }

    label {
        font-weight: 600;
        font-size: 0.8rem;

        input {
            margin-top: .5rem;
        }
    }

    input {
        display: block;
        padding: 0.5rem;
        width: 100%;
        border: 1px solid rgba(108, 108, 108, 0.51);
        border-radius: 3px;
    }

    small {
        font-size: 0.8rem;
    }
`;

export default GlobalStyle;
