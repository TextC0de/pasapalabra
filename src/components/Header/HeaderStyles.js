import styled from 'styled-components';

export const Header = styled.header`
    height: ${({ open }) => (open ? '100vh' : '40px')};
    position: fixed;
    z-index: 99;
    width: 100%;
`;

export const HamburgerContainer = styled.button`
    border: none;
    background: transparent;
    margin: 0.5rem;
    padding: 0.5rem;
    z-index: 2;
    position: sticky;
    width: max-content;
    float: right;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    &:hover {
        cursor: pointer;
    }
`;

const HamburgerSpan = styled.span`
    background: ${({ open, theme }) =>
        open ? theme.colors.primary.contrastText : theme.colors.textPrimary};
    height: 3px;
    display: block;
    transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
`;

export const HamburgerSpan1 = styled(HamburgerSpan)`
    transform: ${({ open }) => (open ? 'rotate(-45deg) translate(-5px, 5px)' : undefined)};
    width: 25px;
    margin-bottom: 5px;
`;

export const HamburgerSpan2 = styled(HamburgerSpan)`
    width: ${({ open }) => (open ? '25px' : '20px')};
    transform: ${({ open }) => (open ? 'rotate(45deg)' : undefined)};
    margin-bottom: 5px;
`;

export const HamburgerSpan3 = styled(HamburgerSpan)`
    width: ${({ open }) => (open ? '0px' : '15px')};
`;

export const LinksContainer = styled.div`
    left: ${({ open }) => (open ? '0' : '-100vw')};
    background: ${({ theme }) => theme.colors.primary.main};
    position: absolute;
    transition: 0.3s ease-in-out;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const NavAnchor = styled.a`
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primary.contrastText};
    text-decoration: none;
    transition: 0.15s ease-in-out;
    cursor: pointer;

    &:hover {
        color: #888;
    }
`;
