import Link from "next/link";
import { MonthModel } from "../model/month";
import { Calendar, Info } from "lucide-react";

function getMonthName(month: number) {
    const months = [
        "Januar", "Februar", "Marts", "April", "Maj", "Juni",
        "Juli", "August", "September", "Oktober", "November", "December"
    ]
    return months[month - 1]
}

// Billeder til hver måned/sæson - skal erstattes med rigtige src's
const SEASON_IMAGES: Record<string, string> = {
    // Vinter (Dec, Jan, Feb)
    "12": "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=800&auto=format&fit=crop",
    "1": "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=800&auto=format&fit=crop",
    "2": "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=800&auto=format&fit=crop",
    
    // Forår (Mar, Apr, Maj)
    "3": "https://plus.unsplash.com/premium_photo-1674917000586-b7564f21540e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFyY2h8ZW58MHx8MHx8fDA%3D",
    "4": "https://plus.unsplash.com/premium_photo-1673799490772-2ea0b711e43b?q=80&w=1322&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "5": "https://plus.unsplash.com/premium_photo-1673799490772-2ea0b711e43b?q=80&w=1322&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    // Sommer (Jun, Jul, Aug)
    "6": "https://plus.unsplash.com/premium_photo-1669750817438-3f7f3112de8d?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "7": "https://plus.unsplash.com/premium_photo-1669750817438-3f7f3112de8d?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "8": "https://plus.unsplash.com/premium_photo-1669750817438-3f7f3112de8d?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    // Efterår (Sep, Okt, Nov)
    "9": "https://plus.unsplash.com/premium_photo-1665772801153-7fb1e433d0e5?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "10": "https://images.unsplash.com/photo-1429198739803-7db875882052?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "11": "https://images.unsplash.com/photo-1429198739803-7db875882052?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}

export default function AllMonths(props: { months: MonthModel[] }) {
    const { months } = props
    
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Alle Måneder</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {months.map((month) => {
                    const monthNum = parseInt(month.month);
                    const imageSrc = SEASON_IMAGES[monthNum.toString()] || SEASON_IMAGES["1"];
                    
                    return (
                        <div
                            key={month._id}
                            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl bg-card"
                            style={{ aspectRatio: '2/3' }}
                        >
                            <img 
                                src={imageSrc}
                                alt={`Month ${month.month}`}
                                className="absolute inset-0 w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-linear-to-b via-background/20 to-black" />

                            <div className="relative z-10 flex flex-1 flex-col justify-end p-4 text-foreground">
                                <div className="flex items-center justify-between mb-auto pb-3">
                                    {month.year && (
                                        <span className="rounded-full border border-white/20 bg-background/80 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] font-semibold text-foreground shadow-lg">
                                            {month.year}
                                        </span>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <h2 className="text-xl font-bold leading-tight tracking-tight text-white drop-shadow-lg mb-2 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                                        {getMonthName(monthNum)}
                                    </h2>
                                </div>

                                <div className="flex items-center justify-end">
                                    <Link 
                                        href={`/pages/sanity/structure/maanedsbog;${month._id}`}
                                        className="flex items-center justify-center w-9 h-9 mr-2 rounded-lg bg-background/90 backdrop-blur-sm border border-white/20 hover:bg-background hover:scale-110 transition-all duration-200 group/link shadow-lg"
                                        title="Se på Sanity"
                                    >
                                        <img 
                                            src="https://upload.wikimedia.org/wikipedia/commons/9/95/Sanity-square-logo.png" 
                                            alt="Sanity logo" 
                                            className="w-4 h-4 object-contain"
                                        />
                                    </Link>
                                    <Link 
                                        href={`/pages/monthbook/${month._id}`}
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
                    )
                })}
            </div>
        </div>
    )
}
