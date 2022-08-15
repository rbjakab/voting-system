import { Candidate, GlobalData, IDWithRank, Region, Voter } from './type';

const xApiKey = 'POBFUICMwALegLOjApnaiLS61fu6SeJp';

const fetchUrl = (url: string) =>
    fetch(url, {
        method: 'GET',
        credentials: 'omit',
        headers: {
            'x-api-key': xApiKey,
            'Content-Type': 'application/json',
        },
    });

export const fetchData = async (
    setCandidates: (candidates: Candidate[]) => void,
    setGlobalResults: (globalResults: GlobalData[]) => void,
    setLoaded: (loaded: boolean) => void
) => {
    const candidatesDATA = await fetchUrl('https://voting.homework.snapsoft.hu/api/candidates');
    const candidatesJSON = await candidatesDATA?.json();
    setCandidates(candidatesJSON.candidates);

    const globalDATA = await fetchUrl('https://voting.homework.snapsoft.hu/api/results/global');
    const globalJSON = await globalDATA?.json();
    setGlobalResults(globalJSON.candidate_results);

    setLoaded(true);
};

export const fetchCandidates = async (
    setCandidates: (candidates: Candidate[]) => void,
    setLoaded: (loaded: boolean) => void
) => {
    try {
        const candidatesDATA = await fetchUrl('https://voting.homework.snapsoft.hu/api/candidates');
        const candidatesJSON = await candidatesDATA?.json();
        setCandidates(candidatesJSON.candidates);

        setLoaded(true);
    } catch (err: any) {
        throw new Error(err);
    }
};

export const fetchRegions = async (
    setRegions: (candidates: Region[]) => void,
    setLoaded: (loaded: boolean) => void
) => {
    try {
        const regionsDATA = await fetchUrl('https://voting.homework.snapsoft.hu/api/regions');
        const regionsJSON = await regionsDATA?.json();
        setRegions(regionsJSON.regions);

        setLoaded(true);
    } catch (err: any) {
        throw new Error(err);
    }
};

export const fetchVoters = async (setVoters: (voters: Voter[]) => void) => {
    try {
        const votersDATA = await fetchUrl(
            'https://voting.homework.snapsoft.hu/api/voters/list-debug'
        );
        const votersJSON = await votersDATA.json();

        setVoters(votersJSON.voters);
    } catch (err: any) {
        throw new Error(err);
    }
};

export const login = async (key: string) => {
    try {
        const loginDATA = await fetch('https://voting.homework.snapsoft.hu/api/voters/info', {
            method: 'POST',
            headers: {
                'x-api-key': xApiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key,
            }),
        });
        return await loginDATA.json();
    } catch (err: any) {
        throw new Error(err);
    }
};

export const postVote = async (
    globalRankings: IDWithRank[],
    regionRankings: IDWithRank[],
    voter_id: string,
    voter_key: string
) => {
    const rankings_global = globalRankings.map((ranking) => ranking.id);
    const rankings_region = regionRankings.map((ranking) => ranking.id);

    try {
        return await fetch('https://voting.homework.snapsoft.hu/api/voters/vote', {
            method: 'POST',
            headers: {
                'x-api-key': xApiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rankings_global,
                rankings_region,
                voter_id,
                voter_key,
            }),
        });
    } catch (err: any) {
        throw new Error(err);
    }
};

export const fetchGlobalResults = async (
    setGlobalResults: (globalResults: GlobalData[]) => void,
    setLoaded: (loaded: boolean) => void
) => {
    try {
        const globalResultsDATA = await fetchUrl('https://voting.homework.snapsoft.hu/api/results');
        const globalResultsJSON = await globalResultsDATA.json();
        setGlobalResults(globalResultsJSON.candidate_results);
        setLoaded(true);
    } catch (err: any) {
        throw new Error(err);
    }
};
