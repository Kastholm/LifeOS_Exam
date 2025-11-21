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

  return (
    <div className="grid min-h-screen w-full bg-zinc-50 font-sans dark:bg-black">
      <h1>test</h1>
      <iframe src="http://127.0.0.1:8050/"></iframe>
    </div>
  );
}
