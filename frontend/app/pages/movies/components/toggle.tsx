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
        <div className="flex justify-center mb-8">
            <div className='inline-flex h-12 items-center justify-center rounded-full bg-muted/50 p-1.5 text-muted-foreground border border-border/40'>
                <button 
                    onClick={() => setMovieType('history')}
                    className={cn(
                        "inline-flex min-w-[120px] items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                        currentType === 'history' 
                            ? "bg-background text-primary shadow-sm font-semibold scale-105" 
                            : "hover:bg-background/50 hover:text-foreground"
                    )}
                >
                    History
                </button>
                <button 
                    onClick={() => setMovieType('watchlist')}
                    className={cn(
                        "inline-flex min-w-[120px] items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                        currentType === 'watchlist' 
                            ? "bg-background text-primary shadow-sm font-semibold scale-105" 
                            : "hover:bg-background/50 hover:text-foreground"
                    )}
                >
                    Watchlist
                </button>
            </div>
        </div>
    )
}