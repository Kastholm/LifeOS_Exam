export async function fetchMusic(limit: string = "50") {
    const url = "https://www.googleapis.com/youtube/v3/playlistItems";
    const targetCount = parseInt(limit);
    let allItems: any[] = [];
    let nextPageToken = "";
    
    while (allItems.length < targetCount) {

        const remaining = targetCount - allItems.length;
        const fetchSize = Math.min(remaining, 50);

        const params: Record<string, string> = {
            part: "snippet,contentDetails",
            playlistId: "PLkZ_a_mCRqgJAbwF2cNqJ5sVXwKalgLMK",
            maxResults: fetchSize.toString(),
            key: process.env.YOUTUBE_API_KEY!
        };

        if (nextPageToken) {
            params.pageToken = nextPageToken;
        }

        try {
            const queryString = new URLSearchParams(params).toString();
            const res = await fetch(`${url}?${queryString}`, {
                next: { revalidate: 3600 } // Cache i 1 time
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("YouTube API Error:", errorData);
                break; 
            }

            const data = await res.json();
            
            if (data.items) {
                allItems = [...allItems, ...data.items];
            }

            // Hvis der ikke er flere sider, stop
            if (!data.nextPageToken) {
                break;
            }

            nextPageToken = data.nextPageToken;

        } catch (error) {
            console.error("Fetch error:", error);
            break;
        }
    }

    return { items: allItems };
}