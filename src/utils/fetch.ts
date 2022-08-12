import { Candidate, GlobalResult } from './type';

const xApiKey = 'POBFUICMwALegLOjApnaiLS61fu6SeJp';

const fetchUrl = (url: string) =>
    fetch(url, {
        method: 'GET',
        headers: {
            'x-api-key': xApiKey,
        },
    });

export const fetchData = async (
    setCandidates: (candidates: Candidate[]) => void,
    setGlobalResults: (globalResults: GlobalResult[]) => void,
    setLoaded: (loaded: boolean) => void
) => {
    const candidatesDATA = await fetchUrl('https://voting.homework.snapsoft.hu/api/candidates');
    const candidatesJSON = await candidatesDATA.json();
    setCandidates(candidatesJSON.candidates);

    const globalDATA = await fetchUrl('https://voting.homework.snapsoft.hu/api/results/global');
    const globalJSON = await globalDATA.json();
    setGlobalResults(globalJSON.candidate_results);

    console.log(candidatesJSON.candidates);
    console.log(globalJSON.candidate_results);

    setLoaded(true);
};
