import Image from "next/image";
import Link from "next/link";

import { ArticleModel } from "../models/ArticleModel";

export default function Articles({ post }: { post: ArticleModel }) {
    const description = post.content?.rendered
        ? post.content.rendered.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
        : "";

    const preview = description.length > 160 ? `${description.slice(0, 160)}…` : description;

    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg">
            <div className="h-0.5 w-full bg-linear-to-r from-primary/70 via-primary to-primary/60 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative mx-4 mt-4 rounded-xl border border-border/40 bg-card/80 shadow-sm ring-1 ring-white/5 backdrop-blur">
                <Image
                    alt={post.title.rendered ?? "Article thumbnail"}
                    width={480}
                    height={360}
                    src={post.image_url}
                    className="h-40 w-full rounded-xl object-cover transition duration-700 ease-out group-hover:scale-105"
                    priority
                />
            </div>
            <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-5 text-foreground">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80">
                    <span className="rounded-full border border-border/40 px-2.5 py-1 font-medium">Featured</span>
                    <span className="font-medium text-muted-foreground/70">AutoPress</span>
                </div>
                <div className="space-y-3">
                    <h1 className="text-lg font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary">
                        {post.title["rendered"]}
                    </h1>
                    {preview && (
                        <p className="text-sm leading-relaxed text-muted-foreground/90 line-clamp-2">
                            {preview}
                        </p>
                    )}
                </div>
                <div className="mt-auto flex items-center justify-between">
                    <Link
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-2 text-sm font-medium text-foreground/90 transition-colors duration-300 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                    >
                        Læs artiklen
                        <span aria-hidden className="text-lg leading-none">
                            ↗
                        </span>
                    </Link>
                    <div className="h-7 w-7 shrink-0 rounded-full border border-border/60 bg-card/70 shadow-inner transition duration-300 group-hover:border-primary/60 group-hover:bg-primary/10" />
                </div>
            </div>
        </article>
    );
}