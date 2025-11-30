import Link from "next/link";
import Image from "next/image";
import { MonthModel } from "../model/month";
function getMonthName(month: number) {
    const months = [
        "Januar",
        "Februar",
        "Marts",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "December"
    ]
    return months[month - 1]
}

export default function AllMonths(props: { months: MonthModel[] }) {
    const { months } = props
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Alle Måneder</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {months.map((month) => (
                    <Link 
                        key={month._id} 
                        href={`/pages/monthbook/${month._id}`}
                        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg"
                    >
                        <div className="h-0.5 w-full bg-linear-to-r from-primary/70 via-primary to-primary/60 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                        
                        <div className="flex flex-1 flex-col gap-3 px-6 pb-6 pt-5 text-foreground">
                            <h2 className="text-xl font-bold leading-tight tracking-tight transition-colors duration-300 group-hover:text-primary">
                                {month.month} - {getMonthName(parseInt(month.month))}
                            </h2>
                            {month.year && (
                                <span className="text-sm text-muted-foreground/70">
                                    {month.year}
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}