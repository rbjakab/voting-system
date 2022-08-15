export type Candidate = {
    id: string;
    full_name: string;
    in_region?: Region;
    in_global: boolean;
};

export type VotedCandidates = Candidate & {
    votes: number;
};

export type GlobalData = {
    candidate_id: string;
    in_region: undefined;
    total_points: number;
    rankings: string[];
};

export type Region = {
    id: string;
    region_name: string;
    population: number;
    area: number;
    center_latitude: number;
    center_longitude: number;
};

export type ListResult = {
    listName: string;
    rankings: NameWithVotes[];
};

export type NameWithVotes = {
    full_name: string;
    votes: number;
};

export type IDWithRank = {
    id: string;
    rank: number;
};

export type Error = {
    error: string;
};

export type GlobalCandidate = {
    id: string;
};

export type Voter = {
    id: string;
    full_name: string;
    in_region_id: string;
    voted_at?: string;
};

export type VoterState = Voter & {
    key: string;
};
