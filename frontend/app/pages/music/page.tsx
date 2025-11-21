
export default async function Music(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {

  const searchParams = await props.searchParams;


  return (
    <div className="grid h-full w-full bg-zinc-50 font-sans dark:bg-black">
      <h1>test</h1>
    </div>
  );
}
