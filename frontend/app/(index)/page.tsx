import Link from "next/link";
import { 
  Newspaper, 
  Book, 
  Film, 
  Music, 
  Utensils, 
  NotebookPen, 
  Info,
  ArrowRight
} from "lucide-react";

export default async function Home() {

  const sections = [
    {
      title: "News",
      description: "Hold dig opdateret med de seneste nyheder fra forskellige kilder.",
      url: "/pages/news",
      icon: Newspaper,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
      title: "Books",
      description: "Min bogsamling og læsestatus. Se hvad jeg har læst.",
      url: "/pages/books",
      icon: Book,
      color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
    },
    {
      title: "Movies",
      description: "Oversigt over film jeg har set og gerne vil se.",
      url: "/pages/movies",
      icon: Film,
      color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
    },
    {
      title: "Music",
      description: "Mine playlister og favoritsange fra YouTube.",
      url: "/pages/music",
      icon: Music,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    },
    {
      title: "Food",
      description: "Lækre opskrifter og madinspiration fra vores ugeindkøb.",
      url: "/pages/food",
      icon: Utensils,
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
    },
    {
      title: "MonthBook",
      description: "Min månedlige månedsbog og refleksioner.",
      url: "/pages/monthbook",
      icon: NotebookPen,
      color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          LifeOS Dashboard
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Et operativ system for mit liv. 
        </p>
      </div>

      {/* Infobox Section (Requirement) */}
      <div className="mb-12 bg-card border border-border/60 rounded-2xl p-6 shadow-sm flex items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
          <Info className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Essential Information</h2>
          <p className="text-muted-foreground leading-relaxed">
            LifeOS integrerer data fra flere kilder for at give et holistisk overblik over mit liv.
            Her findes integrationer om min musikhistorik, filmhistorik, boghistorik, madlavningshistorik, månedsbog om mit liv mm.
          </p>
        </div>
      </div>

      {/* Navigation Grid (Requirement) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {sections.map((section) => (
          <Link 
            key={section.title} 
            href={section.url}
            className="group relative flex flex-col bg-card border border-border/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${section.color}`}>
                <section.icon className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
            </div>
            
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {section.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
              {section.description}
            </p>
            
            <div className="h-1 w-0 bg-primary/20 rounded-full group-hover:w-full transition-all duration-500" />
          </Link>
        ))}
      </div>

      {/* Dash App Integration */}
      <div className="bg-card border border-border/60 rounded-2xl p-1 shadow-sm overflow-hidden min-h-[500px]">
         <div className="bg-muted/30 p-4 border-b border-border/40">
            <h2 className="font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Data Analytics Dashboard
            </h2>
         </div>
         <iframe 
            className="w-full h-[600px] border-none bg-white" 
            src="http://127.0.0.1:8050/"
            title="Dash Analytics"
         />
      </div>

    </div>
  );
}
