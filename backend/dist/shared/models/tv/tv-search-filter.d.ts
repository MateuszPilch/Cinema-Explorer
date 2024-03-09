export declare class TvSearchFilter {
    air_date: {
        gte: string;
        lte: string;
    };
    first_air_date_year: number;
    first_air_date: {
        gte: string;
        lte: string;
    };
    language: string;
    page: number;
    sort_by: string;
    vote_average: {
        gte: number;
        lte: number;
    };
    vote_count: {
        gte: number;
        lte: number;
    };
    watch_region: string;
    with_companies: string;
    with_origin_country: string;
    with_original_language: string;
    with_release_type: number;
    with_runtime: {
        gte: number;
        lte: number;
    };
    with_watch_monetization_types: string;
    with_watch_providers: string;
    setFilter(property: keyof any, value: any): void;
    clearFilter(): void;
}
