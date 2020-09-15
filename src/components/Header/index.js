import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getUsersApiURL } from '@src/helpers/axios';
import NavItemsList from './NavItemsList';
import {
    Header,
    HamburgerContainer,
    HamburgerSpan1,
    HamburgerSpan2,
    HamburgerSpan3,
    LinksContainer,
    NavAnchor
} from './HeaderStyles';

const links = {
    common: [
        { href: '/', text: 'Inicio' },
        { href: '/games', text: 'Juegos' },
        { href: '/pasapalabra-maker', text: 'Pasapalabra Maker' }
    ],
    unauthorized: [
        { href: '/login', text: 'Iniciar sesión' },
        { href: '/register', text: 'Registrarse' }
    ],
    authorized: [
        { href: '/my-games', text: 'Mis juegos' },
        { href: '/my-rooms', text: 'Mis partidas' }
    ]
};

const Navigation = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    const toggleOpenState = () => setOpen(!open);

    useEffect(() => {
        setCheckingAuth(true);
        axios
            .get(`${getUsersApiURL()}/checkauth`)
            .then(() => setIsAuth(true))
            .catch(() => setIsAuth(false))
            .finally(() => setCheckingAuth(false));
    }, []);

    const onLogoutClick = () => {
        axios
            .post(`${getUsersApiURL()}/logout`)
            .then(() => {
                setIsAuth(false);
                router.push('/');
            })
            .catch(() => setIsAuth(true))
            .finally(() => setCheckingAuth(false));
    };

    return (
        <Header id="header" open={open} role="navigation">
            <HamburgerContainer
                type="button"
                id="menuToogle"
                onClick={toggleOpenState}
                onKeyDown={(event) => {
                    event.preventDefault();
                    if (event.keyCode === 13) {
                        toggleOpenState();
                    }
                }}
                open={open}
            >
                <HamburgerSpan1 open={open} />
                <HamburgerSpan2 open={open} />
                <HamburgerSpan3 open={open} />
            </HamburgerContainer>

            <LinksContainer open={open}>
                <NavItemsList items={links.common} onItemClick={toggleOpenState} />

                <NavItemsList
                    items={isAuth ? links.authorized : links.unauthorized}
                    onItemClick={toggleOpenState}
                />

                {isAuth && <NavAnchor onClick={onLogoutClick}>Cerrar sesión</NavAnchor>}
            </LinksContainer>
        </Header>
    );
};

export default Navigation;
