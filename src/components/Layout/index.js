import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Header from '@src/components/Header';
import GlobalStyles from '@src/styles/global';
import styled from 'styled-components';

const LayoutContainer = styled.div``;

const Layout = ({ children }) => (
    <LayoutContainer>
        <Head>
            <link
                href="https://fonts.googleapis.com/css2?family=Comfortaa&family=Open+Sans&display=swap"
                rel="stylesheet"
            />
        </Head>
        <GlobalStyles />
        <Header />
        <div className="content">{children}</div>
    </LayoutContainer>
);

Layout.propTypes = {
    children: PropTypes.element.isRequired
};

export default Layout;
