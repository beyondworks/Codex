import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase/client";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { DashboardPage } from "./components/DashboardPage";
import { ProductsPage } from "./components/ProductsPage";
import { CalculatorPage } from "./components/CalculatorPage";
import { PricingPage } from "./components/PricingPage";
import { TrendAnalysisPage } from "./components/TrendAnalysisPage";
import { AIContentAnalyzer } from "./components/AIContentAnalyzer";
import { StrategyWorkflowPage } from "./components/StrategyWorkflowPage";
import { ProductContentAnalysisPage } from "./components/ProductContentAnalysisPage";
import { SettingsPage } from "./components/SettingsPage";
import { LoginPage } from "./components/LoginPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // 전역 필터 상태 관리
  const [dashboardFilters, setDashboardFilters] = useState({
    selectedDateRange: "month",
    selectedCategories: [] as string[],
    selectedMetrics: ["revenue", "views"] as string[],
    hasUserInteracted: false
  });

  const [productsFilters, setProductsFilters] = useState({
    selectedPriceRange: "all",
    selectedDifficulty: [] as string[],
    selectedTrends: [] as string[],
    selectedCommission: "all",
    hasUserInteracted: false
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    supabase.auth.signOut();
    setIsLoggedIn(false);
  };

  const handleLoginClick = () => {
    setCurrentPage("login");
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setIsLoggedIn(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsLoggedIn(!!session);
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  const handleContentAnalysis = (product: any) => {
    setSelectedProduct(product);
    setCurrentPage("content-analysis");
  };

  const renderPage = () => {
    if (currentPage === "login") {
      return (
        <LoginPage 
          onBack={() => setCurrentPage("home")}
          onLogin={handleLogin}
        />
      );
    }

    switch (currentPage) {
      case "home":
        return (
          <HomePage 
            isLoggedIn={isLoggedIn}
            onLoginClick={handleLoginClick}
            onPageChange={setCurrentPage}
          />
        );

      case "dashboard":
        return <DashboardPage 
          filters={dashboardFilters}
          onFiltersChange={setDashboardFilters}
        />;

      case "products":
        return <ProductsPage 
          filters={productsFilters}
          onFiltersChange={setProductsFilters}
          onPageChange={setCurrentPage}
        />;

      case "calculator":
        return <CalculatorPage />;

      case "pricing":
        return <PricingPage onLoginClick={handleLoginClick} />;

      case "trends":
        return <TrendAnalysisPage onPageChange={setCurrentPage} onContentAnalysis={handleContentAnalysis} />;

      case "ai-analyzer":
        return <AIContentAnalyzer />;

      case "workflow":
        return <StrategyWorkflowPage onContentAnalysis={handleContentAnalysis} />;

      case "content-analysis":
        return <ProductContentAnalysisPage 
          product={selectedProduct}
          onBack={() => setCurrentPage("workflow")}
        />;

      case "settings":
        return <SettingsPage />;

      default:
        return null;
    }
  };

  // 로그인 페이지는 다른 레이아웃
  if (currentPage === "login") {
    return <div className="min-h-screen">{renderPage()}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        isLoggedIn={isLoggedIn}
        onLogin={handleLoginClick}
        onLogout={handleLogout}
      />
      <div className="flex">
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={() => setIsMobileMenuOpen(false)}
          isLoggedIn={isLoggedIn}
        />
        <main className="flex-1 ml-0 md:ml-64 pt-20 md:pt-24 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
          <Footer onPageChange={setCurrentPage} />
        </main>
      </div>
    </div>
  );
}