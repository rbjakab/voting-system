import { useCallback, useEffect, useState } from 'react';
import { Circles } from 'react-loading-icons';
import Button from '../../components/Button/Button';
import LogIn from '../../components/LogIn/LogIn';
import Vote from '../../components/Vote/Vote';
import { fetchCandidates, fetchRegions, login, postVote } from '../../utils/fetch';
import { Candidate, Ranking, Region, Voter, Error, VoterState } from '../../utils/type';

import styles from './Voting.module.css';

const Voting = () => {
    const [loaded, setLoaded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [failedLoggedIn, setFailedLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successfulVoting, setSuccessfulVoting] = useState(false);

    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);

    const [globalCandidates, setGlobalCandidates] = useState<Candidate[]>([]);
    const [globalRankings, setGlobalRankings] = useState<Ranking[]>([]);
    const [regionCandidates, setRegionCandidates] = useState<Candidate[]>([]);
    const [regionRankings, setRegionRankings] = useState<Ranking[]>([]);

    const [voter, setVoter] = useState<VoterState>();
    const [regionOfUser, setRegionOfUser] = useState<Region>();

    useEffect(() => {
        fetchCandidates(setCandidates, setLoaded);
        fetchRegions(setRegions, setLoaded);
    }, []);

    useEffect(() => {
        setGlobalCandidates(candidates.filter((candidate) => candidate.in_global));
        setRegionCandidates(
            candidates.filter(
                (candidate) =>
                    candidate.in_region &&
                    regionOfUser &&
                    candidate.in_region.id === regionOfUser.id
            )
        );
    }, [candidates, regionOfUser]);

    const getRegionById = useCallback(
        (regionId: string) => regions.filter((region) => region.id === regionId)[0],
        [regions]
    );

    useEffect(() => {
        if (!voter) {
            return;
        }

        const _region = getRegionById(voter?.in_region_id);

        setRegionOfUser(_region);
    }, [getRegionById, voter]);

    const isAuthFailed = (loginInfo: { voter: Voter } | Error): loginInfo is Error =>
        (loginInfo as Error).error !== undefined;

    const handleAuthentication = async (key: string) => {
        const loginInfo: { voter: Voter } | Error = await login(key);

        if (!isAuthFailed(loginInfo) && !loginInfo.voter.voted_at) {
            setLoggedIn(true);
            setErrorMessage('');
            setVoter({ ...loginInfo.voter, key });
            return;
        }

        if (isAuthFailed(loginInfo)) {
            setFailedLoggedIn(true);
            setErrorMessage(loginInfo.error);
            return;
        }

        if (loginInfo.voter.voted_at) {
            setFailedLoggedIn(true);
            setErrorMessage('You already voted in this election!');
        }
    };

    const onClickHandle = async () => {
        if (voter) {
            const response = await postVote(globalRankings, regionRankings, voter.id, voter.key);

            if (response && response.ok) {
                setSuccessfulVoting(true);
                return;
            }

            if (globalCandidates.length !== globalRankings.length) {
                setErrorMessage('Please select each of the global candidates.');
                return;
            }

            if (regionCandidates.length !== regionRankings.length) {
                setErrorMessage('Please select each of the region candidates.');
                return;
            }
        }
    };

    return (
        <div className={styles.container}>
            {!successfulVoting ? (
                !loggedIn ? (
                    <>
                        <LogIn handleAuthentication={handleAuthentication} />
                        {failedLoggedIn && <p className={styles.errorMessage}>{errorMessage}</p>}
                    </>
                ) : (
                    <>
                        {loaded ? (
                            <>
                                <h2>Welcome {voter?.full_name}.</h2>
                                <h1>Vote for the next Leader of SnapSoftistan:</h1>
                                <Vote
                                    candidates={globalCandidates}
                                    rankings={globalRankings}
                                    setRankings={setGlobalRankings}
                                />
                                <h1>
                                    Vote for the next Leader of{' '}
                                    {regionOfUser ? regionOfUser.region_name : 'your region'}:
                                </h1>
                                <Vote
                                    candidates={regionCandidates}
                                    rankings={regionRankings}
                                    setRankings={setRegionRankings}
                                />
                                <Button label='Vote!' onClickHandle={onClickHandle} />
                                <p className={styles.errorMessage}>{errorMessage}</p>
                            </>
                        ) : (
                            <Circles fill='#0d48a0' width={50} />
                        )}
                    </>
                )
            ) : (
                <p>Your vote is submitted, thank you!</p>
            )}
        </div>
    );
};

export default Voting;
