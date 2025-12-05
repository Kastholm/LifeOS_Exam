import { getCalendarEvents, CalendarEvent } from "./api/fetchCalendar";

export const revalidate = 6000; 

export default async function CalendarPage() {
    const events = await getCalendarEvents();
    
    // "December 2025"
    const getMonthKey = (date: Date) => {
        const month = date.toLocaleDateString('da-DK', { month: 'long' });
        const year = date.getFullYear();
        const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
        return `${capitalizedMonth} ${year}`;
    };

    // "2025-12-24"
    const getDateKey = (date: Date) => date.toISOString().split('T')[0];

    // "Tirsdag d. 24"
    const formatDayHeader = (date: Date) => {
        const weekday = date.toLocaleDateString('da-DK', { weekday: 'long' });
        const day = date.getDate();
        const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
        return `${capitalizedWeekday} d. ${day}.`;
    };

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString('da-DK', {
            hour: '2-digit',
            minute: '2-digit'
        }).replace('.', ':');
    };

    // Gruppering logic
    const groupedEvents: Record<string, Record<string, CalendarEvent[]>> = {};
    const monthOrder: string[] = [];

    events.forEach(event => {
        const monthKey = getMonthKey(event.start);
        const dateKey = getDateKey(event.start);

        if (!groupedEvents[monthKey]) {
            groupedEvents[monthKey] = {};
            monthOrder.push(monthKey);
        }
        
        if (!groupedEvents[monthKey][dateKey]) {
            groupedEvents[monthKey][dateKey] = [];
        }
        
        groupedEvents[monthKey][dateKey].push(event);
    });

    return (
        <div className="container px-4 py-8 max-w-2xl">
            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-2 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Kalender
                </h1>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">
                    {events.length} begivenheder
                </p>
            </div>

            <div className="space-y-8">
                {monthOrder.map((monthKey) => (
                    <div key={monthKey} className="relative">
                        {/* Måned Header */}
                        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-2 border-b border-border/40 mb-4">
                            <h2 className="text-lg font-bold text-primary">{monthKey}</h2>
                        </div>

                        <div className="space-y-4 pl-4 border-l border-border/20 ml-1.5">
                            {Object.entries(groupedEvents[monthKey]).map(([dateKey, daysEvents]) => {
                                // Datoen fra første event for at formatere headeren
                                const dateObj = daysEvents[0].start;
                                const isToday = getDateKey(new Date()) === dateKey;

                                return (
                                    <div key={dateKey} className="relative">
                                        {/* Tidslinje prik */}
                                        <div className={`absolute -left-[20px] top-1.5 w-2 h-2 rounded-full border-2 ${isToday ? 'bg-primary border-primary' : 'bg-background border-border'}`} />

                                        {/* Dag Header */}
                                        <h3 className={`text-sm font-semibold mb-1.5 ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>
                                            {isToday ? 'I dag • ' : ''}{formatDayHeader(dateObj)}
                                        </h3>

                                        {/* Events Liste */}
                                        <div className="grid gap-0.5">
                                            {daysEvents.map(event => (
                                                <div 
                                                    key={event.id}
                                                    className="flex items-center gap-3 py-1 px-2 -mx-2 rounded-md hover:bg-muted/50 transition-colors group w-full"
                                                >
                                                    {/* Tidspunkt */}
                                                    <div className="w-10 shrink-0 text-[11px] font-mono text-muted-foreground/70">
                                                        {event.allDay ? (
                                                            <span className="tracking-wide">DAG</span>
                                                        ) : (
                                                            <span>{formatTime(event.start)}</span>
                                                        )}
                                                    </div>

                                                    {/* Event Indhold */}
                                                    <div className="flex-1 min-w-0 flex items-center gap-2">
                                                        <div className={`w-1 h-1 rounded-full shrink-0 ${event.color}`} />
                                                        <h4 className="text-sm text-foreground/90 truncate group-hover:text-primary transition-colors">
                                                            {event.title}
                                                        </h4>
                                                        
                                                        {event.location && (
                                                            <span className="text-[10px] text-muted-foreground truncate pl-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                📍 {event.location}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {events.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    <p>Ingen kommende begivenheder fundet.</p>
                </div>
            )}
        </div>
    );
}
