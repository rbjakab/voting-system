import { useState } from 'react';
import { GlobalCandidate, VotedCandidates } from '../utils/type';
import { globalCandidateContext, votedCandidateContext } from './candidate';

type Props = {
    children?: JSX.Element;
};

const ContextProvider = ({ children }: Props) => {
    const [GlobalCandidate, setGlobalCandidate] = useState<GlobalCandidate[]>([]);
    const [votedCandidates, setVotedCandidates] = useState<VotedCandidates[]>([]);

    return (
        <globalCandidateContext.Provider
            value={{
                GlobalCandidate,
                setGlobalCandidate,
            }}
        >
            <votedCandidateContext.Provider value={{ votedCandidates, setVotedCandidates }}>
                {children}
            </votedCandidateContext.Provider>
        </globalCandidateContext.Provider>
    );
};

export default ContextProvider;
