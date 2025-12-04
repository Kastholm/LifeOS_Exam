interface TMDBMovieData {
    id: number;
    title: string;
    original_title?: string;
    overview: string;
    release_date: string;
    runtime?: number;
    vote_average: number;
    vote_count: number;
    poster_path: string | null;
    backdrop_path: string | null;
    genres?: Array<{ id: number; name: string }>;
    production_companies?: Array<{ id: number; name: string; logo_path?: string | null }>;
    production_countries?: Array<{ iso_3166_1: string; name: string }>;
    spoken_languages?: Array<{ iso_639_1: string; name: string; english_name?: string }>;
    budget?: number;
    revenue?: number;
    popularity?: number;
    original_language?: string;
    status?: string;
    tagline?: string;
    homepage?: string;
    imdb_id?: string;
    credits?: {
      cast: Array<{ 
        id: number; 
        name: string; 
        character: string; 
        order: number;
        profile_path?: string | null;
      }>;
      crew: Array<{ 
        id: number; 
        name: string; 
        job: string; 
        department: string;
        profile_path?: string | null;
      }>;
    };
  }