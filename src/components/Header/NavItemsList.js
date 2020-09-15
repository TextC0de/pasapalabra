import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { NavMenu, NavAnchor } from './HeaderStyles';

const NavItemsList = ({ items, onItemClick }) => (
    <NavMenu>
        {items.map(({ href, text }) => (
            <Link href={href} key={href} passHref>
                <NavAnchor role="link" tabIndex={-1} onClick={onItemClick} onKeyDown={onItemClick}>
                    {text}
                </NavAnchor>
            </Link>
        ))}
    </NavMenu>
);

NavItemsList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onItemClick: PropTypes.func.isRequired
};

export default NavItemsList;
