import { useState, useCallback } from 'react';
import CONTRACT_ADDR from '@/constant';

const useRobData = (account) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const fetchData = useCallback(() => {
        if (!account) return;
        setLoading(true);
        // TODO: set env file for endpoint
        const fetchUrl = `https://fullnode.testnet.aptoslabs.com/v1/accounts/${account}/events/${CONTRACT_ADDR}::knife::RobHistory/been_robbed_events`;
        fetch(fetchUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(String(error));
                setLoading(false);
            });
    }, [account]);

    return [{ data, error, isLoading }, fetchData];
};

export default useRobData;
