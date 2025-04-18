"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  History,
  Home,
  Medal,
  Settings,
  Star,
  TrendingUp,
  Users,
  BookText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DashboardNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardNav({ className, ...props }: DashboardNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Question Papers",
      href: "/dashboard/papers",
      icon: FileText,
    },
    {
      title: "Previous Years",
      href: "/dashboard/previous-years",
      icon: History,
    },
    {
      title: "Predicted Papers",
      href: "/dashboard/predicted-papers",
      icon: TrendingUp,
    },
    {
      title: "Notes",
      href: "/dashboard/notes",
      icon: BookText,
    },
    {
      title: "Practice",
      href: "/dashboard/practice",
      icon: BookOpen,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Leaderboard",
      href: "/dashboard/leaderboard",
      icon: Users,
    },
    {
      title: "Bookmarks",
      href: "/dashboard/bookmarks",
      icon: Star,
    },
    {
      title: "Streaks",
      href: "/dashboard/streaks",
      icon: Medal,
    },
    {
      title: "Timer History",
      href: "/dashboard/timer-history",
      icon: Clock,
    },
    {
      title: "Study Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className={cn("flex flex-col gap-2", className)} {...props} aria-label="Dashboard navigation">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "secondary" : "ghost"}
          className={cn("justify-start", pathname === item.href && "bg-secondary")}
          asChild
        >
          <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
            <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
