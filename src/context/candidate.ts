import { createContext } from 'react';
import { GlobalCandidate, VotedCandidates } from '../utils/type';

export interface GlobalCandidateContext {
    GlobalCandidate: GlobalCandidate[];
    setGlobalCandidate: (GlobalCandidate: GlobalCandidate[]) => void;
}

export const globalCandidateContext = createContext<GlobalCandidateContext>({
    GlobalCandidate: [],
    setGlobalCandidate: () => {},
});

export interface VotedCandidatesContext {
    votedCandidates: VotedCandidates[];
    setVotedCandidates: (votedCandidates: VotedCandidates[]) => void;
}

export const votedCandidateContext = createContext<VotedCandidatesContext>({
    votedCandidates: [],
    setVotedCandidates: () => {},
});
