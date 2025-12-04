export default async function FetchGoogleBook(title: string) {
  if (!title) {
    return null;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&orderBy=newest&maxResults=1`,
      {
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      console.error("Google Books API error:", response.status);
      return null;
    }

    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      return data.items[0];
    }

    return null;
  } catch (error) {
    console.error("Error fetching from Google Books:", error);
    return null;
  }
}