"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingCart,
  Wallet,
  ChefHat,
  Repeat2,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/",
    label: "Overview",
    icon: LayoutDashboard,
    badge: undefined,
  },
  {
    href: "/meals",
    label: "Meal Plan",
    icon: UtensilsCrossed,
    badge: "7",
  },
  {
    href: "/grocery",
    label: "Grocery List",
    icon: ShoppingCart,
    badge: "5",
  },
  {
    href: "/budget",
    label: "Budget",
    icon: Wallet,
    badge: undefined,
  },
  {
    href: "/cooking",
    label: "Cooking Tasks",
    icon: ChefHat,
    badge: "2",
  },
  {
    href: "/substitutions",
    label: "Substitutions",
    icon: Repeat2,
    badge: undefined,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r bg-sidebar-background">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2.5 px-6 border-b shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-foreground tracking-tight">
              MealMind
            </p>
            <p className="text-[10px] text-muted-foreground">Smart Planning</p>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="px-3 space-y-1" aria-label="Main navigation">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Dashboard
            </p>
            {navItems.map(({ href, label, icon: Icon, badge }) => {
              const isActive = pathname === href;
              return (
                <Tooltip key={href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 truncate">{label}</span>
                      {badge && (
                        <Badge
                          variant={isActive ? "secondary" : "outline"}
                          className="text-[10px] px-1.5 py-0 h-4 min-w-[1rem] justify-center"
                        >
                          {badge}
                        </Badge>
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t">
          <Separator className="mb-4" />
          <div className="flex items-center gap-3 rounded-lg px-2 py-1.5">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center text-xs font-bold text-white shrink-0">
              PK
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate">Pavandeep K.</p>
              <p className="text-[10px] text-muted-foreground truncate">
                Premium Plan
              </p>
            </div>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
