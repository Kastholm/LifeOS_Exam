'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function MovieToggle() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function movie_type(type: string) {
        const params = new URLSearchParams(searchParams)
        if(type) {
            params.set('movie_type', type)
        } else {
            params.delete('movie_type', type)
        }
        replace(`${pathname}?${params.toString()}`);
    }

    let type = 'history'

    return (
        <div className='w-full bg-red-200 grid grid-cols-2'>
            <button onClick={() => movie_type('history')}>History</button>
            <button onClick={() => movie_type('watchlist')}>Watchlist</button>
        </div>
    )
}