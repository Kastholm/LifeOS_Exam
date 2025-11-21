export async function fetchMusic() {
    const url = "https://www.googleapis.com/youtube/v3/playlistItems";
    
    const params = new URLSearchParams({
        part: "snippet,contentDetails",
        playlistId: "PLkZ_a_mCRqgLgl3Gk4gd5cheR4IXmFwdB",
        maxResults: "50",
        key: process.env.YOUTUBE_API_KEY!
    });

    const res = await fetch(`${url}?${params.toString()}`);
    const data = await res.json();

    return data;
}

