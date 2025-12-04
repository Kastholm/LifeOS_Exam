'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from "@/app/global/shadcn/lib/utils";

export default function MovieToggle() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    
    const currentType = searchParams.get('movie_type') || 'watchlist';

    function setMovieType(type: string) {
        const params = new URLSearchParams(searchParams)
        if(type) {
            params.set('movie_type', type)
        } else {
            params.delete('movie_type')
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="shrink-0">
            <div className='inline-flex h-14 items-center justify-center rounded-full bg-card border border-border/60 p-1.5 text-muted-foreground shadow-lg'>
                <button 
                    onClick={() => setMovieType('history')}
                    className={cn(
                        "inline-flex min-w-[140px] cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-8 py-3 text-base font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                        currentType === 'history' 
                            ? "bg-primary text-primary-foreground shadow-md scale-[1.02]" 
                            : "hover:bg-muted/50 hover:text-foreground"
                    )}
                >
                    History
                </button>
                <button 
                    onClick={() => setMovieType('watchlist')}
                    className={cn(
                        "inline-flex min-w-[140px]  cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-8 py-3 text-base font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                        currentType === 'watchlist' 
                            ? "bg-primary text-primary-foreground shadow-md scale-[1.02]" 
                            : "hover:bg-muted/50 hover:text-foreground"
                    )}
                >
                    Watchlist
                </button>
            </div>
        </div>
    )
}