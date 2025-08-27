import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import MaskGroup from "../imports/MaskGroup-2029-12495";
import {
  Home,
  BarChart3,
  TrendingUp,
  Package,
  Brain,
  Workflow,
  Calculator,
  CreditCard,
  Settings,
  X,
  Menu,
  Sparkles,
  Activity,
  Eye,
  Users,
  ShoppingCart
} from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
  isLoggedIn: boolean;
}

export function Sidebar({
  currentPage,
  onPageChange,
  isMobileMenuOpen,
  onMobileMenuClose,
  isLoggedIn
}: SidebarProps) {
  const menuItems = [
    { id: "home", label: "메인 홈", icon: Home, badge: null },
    { id: "dashboard", label: "대시보드", icon: BarChart3, badge: null },
    { id: "trends", label: "트렌드 분석", icon: TrendingUp, badge: "HOT" },
    { id: "products", label: "상품 탐색", icon: Package, badge: null },
    { id: "ai-analyzer", label: "AI 콘텐츠 분석", icon: Brain, badge: "NEW" },
    { id: "workflow", label: "워크플로우 관리", icon: Workflow, badge: null },
    { id: "calculator", label: "수익 계산기", icon: Calculator, badge: null },
    { id: "settings", label: "설정", icon: Settings, badge: null },
    { id: "pricing", label: "가격", icon: CreditCard, badge: null }
  ];

  // 실시간 알림/활동 데이터 (예시)
  const [notifications] = useState({
    newTrends: 3,
    newProducts: 8,
    aiAlerts: 2,
  });

  const handleMenuClick = (page: string) => {
    onPageChange(page);
    onMobileMenuClose();
  };

  return (
    <>
      {/* 모바일 배경 오버레이 */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onMobileMenuClose}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 overflow-y-auto`}
      >
        {/* 브랜드 헤더 섹션 */}
        <div className="h-16 border-b border-gray-100 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            {/* 로고 */}
            <div className="w-8 h-8 flex-shrink-0">
              <MaskGroup />
            </div>
            
            {/* 브랜드명과 슬로건 */}
            <div>
              <h1 className="text-lg font-bold text-brand-gradient bg-gradient-to-r from-[#ff4d6d] to-[#ff8a3d] bg-clip-text text-transparent">
                Creator-Pulse
              </h1>
              <p className="text-xs text-muted-foreground -mt-1 font-medium">
                YouTube Shopping Analytics
              </p>
            </div>
          </div>
          
          {/* 모바일 닫기 버튼 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileMenuClose}
            className="md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* 로그인 상태 표시 */}
        {isLoggedIn && (
          <div className="p-4 border-b bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">크리에이터님</p>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-xs text-gray-500">온라인</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 실시간 활동 요약 - 로그인 시에만 */}
        {isLoggedIn && (
          <div className="p-4 border-b bg-gray-50">
            <div className="text-xs font-medium text-gray-500 mb-3 flex items-center">
              <Activity className="h-3 w-3 mr-1" />
              오늘의 활동
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-sm font-semibold text-[#ff4d6d]">
                  {notifications.newTrends}
                </div>
                <div className="text-xs text-gray-500">새 트렌드</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-[#ff8a3d]">
                  {notifications.newProducts}
                </div>
                <div className="text-xs text-gray-500">신상품</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-purple-600">
                  {notifications.aiAlerts}
                </div>
                <div className="text-xs text-gray-500">AI 알림</div>
              </div>
            </div>
          </div>
        )}

        {/* 메뉴 아이템 */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = currentPage === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={`w-full justify-start h-12 relative group ${
                  isActive
                    ? "bg-brand-gradient text-white hover:opacity-90"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => handleMenuClick(item.id)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="flex-1 text-left">{item.label}</span>
                
                {/* 배지 표시 */}
                {item.badge && (
                  <Badge
                    variant={item.badge === "HOT" ? "destructive" : "secondary"}
                    className={`text-xs scale-75 ${
                      item.badge === "HOT"
                        ? "bg-red-500 text-white"
                        : item.badge === "NEW"
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                  >
                    {item.badge}
                  </Badge>
                )}
                
                {/* 호버 효과 */}
                {!isActive && (
                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-[#ff4d6d]/10 to-[#ff8a3d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                )}
              </Button>
            );
          })}
        </nav>

        {/* 하단 정보 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">
              실시간 업데이트
            </div>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600">연결됨</span>
            </div>
          </div>
          
          {/* 버전 정보 */}
          <div className="text-center mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-400">Creator-Pulse v2.1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}