import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/fetch';
import { Candidate, GlobalResult } from '../../utils/type';

import { Circles } from 'react-loading-icons';
import Table from '../../components/Table/Table';

const Home = () => {
    const [loaded, setLoaded] = useState(false);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [globalResults, setGlobalResults] = useState<GlobalResult[]>([]);
    const [candidateNames, setCandidateNames] = useState<string[]>([]);
    const [candidateVotes, setCandidateVotes] = useState<number[]>([]);

    useEffect(() => {
        fetchData(setCandidates, setGlobalResults, setLoaded);
    }, []);

    useEffect(() => {
        if (!candidates.length || !globalResults.length) {
            return;
        }

        candidates
            .filter((candidate) => candidate.in_global)
            .forEach((candidate) => {
                const totalPoint = globalResults.filter(
                    (result) => result.candidate_id === candidate.id
                )[0].total_points;

                setCandidateNames((acc) => [...acc, candidate.full_name]);
                setCandidateVotes((acc) => [...acc, totalPoint]);
            });
    }, [candidates, globalResults]);

    return (
        <>
            {!loaded && <Circles fill='#0d48a0' width={50} />}
            {loaded && <Table names={candidateNames} votes={candidateVotes} />}
        </>
    );
};

export default Home;
