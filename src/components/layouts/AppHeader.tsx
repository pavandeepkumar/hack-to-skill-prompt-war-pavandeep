"use client";

import { Bell } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const notifications = [
  {
    id: "n1",
    title: "Grocery list updated",
    description: "5 items remaining to purchase",
    time: "2m ago",
  },
  {
    id: "n2",
    title: "Cooking task due soon",
    description: "Marinate salmon in 1 hour",
    time: "15m ago",
  },
  {
    id: "n3",
    title: "Budget alert",
    description: "Proteins category at 70% of budget",
    time: "1h ago",
  },
];

interface AppHeaderProps {
  title?: string;
}

export function AppHeader({ title }: AppHeaderProps) {
  return (
    <TooltipProvider>
      <header className="hidden lg:flex h-16 items-center justify-between border-b bg-background px-6 shrink-0">
        {/* Left: Title */}
        <div className="flex items-center gap-3">
          {title && (
            <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {/* Notifications */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9"
                aria-label="View notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="w-80 p-0">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <p className="text-sm font-semibold">Notifications</p>
                <Badge variant="secondary" className="text-xs">
                  {notifications.length} new
                </Badge>
              </div>
              <div className="divide-y">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5 min-w-0">
                        <p className="text-xs font-medium truncate">{n.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {n.description}
                        </p>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0">
                        {n.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t">
                <Button variant="ghost" className="w-full text-xs h-8">
                  View all notifications
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Avatar */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
                aria-label="User profile"
              >
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-purple-400 text-primary-foreground text-[10px] font-bold">
                    PK
                  </AvatarFallback>
                </Avatar>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Pavandeep K. — Premium</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </header>
    </TooltipProvider>
  );
}
