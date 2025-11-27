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

import { HomePage } from "./backend/Main/HomePage";
import Dashboard from "./backend/Main/Dashboard";
import HeroPage from "./backend/Main/HeroPage";
import AboutPage from "./backend/Main/AboutPage";
import ServicePage from "./backend/Main/ServicePage";
import ProductPage from "./backend/Main/ProductPage";
import BlogPage from "./backend/Main/BlogPage";
import ContactUsPage from "./backend/Main/ContactUsPage";
import QuotePage from "./backend/Main/QuotePage";
import UsersPage from "./backend/Main/UsersPage"
import UsersDetail from "./backend/Main/[id]/users/page"
import ServiceOdmPage from "./backend/Main/[id]/service/Odmpage"
import ServiceOemPage from "./backend/Main/[id]/service/Oempage"
import ProductImgPage from "./backend/Main/[id]/product/page"
import AddBlog from "./backend/Main/Blog/page"
import { login } from "./server/auth";
import StandardPage from "./backend/Main/StandardPage";
import StandardSet from "./backend/Main/Standard/page";
import StandardSetDetail from "./backend/Main/Standard/detail";
import EditBlog from "./backend/Main/Blog/edit";

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
          <Route path="/gallorys/:id" element={<GalloryDetail />} />
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
            <Route path="home" element={<HomePage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="hero" element={<HeroPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="service" element={<ServicePage />} />
            <Route path="odm/:id" element={<ServiceOdmPage />} />
            <Route path="oem/:id" element={<ServiceOemPage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="product/:id" element={<ProductImgPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="contactus" element={<ContactUsPage />} />
            <Route path="quote" element={<QuotePage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/:id" element={<UsersDetail />} />
            <Route path="blog/add" element={<AddBlog />} />
            <Route path="blog/edit/:id" element={<EditBlog />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="standard" element={<StandardPage />} />

            <Route path="standardset/:id" element={<StandardSet />} />
            <Route path="standardsetdetail/:id/:standard_id" element={<StandardSetDetail />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
