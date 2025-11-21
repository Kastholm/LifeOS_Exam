
import Search from "../../global/components/search";
import { Suspense } from "react";
import PaginationTest from "../../global/components/pagination";
import FetchScrapedArticles from "./api/fetchScrapedArticles";
import PostScrapedArticles from "./api/postScrapedArticles";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const query: string = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  //<PostScrapedArticles blog_id={1} fetch_site_id={1} title="test" description="test" />
  
  return (
    <div className="grid h-full w-full bg-zinc-50 font-sans dark:bg-black">
      <Search placeholder="test" />
      <Suspense key={query + currentPage} fallback={<p>fallback</p>}>
        <FetchScrapedArticles query={query} currentPage={currentPage}/>
      </Suspense>
      <PaginationTest currentPage={currentPage} />
    </div>
  );
}
