import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import MaskGroup from "../imports/MaskGroup-2029-12495";
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  MessageCircle,
  HelpCircle,
  Zap,
  TrendingUp,
  BarChart3,
  Users,
  ShoppingCart,
  Eye,
  DollarSign
} from "lucide-react";

interface HeaderProps {
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export function Header({
  onMobileMenuToggle,
  isMobileMenuOpen,
  isLoggedIn,
  onLogin,
  onLogout
}: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  // 실시간 알림 데이터 (시뮬레이션)
  const [notifications] = useState([
    {
      id: 1,
      type: "trend",
      title: "새로운 트렌드 감지",
      message: "'겨울 필수템' 키워드가 급상승 중입니다",
      time: "2분 전",
      unread: true,
      icon: TrendingUp,
      color: "text-orange-600"
    },
    {
      id: 2,
      type: "performance",
      title: "성과 알림",
      message: "이번 주 수익이 목표 대비 120% 달성했습니다",
      time: "1시간 전",
      unread: true,
      icon: BarChart3,
      color: "text-green-600"
    },
    {
      id: 3,
      type: "system",
      title: "AI 분석 완료",
      message: "상품 트렌드 분석이 완료되었습니다",
      time: "3시간 전",
      unread: false,
      icon: Zap,
      color: "text-purple-600"
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* 왼쪽: 모바일 메뉴 버튼 + 로고 + 브랜드명 + 슬로건 */}
        <div className="flex items-center gap-3">
          {/* 모바일 메뉴 토글 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileMenuToggle}
            className="md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* 로고와 브랜드명 */}
          <div className="flex items-center gap-3">
            {/* 로고 */}
            <div className="w-12 h-12 flex-shrink-0">
              <MaskGroup />
            </div>
            
            {/* 브랜드명과 슬로건 */}
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-brand-gradient bg-gradient-to-r from-[#ff4d6d] to-[#ff8a3d] bg-clip-text text-transparent">
                Creator-Pulse
              </h1>
              <p className="text-xs text-muted-foreground -mt-1 font-medium">
                YouTube Shopping Analytics
              </p>
            </div>
            
            {/* 모바일에서는 브랜드명만 표시 */}
            <div className="block sm:hidden">
              <h1 className="text-lg font-bold text-brand-gradient bg-gradient-to-r from-[#ff4d6d] to-[#ff8a3d] bg-clip-text text-transparent">
                Creator-Pulse
              </h1>
            </div>
          </div>
        </div>

        {/* 중앙: 검색바 (데스크톱에서만) */}
        <div className="hidden lg:flex flex-1 max-w-lg mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="상품, 트렌드, 키워드 검색..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d6d]/20 focus:border-[#ff4d6d] bg-gray-50/50 transition-colors"
            />
          </div>
        </div>

        {/* 오른쪽: 알림, 사용자 메뉴 */}
        <div className="flex items-center gap-2">
          {/* 실시간 상태 표시 (로그인 시에만) */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center gap-4 mr-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-700 font-medium">실시간 업데이트</span>
              </div>
              
              {/* 간단한 통계 표시 */}
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-green-600 font-medium">
                  <DollarSign className="h-3 w-3" />
                  <span>+18.7%</span>
                </div>
                <div className="flex items-center gap-1 text-blue-600 font-medium">
                  <Eye className="h-3 w-3" />
                  <span>2.4M</span>
                </div>
              </div>
            </div>
          )}

          {/* 알림 버튼 (로그인 시에만) */}
          {isLoggedIn && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-gray-100"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs border-2 border-white bg-[#ff4d6d] text-white"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </div>
          )}

          {/* 도움말 버튼 */}
          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* 사용자 메뉴 또는 로그인 버튼 */}
          {isLoggedIn ? (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#ff4d6d] to-[#ff8a3d] rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="hidden md:block font-medium">크리에이터</span>
              </Button>

              {/* 사용자 드롭다운 메뉴 */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-medium">크리에이터님</p>
                    <p className="text-sm text-muted-foreground">creator@example.com</p>
                  </div>
                  
                  <div className="py-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start px-4 hover:bg-gray-50">
                      <User className="h-4 w-4 mr-3" />
                      프로필 설정
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start px-4 hover:bg-gray-50">
                      <Settings className="h-4 w-4 mr-3" />
                      환경 설정
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start px-4 hover:bg-gray-50">
                      <MessageCircle className="h-4 w-4 mr-3" />
                      고객 지원
                    </Button>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start px-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={onLogout}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      로그아웃
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button 
              onClick={onLogin}
              className="bg-gradient-to-r from-[#ff4d6d] to-[#ff8a3d] hover:opacity-90 text-white font-medium"
            >
              로그인
            </Button>
          )}
        </div>
      </div>

      {/* 모바일 검색바 */}
      <div className="lg:hidden border-t border-gray-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="상품, 트렌드, 키워드 검색..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d6d]/20 focus:border-[#ff4d6d] bg-gray-50/50 transition-colors"
          />
        </div>
      </div>

      {/* 배경 오버레이 (드롭다운이 열렸을 때) */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
}