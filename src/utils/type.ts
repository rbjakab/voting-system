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

export type GlobalResult = {
    candidate_id: string;
    in_region: undefined;
    total_points: number;
    rankings: [];
};
