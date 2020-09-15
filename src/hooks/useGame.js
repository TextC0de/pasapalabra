import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { getGamesApiURL } from '@src/helpers/axios';

const useGame = (id, cacheable = false) => {
    const cache = useRef({});
    const [game, setGame] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        setFetching(true);
        if (!id) return;

        if (cacheable && cache.current[`game_${id}`]) {
            setGame(cache.current[`game_${id}`]);
            setFetching(false);
            return;
        }

        axios
            .get(`${getGamesApiURL()}/find/${id}`)
            .then((response) => {
                if (cacheable) {
                    cache.current[`game_${id}`] = response.data.data;
                }

                setGame(response.data.data);
            })
            .catch((e) => {
                setError(e);
            })
            .finally(() => {
                setFetching(false);
            });
    }, [id, cacheable]);

    return { game, error, fetching };
};

export default useGame;
