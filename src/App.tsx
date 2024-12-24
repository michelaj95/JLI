import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate, ScrollRestoration } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Lesson from "./pages/Lesson";
import Lessons from "./pages/Lessons";
import Engagement from "./pages/Engagement";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import StudyMaterials from "./pages/StudyMaterials";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/register",
      element: isAuthenticated ? <Navigate to="/" /> : <Register />,
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/lesson/:id",
      element: isAuthenticated ? <Lesson /> : <Navigate to="/login" />,
    },
    {
      path: "/lessons",
      element: isAuthenticated ? <Lessons /> : <Navigate to="/login" />,
    },
    {
      path: "/engagement",
      element: isAuthenticated ? <Engagement /> : <Navigate to="/login" />,
    },
    {
      path: "/resources",
      element: isAuthenticated ? <Resources /> : <Navigate to="/login" />,
    },
    {
      path: "/profile",
      element: isAuthenticated ? <Profile /> : <Navigate to="/login" />,
    },
    {
      path: "/study-materials",
      element: isAuthenticated ? <StudyMaterials /> : <Navigate to="/login" />,
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;