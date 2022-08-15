import { useCallback, useEffect, useState } from 'react';
import { Circles } from 'react-loading-icons';
import { Donut } from '../../components/Donut/Donut';
import List from '../../components/List/List';
import RegionGrid from '../../components/RegionGrid/RegionGrid';
import { setClass } from '../../utils/class';
import {
    fetchCandidates,
    fetchGlobalResults as fetchAllResults,
    fetchRegions,
} from '../../utils/fetch';
import { Candidate, GlobalData, ListResult, NameWithVotes, Region } from '../../utils/type';

import styles from './Results.module.css';

const Results = () => {
    const [loaded, setLoaded] = useState(false);

    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);
    const [allResults, setAllResults] = useState<GlobalData[]>([]);

    const [globalResults, setGlobalResults] = useState<ListResult>();
    const [regionResults, setRegionResults] = useState<ListResult[]>([]);

    useEffect(() => {
        fetchAllResults(setAllResults, setLoaded);
        fetchCandidates(setCandidates, setLoaded);
        fetchRegions(setRegions, setLoaded);
    }, []);

    useEffect(() => {
        if (!candidates.length || !allResults.length) {
            return;
        }

        const newListResultRanking: NameWithVotes[] = [];

        candidates
            .filter((candidate) => candidate.in_global)
            .forEach((candidate) => {
                const totalPoint = allResults.filter(
                    (result) => result.candidate_id === candidate.id
                )[0].total_points;

                newListResultRanking.push({
                    ...candidate,
                    votes: totalPoint,
                });
            });

        const globalListResults: ListResult = {
            listName: 'Results of PM',
            rankings: newListResultRanking.map(({ full_name, votes }) => ({
                full_name,
                votes,
            })),
        };

        setGlobalResults(globalListResults);
    }, [candidates, allResults]);

    const pairResults = useCallback(() => {
        regions.forEach((region) => {
            const candidatesInRegion = candidates.filter(
                (candidate) => candidate.in_region && candidate.in_region.id === region.id
            );

            const newRegionResult: ListResult = {
                listName: region.region_name,
                rankings: [],
            };

            candidatesInRegion.forEach((candidate) => {
                const votes = allResults.filter((result) => result.candidate_id === candidate.id)[0]
                    .total_points;

                newRegionResult.rankings.push({
                    full_name: candidate.full_name,
                    votes,
                });
            });

            setRegionResults((prevState) => [...prevState, newRegionResult]);
        });
    }, [candidates, allResults, regions]);

    useEffect(() => {
        if (!candidates.length || !regions.length || !allResults.length) {
            return;
        }

        pairResults();
    }, [candidates, allResults, regions, pairResults]);

    const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

    return (
        <>
            {!loaded ? (
                <Circles fill='#0d48a0' width={50} />
            ) : (
                <div className={styles.container}>
                    <div className={setClass(styles, ['list', 'disableSelect'])}>
                        {globalResults && <List results={globalResults} />}
                    </div>
                    <div className={styles.chart}>
                        {globalResults !== undefined && (
                            <Donut
                                labelArray={globalResults.rankings.map(
                                    (result) => result.full_name
                                )}
                                colorArray={globalResults.rankings.map(() => generateRandomColor())}
                                numberArray={globalResults.rankings.map((result) => result.votes)}
                            />
                        )}
                    </div>
                    <RegionGrid regionResults={regionResults} />
                </div>
            )}
        </>
    );
};

export default Results;
