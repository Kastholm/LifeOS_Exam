'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { Loader2 } from "lucide-react";

export default function MovieScroll() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    // Hent nuværende limit (default 50)
    const currentLimit = Number(searchParams.get('movie_limit') || '50');
    
    // State til at forhindre spam-kald (debounce/loading lock)
    const [isUpdating, setIsUpdating] = useState(false);

    const handleScroll = useCallback(() => {
        // Hvis vi allerede opdaterer, gør intet
        if (isUpdating) return;

        // Tjek om vi er nær bunden (f.eks. 200px før)
        const scrolledToBottom = 
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

        if (scrolledToBottom) {
            setIsUpdating(true); 
            
            // Beregn ny limit (+50)
            const newLimit = currentLimit + 50;
            
            // Opdater URL
            const params = new URLSearchParams(searchParams);
            params.set('movie_limit', newLimit.toString());
            
            // Brug { scroll: false } så siden ikke hopper til toppen
            replace(`${pathname}?${params.toString()}`, { scroll: false });
            
            // Lille timeout for at lade UI opdatere før vi tillader ny scroll
            setTimeout(() => {
                setIsUpdating(false);
            }, 1000); 
        }
    }, [currentLimit, isUpdating, pathname, replace, searchParams]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        
        // Cleanup function (fjerner listener når komponenten unmountes)
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Vis animation når vi loader
    if (!isUpdating) return null;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-background/80 backdrop-blur-md border border-border/50 text-foreground px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-sm font-medium tracking-wide">Henter flere film...</span>
            </div>
        </div>
    ); 
}