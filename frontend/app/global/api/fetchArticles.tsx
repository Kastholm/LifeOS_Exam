import Articles from "../../(index)/components/articles";
import { ArticleModel } from "../../(index)/models/ArticleModel";


export default async function FetchArticles({
    query,
    currentPage,
    post_type
}: {
    query: string;
    currentPage: number,
    post_type: string
}) {
    const site_path = process.env.WP_PATH;
    const username = process.env.WP_USERNAME;
    const password = process.env.WP_APP_PW;
    
    if (!site_path || !username || !password) {
      throw new Error('WordPress credentials are not configured');
    }

    let validTypes = ['pending', 'draft', 'publish']
    if(!post_type || !validTypes.includes(post_type)) {
      post_type = 'publish'
    }

    let posts: ArticleModel[] = [];

    let url = `https://${site_path}/wp-json/wp/v2/posts?status=${post_type}`
    if(post_type !== 'publish'){
      url += '&context=edit'
    } 
    if(currentPage && currentPage > 1) {
      url += `&page=${currentPage}`
    }
    if(query && query.trim() !== '') {
      url += `&search=${encodeURIComponent(query.trim())}`
    }
    console.log('Fetching from:', url)
    
    const auth = Buffer.from(`${username}:${password}`).toString("base64")

    try {

      const data = await fetch(url, {
          headers: {
            Authorization: `Basic ${auth}`,
          },
          cache: "no-store",
        })
      if(!data.ok){
        const errorText = await data.text();
        console.error('WordPress API error:', data.status, errorText);
        if (data.status === 401) {
          throw new Error('Authentication failed - check your WordPress credentials')
        } else if (data.status === 403) {
          throw new Error('Access forbidden - user may not have permission to view draft/pending posts')
        } else {
          throw new Error(`WordPress API error: ${data.status} - ${errorText}`)
        }
      }
      posts = await data.json()
      for(const post of posts) {
        let image_url = ''
        if(post.featured_media > 0) {
          const image_data = await fetch(`https://${site_path}/wp-json/wp/v2/media/${post.featured_media}`)
          const image = await image_data.json()
          post.image_url = image.source_url
        } else {
          post.image_url = 'https://skala.or.id/wp-content/uploads/2024/01/dummy-post-square-1-1.jpg'
        }
      };
    } catch(err) {
      console.error('Error fetching data', err)
      return (
        <div className="p-4 text-red-600">
          <p>Fejl ved hentning af artikler. Prøv igen senere.</p>
        </div>
      )
    }

    if (posts.length === 0) {
      return (
        <div className="p-4 text-gray-600">
          <p>Ingen artikler fundet.</p>
        </div>
      )
    }
    
    return (
      <ul className="grid grid-cols-4 gap-4">
          {posts.map((post: ArticleModel) => (
            <Articles key={post.id} post={post} />
          ))}
        </ul>
      )
    }