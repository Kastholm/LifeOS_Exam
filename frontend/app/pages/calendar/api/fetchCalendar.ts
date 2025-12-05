import ical from 'node-ical';

export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
    location?: string;
    description?: string;
    source: 'Doing' | 'Birthday' | 'Google' | 'Holidays' | 'Football' | 'MGDK';
    color: string;
}

async function fetchAndParse(url: string, source: 'Doing' | 'Birthday' | 'Google' | 'Holidays' | 'Football' | 'MGDK', color: string): Promise<CalendarEvent[]> {
    try {
        if (!url) return [];
        
        // Hent ICS filen
        const res = await fetch(url, { next: { revalidate: 600 } });
        const text = await res.text();
        
        // Parse ICS data
        const data = await ical.async.parseICS(text);
        
        const events: CalendarEvent[] = [];
        const now = new Date();
        now.setHours(0,0,0,0); 
        
        for (const k in data) {
            const item = data[k];
            
            if (item.type === 'VEVENT') {
                if (item.end && new Date(item.end) < now) {
                    continue;
                }

                events.push({
                    id: item.uid || Math.random().toString(),
                    title: item.summary || 'Ingen titel',
                    start: new Date(item.start),
                    end: new Date(item.end),
                    allDay: item.datetype === 'date',
                    location: item.location,
                    description: item.description,
                    source: source,
                    color: color
                });
            }
        }
        
        return events;
    } catch (e) {
        console.error(`Fejl ved hentning af kalender ${source}:`, e);
        return [];
    }
}

export async function getCalendarEvents() {
    const doingUrl = process.env.TICKTICK_DOING || "";
    const bdayUrl = process.env.TICKTICK_BDAY || "";
    const googleUrl = process.env.GOOGLE_CAL || "";
    const holidaysUrl = process.env.HOLIDAYS || "";
    const footballUrl = process.env.FOOTBALL || "";
    const mgdkUrl = process.env.MGDK || "";
    
    // Hent alle kalendere parallelt
    const [doingEvents, bdayEvents, googleEvents, holidayEvents, footballEvents, mgdkEvents] = await Promise.all([
        fetchAndParse(doingUrl, 'Doing', 'bg-blue-500'),
        fetchAndParse(bdayUrl, 'Birthday', 'bg-rose-500'),
        fetchAndParse(googleUrl, 'Google', 'bg-green-500'),
        fetchAndParse(holidaysUrl, 'Holidays', 'bg-yellow-500'),
        fetchAndParse(footballUrl, 'Football', 'bg-slate-500'),
        fetchAndParse(mgdkUrl, 'MGDK', 'bg-purple-500')
    ]);
    
    // Saml og sorter efter start-dato
    const allEvents = [...doingEvents, ...bdayEvents, ...googleEvents, ...holidayEvents, ...footballEvents, ...mgdkEvents].sort((a, b) => 
        a.start.getTime() - b.start.getTime()
    );
    
    return allEvents;
}
