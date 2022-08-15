import { useContext, useEffect, useState } from 'react';
import { fetchData } from '../../utils/fetch';
import { Candidate, GlobalData, VotedCandidates } from '../../utils/type';
import { votedCandidateContext, VotedCandidatesContext } from '../../context/candidate';

import { Circles } from 'react-loading-icons';
import Table from '../../components/Table/Table';

import styles from './Home.module.css';

const Home = () => {
    const [loaded, setLoaded] = useState(false);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [globalResults, setGlobalResults] = useState<GlobalData[]>([]);

    const { setVotedCandidates } = useContext<VotedCandidatesContext>(votedCandidateContext);

    useEffect(() => {
        fetchData(setCandidates, setGlobalResults, setLoaded);
    }, []);

    useEffect(() => {
        if (!candidates.length || !globalResults.length) {
            return;
        }

        const newVotedCandidates: VotedCandidates[] = [];

        candidates
            .filter((candidate) => candidate.in_global)
            .forEach((candidate) => {
                const totalPoint = globalResults.filter(
                    (result) => result.candidate_id === candidate.id
                )[0].total_points;

                newVotedCandidates.push({
                    ...candidate,
                    votes: totalPoint,
                });
            });

        setVotedCandidates(newVotedCandidates);
    }, [candidates, globalResults, setVotedCandidates]);

    return (
        <div className={styles.container}>
            {!loaded && <Circles fill='#0d48a0' width={50} />}
            {loaded && <Table />}
        </div>
    );
};

export default Home;
