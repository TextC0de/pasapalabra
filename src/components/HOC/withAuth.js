import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getUsersApiURL } from '@src/helpers/axios';
import Seo from '@src/components/Seo';
import LoadingScreen from '@src/components/LoadingScreen';

const withAuth = (Child, pageTitle = '', pageDescription = '') => {
    const MyComp = (props) => {
        const router = useRouter();
        const [checkingAuth, setCheckingAuth] = useState(true);
        const [isAuth, setIsAuth] = useState(false);

        useEffect(() => {
            setCheckingAuth(true);
            axios
                .get(`${getUsersApiURL()}/checkauth`)
                .then(() => setIsAuth(true))
                .catch(() => setIsAuth(false))
                .finally(() => setCheckingAuth(false));
        }, []);

        if (checkingAuth) return <LoadingScreen />;
        if (!isAuth) {
            router.push({
                pathname: '/login',
                query: { denied: true }
            });
            return <LoadingScreen />;
        }

        return (
            <div>
                <Seo title={`${pageTitle} | Pasapalabra`} description={pageDescription} />
                <Child {...props} />
            </div>
        );
    };

    MyComp.getInitialProps = async ({ req }) => {
        let fullUrl;
        if (req) {
            fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        } else {
            fullUrl = `${window.location.protocol}//${window.location.hostname}${
                window.location.port ? `:${window.location.port}` : ''
            }`;
        }

        return { fullUrl };
    };

    return MyComp;
};

export default withAuth;
