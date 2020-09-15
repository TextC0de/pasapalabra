import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { getGamesApiURL } from '@src/helpers/axios';

const useGames = (cacheable = false, page = '', options = { limit: 10 }) => {
    const cache = useRef({});
    const [games, setGames] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        setFetching(true);
        if (cacheable && cache.current[`games_${page}`]) {
            setGames(cache.current[`games_${page}`]);
            setFetching(false);
            return;
        }

        axios
            .get(`${getGamesApiURL()}/find`, {
                params: {
                    filters: {
                        isPublished: false,
                        isPrivate: false
                    },
                    options: { limit: 10 }
                }
            })
            .then((response) => {
                setGames(response.data.data);
                if (cacheable) {
                    cache.current[`games_${page}`] = response.data.data;
                }
            })
            .catch((e) => {
                setError(e);
            })
            .finally(() => {
                setFetching(false);
            });
    }, [cacheable, page, options]);

    return { games, error, fetching };
};

export default useGames;
