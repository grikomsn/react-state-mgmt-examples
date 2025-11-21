import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "./components/ui/sidebar";
import Navigation from "./components/Navigation";
import { routes } from "./config/routes";

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Navigation />
        <SidebarInset className="p-8">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </SidebarInset>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
