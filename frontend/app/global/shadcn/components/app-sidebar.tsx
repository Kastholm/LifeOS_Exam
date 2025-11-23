import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

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
    title: "News",
    url: "/pages/news",
    icon: Home,
  },
  {
    title: "Books",
    url: "/pages/books",
    icon: Inbox,
  },
  {
    title: "Movies",
    url: "/pages/movies",
    icon: Calendar,
  },
  {
    title: "Music",
    url: "/pages/music",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
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