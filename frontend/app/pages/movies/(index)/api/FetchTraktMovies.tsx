import { headers } from "next/headers";
const trakt_values = {
  "id": process.env.TRAKT_CLIENT_ID,
  "secret": process.env.TRAKT_CLIENT_SECRET,
  "user": process.env.TRAKT_USERNAME
}
const authentication = {
  "Content-Type": "application/json",
  "trakt-api-version": "2",
  "trakt-api-key": trakt_values.id!
}

export default async function FetchWatchList({type} : {type: string}) {

  if(!type) {
    type = 'history'
  }
  console.log(type)
  let watchlist = []
  try{
    const res = await fetch(
      `https://api.trakt.tv/users/${trakt_values.user}/${type}/movies?limit=50&extended=images`, 
      {
      headers: authentication
      }
    );
    const data = await res.json();
  
    let remove_dupliants = data.reduce((list: any, movie: any) => {
      const title = movie.movie.title
    
      // Find om der allerede findes en film med samme titel
      const exists = list.some((m: any) => m.movie.title === title)
    
      if (exists) return list
    
      return [...list, movie]
    }, [])
  
    watchlist = remove_dupliants;
  }catch(err) {
    console.error("Couldn't fetch watchlist", err)
  }
  return watchlist
}
