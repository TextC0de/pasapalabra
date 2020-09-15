/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import Layout from '@src/components/Layout';
import theme from '@src/styles/theme';

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        );
    }
}
