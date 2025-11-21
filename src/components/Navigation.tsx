import { useTheme } from "next-themes";
import { Link, useLocation } from "react-router-dom";
import { getRoutesByCategory } from "../config/routes";
import { Label } from "./ui/label";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const Navigation = () => {
  const location = useLocation();
  const routesByCategory = getRoutesByCategory();
  const { setTheme, theme } = useTheme();

  return (
    <Sidebar>
      <SidebarHeader className="space-y-2 p-4">
        <h1 className="text-2xl font-semibold text-sidebar-foreground">
          React State Management
        </h1>
        <p className="text-sm text-muted-foreground">Examples & Patterns</p>
      </SidebarHeader>
      <SidebarContent>
        {routesByCategory.map(({ category, routes }) => (
          <SidebarGroup key={category}>
            <SidebarGroupLabel>{category}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {routes.map((route) => (
                  <SidebarMenuItem key={route.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === route.path}
                    >
                      <Link to={route.path}>{route.label}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2 p-4">
        <Label htmlFor="theme-select">Theme</Label>
        <NativeSelect
          id="theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full"
        >
          <NativeSelectOption value="light">Light</NativeSelectOption>
          <NativeSelectOption value="dark">Dark</NativeSelectOption>
          <NativeSelectOption value="system">System</NativeSelectOption>
        </NativeSelect>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Navigation;
