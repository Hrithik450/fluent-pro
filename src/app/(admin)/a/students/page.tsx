import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Shell } from "@/components/shell/shell";
import React from "react";
import { StudentsTable } from "@/components/admin/table/students/students-table";
import { DataTableSkelton } from "@/components/data-table/data-table-skeleton";
import { SearchParams } from "@/lib/data-table/types";
import { UsersService } from "@/actions/users/users.service";
import { studentSearchParamCache } from "@/actions/users/users.types";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-admin-sidebar";
import { SiteHeader } from "@/components/site-header";

interface IndexPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function IndexPage(props: IndexPageProps) {
  const session = await auth();
  if (!session?.user) {
    return redirect("/signin");
  }

  if (session && session.user.role !== "superAdmin") {
    return redirect("/");
  }

  const searchParams = await props.searchParams;
  const search = studentSearchParamCache.parse(searchParams);
  const promises = Promise.all([
    UsersService.getUsers({
      ...search,
    }),
  ]);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="p-2 sm:p-4">
                <Shell className="gap-2">
                  <React.Suspense
                    fallback={
                      <DataTableSkelton
                        columnCount={6}
                        cellWidths={[
                          "10rem",
                          "40rem",
                          "12rem",
                          "12rem",
                          "8rem",
                          "8rem",
                        ]}
                        shrinkZero
                      />
                    }
                  >
                    <StudentsTable promises={promises} />
                  </React.Suspense>
                </Shell>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
