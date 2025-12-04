import { fetchMusic } from "./api/fetchMusic";
import { Music as MusicIcon, Info } from "lucide-react";
import Link from "next/link";

export const revalidate = 3600; // 1 hour

export default async function Music() {
  const data = await fetchMusic();
  const items = data.items || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item: any, index: number) => {
          const snippet = item.snippet;
          const videoId = snippet.resourceId?.videoId;
          const thumbnail = snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url;
          const publishedAt = snippet.publishedAt ? new Date(snippet.publishedAt).toLocaleDateString('da-DK', {
            year: 'numeric',
            month: 'short'
          }) : null;

          return (
            <div
              key={item.id || index}
              className="group relative flex h-[380px] w-full flex-col overflow-hidden rounded-2xl border border-border/60 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl bg-card"
              style={{ aspectRatio: '2/3' }}
            >
              {thumbnail ? (
                <>
                  <img 
                    src={thumbnail}
                    alt={snippet.title ?? "Music thumbnail"}
                    className="absolute inset-0 w-full h-[500px] mt-[-65px] object-cover transition duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/20 to-black" />
                </>
              ) : (
                <div className="absolute inset-0 bg-muted/30 flex items-center justify-center">
                  <MusicIcon className="w-16 h-16 text-muted-foreground/40 group-hover:text-primary/60 transition-colors duration-300" />
                </div>
              )}

              <div className="relative z-10 flex flex-1 flex-col justify-end p-4 text-foreground">
                <div className="flex items-center justify-between mb-auto pb-3">
                  <span className="rounded-full border border-white/20 bg-background/80 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] font-semibold text-foreground shadow-lg">
                    #{index + 1}
                  </span>
                  {publishedAt && (
                    <span className="rounded-full border border-white/20 bg-background/80 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] font-semibold text-foreground shadow-lg">
                      {publishedAt}
                    </span>
                  )}
                </div>

                <div className="mb-3">
                  <h2 className="text-xl font-bold leading-tight tracking-tight text-white drop-shadow-lg mb-2 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                    {snippet.title}
                  </h2>
                  {snippet.channelTitle && (
                    <p className="text-xs text-white/80 drop-shadow-md">
                      {snippet.channelTitle}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end">
                  <Link 
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-9 px-3.5 rounded-lg bg-white/90 backdrop-blur-md border border-white/40 hover:bg-white/30 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl group/button"
                  >
                    <span className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5 tracking-wide">
                      <Info className="w-3.5 h-3.5" />
                      Info
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
