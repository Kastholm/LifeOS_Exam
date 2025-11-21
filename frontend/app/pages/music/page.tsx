import { fetchMusic } from "./api/fetchMusic";
import Image from "next/image";

export default async function Music() {
  const data = await fetchMusic();
  const items = data.items || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Min Musik</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item: any, index: number) => {
          const snippet = item.snippet;
          const videoId = snippet.resourceId?.videoId;
          const thumbnail = snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url;
          const publishedAt = snippet.publishedAt ? new Date(snippet.publishedAt).toLocaleDateString('da-DK', {
            year: 'numeric',
            month: 'short'
          }) : null;

          return (
            <a
              key={item.id || index}
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg"
            >
              <div className="h-0.5 w-full bg-linear-to-r from-primary/70 via-primary to-primary/60 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
              {thumbnail && (
                <div className="relative mx-4 mt-4 rounded-xl border border-border/40 bg-card/80 shadow-sm ring-1 ring-white/5 backdrop-blur overflow-hidden aspect-video">
                  <Image
                    alt={snippet.title ?? "Music thumbnail"}
                    width={480}
                    height={360}
                    src={thumbnail}
                    className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-3 px-6 pb-6 pt-5 text-foreground">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80">
                  <span className="rounded-full border border-border/40 px-2.5 py-1 font-medium">
                    #{index + 1}
                  </span>
                  {publishedAt && (
                    <span className="font-medium text-muted-foreground/70">
                      {publishedAt}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary line-clamp-2">
                    {snippet.title}
                  </h2>
                  {snippet.channelTitle && (
                    <p className="text-xs text-muted-foreground/70">
                      {snippet.channelTitle}
                    </p>
                  )}
                </div>
                <div className="mt-auto flex items-center justify-end">
                  <span className="text-lg leading-none text-muted-foreground/60 group-hover:text-primary transition-colors">
                    ↗
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
