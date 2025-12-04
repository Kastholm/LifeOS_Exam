
export default async function FetchTMDBMovie({id} : {id: string}) {
  
  if(!id) {
    return null;
  }

  console.log('Fetching TMDB movie with IMDb ID:', id);

  const api_key = process.env.TMDB_API_KEY;

  if (!api_key) {
    console.error("TMDB_API_KEY not found in environment variables");
    return null;
  }

  const options = {
    method: 'GET', 
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${api_key}`
    }};

  try {
    
    const detailsRes = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,videos,images`, 
      options
    );

    if (!detailsRes.ok) {
      console.error("TMDB Movie Details API error:", detailsRes.status, await detailsRes.text());
      return null;
    }

    const movieData = await detailsRes.json();
    console.log("TMDB Movie Details:", movieData);
    return movieData;
    
  } catch(err) {
    console.error("Couldn't fetch from TMDB:", err);
    return null;
  }
}
