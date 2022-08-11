import { Candidate } from './type';

const xApiKey = 'POBFUICMwALegLOjApnaiLS61fu6SeJp';

export const fetchData = async (
    setCandidates: (candidates: Candidate[]) => void,
    setLoaded: (loaded: boolean) => void
) => {
    const data = await fetch('https://voting.homework.snapsoft.hu/api/candidates', {
        method: 'GET',
        headers: {
            'x-api-key': xApiKey,
        },
    });

    const json = await data.json();

    setCandidates(json.candidates);
    setLoaded(true);
};
