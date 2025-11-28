import { Newspaper, Book, Film, Music, Utensils, NotebookPen } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/global/shadcn/components/ui/sidebar"
import ChuckNorris from "../../components/chuck_norris_jokes"

// Menu items.
const items = [
  {
    title: "News 1",
    url: "/pages/news",
    icon: Newspaper,
  },
  {
    title: "Books 1",
    url: "/pages/books",
    icon: Book,
  },
  {
    title: "Movies 1",
    url: "/pages/movies",
    icon: Film,
  },
  {
    title: "Music 1",
    url: "/pages/music",
    icon: Music,
  },
  {
    title: "Food",
    url: "/pages/food",
    icon: Utensils,
  },
  {
    title: "MonthBook",
    url: "#",
    icon: NotebookPen,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>LifeOS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <ChuckNorris />
    </Sidebar>
  )
}