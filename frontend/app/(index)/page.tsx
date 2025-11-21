import FetchArticles from "@/app/global/api/fetchArticles";
import Search from "../global/components/search";
import { Suspense } from "react";
import PaginationTest from "../global/components/pagination";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const query: string = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="grid min-h-screen w-full bg-zinc-50 font-sans dark:bg-black">
      <Search placeholder="test" />
      <Suspense key={query + currentPage} fallback={<p className="h-full">fallback</p>}>
        <FetchArticles query={query} currentPage={currentPage} post_type="publish" />
      </Suspense>
      <PaginationTest currentPage={currentPage} />
    </div>
  );
}
