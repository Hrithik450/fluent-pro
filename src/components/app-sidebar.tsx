"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconHelp,
  IconInnerShadowTop,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconSchool,
  IconChalkboardTeacher,
  IconBooks,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "fluentpro",
    email: "fluentpro@example.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/a/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Students",
      url: "/a/students",
      icon: IconUsers,
    },
    {
      title: "Staffs",
      url: "/a/staffs",
      icon: IconChalkboardTeacher,
    },
    {
      title: "Schools",
      url: "/a/schools",
      icon: IconSchool,
    },
    {
      title: "System",
      url: "/a/system",
      icon: IconChartBar,
    },
    {
      title: "Resources",
      url: "/a/resources",
      icon: IconBooks,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Library",
      url: "/a/library",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "/a/reports",
      icon: IconReport,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Fluent Pro</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
