import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const Seo = ({ title, description }) => (
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta lang="es" />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <title>{title}</title>
    </Head>
);

Seo.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
};

Seo.defaultProps = {
    title: 'Pasapalabra | Juego online',
    description: 'Diviertete con este juego basado en el famoso programa de televisión Pasapalabra'
};

export default Seo;
