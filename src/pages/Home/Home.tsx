import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/fetch';
import { Candidate } from '../../utils/type';

import { Circles } from 'react-loading-icons';

const Home = () => {
    const [loaded, setLoaded] = useState(false);
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        fetchData(setCandidates, setLoaded);
    }, []);

    return (
        <>
            {!loaded && <Circles fill='#0d48a0' width={50} />}
            {loaded && candidates[0].full_name}
        </>
    );
};

export default Home;
