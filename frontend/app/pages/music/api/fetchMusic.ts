export async function fetchMusic() {
    const url = "https://www.googleapis.com/youtube/v3/playlistItems";
    
    const params = new URLSearchParams({
        part: "snippet,contentDetails",
        playlistId: "PLkZ_a_mCRqgJAbwF2cNqJ5sVXwKalgLMK",
        maxResults: "50",
        key: process.env.YOUTUBE_API_KEY!
    });

    try {
        const res = await fetch(`${url}?${params.toString()}`, {
            next: { revalidate: 3600 } // Cache i 1 time for at spare på kvoten
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("YouTube API Error:", errorData);
            return { items: [] }; // Returner tom liste ved fejl, men log fejlen
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        return { items: [] };
    }
}