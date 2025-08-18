import { useState } from "react";
import { Search, FileText, Code, Settings, BookOpen, Zap } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useDocumentSections } from '@/hooks/useDocumentSections';

const navItems = [
  { title: "Getting Started", url: "/", icon: BookOpen },
  { title: "Admin Panel", url: "/admin", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const [searchQuery, setSearchQuery] = useState("");
  const { sections } = useDocumentSections();

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) => 
    isActive(path) 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-80"} transition-all duration-300 border-r border-border bg-card`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-foreground">RoboDocs</h1>
              <p className="text-xs text-muted-foreground">Technical Documentation</p>
            </div>
          )}
          <SidebarTrigger className="ml-auto" />
        </div>

        {/* Search */}
        {!collapsed && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-muted"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${getNavClass(item.url)}`}
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Documentation Sections */}
        {!collapsed && (
          <SidebarGroup className="mt-6">
            <SidebarGroupLabel>Documentation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sections
                  .filter(section => section.published)
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <SidebarMenuItem key={section.id}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={`/docs/${section.id}`}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${getNavClass(`/docs/${section.id}`)}`}
                        >
                          {section.type === 'code' ? (
                            <Code className="w-4 h-4" />
                          ) : (
                            <FileText className="w-4 h-4" />
                          )}
                          <span>{section.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}