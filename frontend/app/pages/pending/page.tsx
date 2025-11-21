
import Search from "../../global/components/search";
import { Suspense } from "react";
import PaginationTest from "../../global/components/pagination";
import FetchArticles from "@/app/global/api/fetchArticles";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const query: string = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  console.log('jeg er fra page', query, currentPage)


  return (
    <div className="grid h-full w-full bg-zinc-50 font-sans dark:bg-black">
      <Search placeholder="test" />
      <Suspense key={query + currentPage} fallback={<p>fallback</p>}>
        <FetchArticles query={query} currentPage={currentPage} post_type="pending" />
      </Suspense>
      <PaginationTest currentPage={currentPage} />
    </div>
  );
}
