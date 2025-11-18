import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Blogs from "./components/Blogs";
import BlogDetail from "./components/[id]/blogs/page";
import GalloryDetail from "./components/[id]/gallory/page";
import GalloryDetailID from "./components/[id]/gallory/detail";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";

import LoginPage from "./backend/Page";
import BackendLayout from "./backend/base/Page";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./backend/Main/Dashboard";
import HeroPage from "./backend/Main/HeroPage";
import AboutPage from "./backend/Main/AboutPage";
import ServicePage from "./backend/Main/ServicePage";
import ProductPage from "./backend/Main/ProductPage";
import BlogPage from "./backend/Main/BlogPage";
import ContactUsPage from "./backend/Main/ContactUsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/gallorys/:id" element={<GalloryDetail /> } />
          <Route path="/gallorydetail/:postId/:imgId" element={<GalloryDetailID />} />
          <Route path="/admin" element={<LoginPage />} />

        
          

          {/* Protected routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <BackendLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="hero" element={<HeroPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="service" element={<ServicePage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="contactus" element={<ContactUsPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
