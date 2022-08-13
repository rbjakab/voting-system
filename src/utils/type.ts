export type Region = {
    id: string;
    region_name: string;
    population: number;
    area: number;
    center_latitude: number;
    center_longitude: number;
};

export type Candidate = {
    id: string;
    full_name: string;
    in_region?: Region;
    in_global: boolean;
};

export type Ranking = {
    id: string;
    rank?: number;
};

export type GlobalResult = {
    candidate_id: string;
    in_region: undefined;
    total_points: number;
    rankings: [];
};

export type VotedCandidates = Candidate & {
    votes: number;
};

export type UserState = {
    full_name: string;
    in_region_id: string;
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

export type Error = {
    error: string;
};
