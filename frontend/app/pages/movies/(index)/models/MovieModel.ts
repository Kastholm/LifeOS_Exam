export interface MovieModel {
    id: number;
    watched_at: string;
    action: string;
    type: string;
    movie: {
        title: string;
        year: number;
        ids: {
            trakt: number;
            slug: string;
            imdb: string;
            tmdb: number;
        },
        images: {
            fanart: string[];
            poster: string[];
            logo: string[];
            clearart: string[];
            banner: string[];
            thumb: string[];
        }
    }
}
