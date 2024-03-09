export declare class SearchData {
    page: number;
    results: Results[];
    total_pages: number;
    total_results: number;
    constructor();
}
interface Results {
    backdrop_path?: string;
    first_air_date?: string;
    id?: number;
    known_for?: any[];
    known_for_department?: string;
    media_type?: string;
    name?: string;
    nickname?: string;
    original_name?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    profile_path?: string;
    release_date?: string;
    title?: string;
    vote_average?: number;
    vote_count?: number;
}
export {};
