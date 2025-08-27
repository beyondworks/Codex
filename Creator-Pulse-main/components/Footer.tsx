import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ArrowUp
} from "lucide-react";

interface FooterProps {
  onPageChange?: (page: string) => void;
}

export function Footer({ onPageChange }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    product: [
      { label: "메인 홈", href: "home" },
      { label: "대시보드", href: "dashboard" },
      { label: "트렌드 분석", href: "trends" },
      { label: "상품 탐색", href: "products" },
      { label: "AI 콘텐츠 분석", href: "ai-analyzer" },
      { label: "수익 계산기", href: "calculator" }
    ],
    support: [
      { label: "고객지원", href: "#" },
      { label: "문의하기", href: "#" },
      { label: "도움말", href: "#" },
      { label: "튜토리얼", href: "#" },
      { label: "API 문서", href: "#" },
      { label: "상태 페이지", href: "#" }
    ],
    company: [
      { label: "회사 소개", href: "#" },
      { label: "채용", href: "#" },
      { label: "블로그", href: "#" },
      { label: "파트너십", href: "#" },
      { label: "투자자 정보", href: "#" },
      { label: "언론 보도", href: "#" }
    ],
    legal: [
      { label: "이용약관", href: "#" },
      { label: "개인정보처리방침", href: "#" },
      { label: "쿠키 정책", href: "#" },
      { label: "보안 정책", href: "#" },
      { label: "GDPR", href: "#" },
      { label: "규정 준수", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 메인 푸터 콘텐츠 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* 브랜드 섹션 */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-gradient rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-gradient">Creator-Pulse</h3>
                <p className="text-sm text-muted-foreground">쇼핑 콘텐츠 분석의 혁신</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              AI 기반 분석으로 YouTube 쇼핑 콘텐츠의 성공을 도우며, 
              데이터 기반의 스마트한 전략을 제공하는 크리에이터 전용 플랫폼입니다.
            </p>

            {/* 연락처 정보 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@creator-pulse.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>02-1234-5678</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>서울특별시 강남구 테헤란로</span>
              </div>
            </div>
          </div>

          {/* 제품 링크 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">제품</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-gray-900"
                    onClick={() => onPageChange?.(link.href)}
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* 지원 링크 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">지원</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-gray-900"
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* 회사 링크 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">회사</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-gray-900"
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* 법적 정보 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">법적 정보</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-gray-900"
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* 하단 정보 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Creator-Pulse. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">사업자등록번호: 123-45-67890</span>
              <span className="text-sm text-muted-foreground">통신판매업신고: 제2024-서울강남-1234호</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* 소셜 미디어 링크 */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-gray-900 hover:bg-gray-100"
                >
                  <social.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>

            {/* 맨 위로 버튼 */}
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="flex items-center gap-2"
            >
              <ArrowUp className="h-4 w-4" />
              <span className="hidden sm:inline">맨 위로</span>
            </Button>
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div>
              <p className="mb-2">
                <strong>Creator-Pulse</strong>는 YouTube 쇼핑 콘텐츠 크리에이터를 위한 전문 분석 도구입니다.
              </p>
              <p>
                대표자: 홍길동 | 주소: 서울특별시 강남구 테헤란로 123, 45층
              </p>
            </div>
            <div className="md:text-right">
              <p className="mb-2">
                고객센터: 평일 09:00-18:00 (토/일/공휴일 휴무)
              </p>
              <p>
                이메일 문의: 24시간 접수 가능 (1영업일 내 답변)
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}