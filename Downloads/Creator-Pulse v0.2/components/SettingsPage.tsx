import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import {
  Settings,
  Key,
  Link,
  Shield,
  Bell,
  Palette,
  Database,
  Cloud,
  Smartphone,
  CheckCircle,
  AlertCircle,
  XCircle,
  ExternalLink,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  Calendar,
  FileSpreadsheet,
  Youtube,
  Instagram,
  Zap,
  Globe,
  Lock,
  Unlock,
  Info,
  BookOpen,
  HelpCircle,
  Activity,
  BarChart3,
  MessageSquare,
  Users,
  Mail,
  Webhook,
  MessageCircle
} from "lucide-react";
import { KakaoNotificationModal } from "./KakaoNotificationModal";

interface APIConnection {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  icon: any;
  category: 'google' | 'social' | 'analytics' | 'productivity';
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("api");
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});
  const [isTestingConnection, setIsTestingConnection] = useState<Record<string, boolean>>({});
  const [showKakaoModal, setShowKakaoModal] = useState(false);
  
  // API 연결 상태
  const [apiConnections, setApiConnections] = useState<APIConnection[]>([
    {
      id: 'google_sheets',
      name: 'Google Sheets',
      description: '워크플로우 데이터를 구글 시트로 동기화',
      status: 'disconnected',
      lastSync: '-',
      icon: FileSpreadsheet,
      category: 'google'
    },
    {
      id: 'google_calendar',
      name: 'Google Calendar',
      description: '일정 관리 및 자동 캘린더 동기화',
      status: 'disconnected',
      lastSync: '-',
      icon: Calendar,
      category: 'google'
    },
    {
      id: 'youtube_analytics',
      name: 'YouTube Analytics',
      description: '채널 성과 데이터 자동 수집',
      status: 'disconnected',
      lastSync: '-',
      icon: Youtube,
      category: 'social'
    },
    {
      id: 'instagram_business',
      name: 'Instagram Business',
      description: '인스타그램 비즈니스 계정 연동',
      status: 'disconnected',
      lastSync: '-',
      icon: Instagram,
      category: 'social'
    },
    {
      id: 'google_analytics',
      name: 'Google Analytics',
      description: '웹사이트 트래픽 및 전환 데이터',
      status: 'error',
      lastSync: '2시간 전',
      icon: BarChart3,
      category: 'analytics'
    },
    {
      id: 'openai_api',
      name: 'OpenAI API',
      description: 'AI 분석 및 콘텐츠 생성 기능',
      status: 'connected',
      lastSync: '방금 전',
      icon: Zap,
      category: 'productivity'
    }
  ]);

  // API 키 설정
  const [apiKeys, setApiKeys] = useState({
    google_client_id: '',
    google_client_secret: '',
    openai_api_key: '',
    youtube_api_key: '',
    instagram_access_token: '',
    google_analytics_property_id: '',
    webhook_secret: ''
  });

  // 설정 상태
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      trendsAlert: true,
      performanceReport: true,
      weeklyDigest: true
    },
    privacy: {
      dataCollection: true,
      analytics: true,
      personalization: true
    },
    sync: {
      autoSync: true,
      syncInterval: '15', // minutes
      backgroundSync: true
    },
    display: {
      theme: 'light',
      language: 'ko',
      timezone: 'Asia/Seoul'
    }
  });

  // API 연결 테스트
  const testApiConnection = async (connectionId: string) => {
    setIsTestingConnection({...isTestingConnection, [connectionId]: true});
    
    // 시뮬레이션된 API 테스트
    setTimeout(() => {
      const connection = apiConnections.find(c => c.id === connectionId);
      if (connection) {
        const success = Math.random() > 0.3; // 70% 성공률
        const updatedConnections = apiConnections.map(c => 
          c.id === connectionId 
            ? {...c, status: success ? 'connected' : 'error', lastSync: success ? '방금 전' : c.lastSync}
            : c
        );
        setApiConnections(updatedConnections);
      }
      setIsTestingConnection({...isTestingConnection, [connectionId]: false});
    }, 2000);
  };

  // 연결 상태별 색상
  const getStatusColor = (status: APIConnection['status']) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-50 border-green-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'disconnected': return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: APIConnection['status']) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'error': return <XCircle className="h-4 w-4" />;
      case 'disconnected': return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: APIConnection['status']) => {
    switch (status) {
      case 'connected': return '연결됨';
      case 'error': return '오류';
      case 'disconnected': return '연결 안됨';
    }
  };

  // 카테고리별 그룹핑
  const groupedConnections = apiConnections.reduce((acc, connection) => {
    if (!acc[connection.category]) {
      acc[connection.category] = [];
    }
    acc[connection.category].push(connection);
    return acc;
  }, {} as Record<string, APIConnection[]>);

  const categoryLabels = {
    google: 'Google 서비스',
    social: '소셜미디어',
    analytics: '분석 도구',
    productivity: '생산성 도구'
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Settings className="h-7 w-7 text-foreground" />
            <h1 className="text-2xl font-bold">설정</h1>
          </div>
          <p className="text-muted-foreground">
            API 연동, 알림, 개인화 설정을 관리하세요
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-green-200 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            {apiConnections.filter(c => c.status === 'connected').length}개 연결됨
          </Badge>
          <Button className="bg-brand-gradient hover:opacity-90">
            <Shield className="h-4 w-4 mr-2" />
            설정 백업
          </Button>
        </div>
      </div>

      {/* 메인 탭 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            API 연동
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            알림 설정
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            개인정보
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            일반 설정
          </TabsTrigger>
        </TabsList>

        {/* API 연동 탭 */}
        <TabsContent value="api" className="space-y-6">
          {/* Google API 설정 가이드 */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <BookOpen className="h-5 w-5" />
                Google API 연동 가이드
              </CardTitle>
              <CardDescription className="text-blue-600">
                구글 서비스와 연동하기 위한 단계별 설정 방법을 안내해드립니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-700">1. Google Cloud Console 설정</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-blue-600">
                    <li>Google Cloud Console에 접속</li>
                    <li>새 프로젝트 생성 또는 기존 프로젝트 선택</li>
                    <li>API 및 서비스 라이브러리에서 필요한 API 활성화</li>
                    <li>사용자 인증 정보 OAuth 2.0 클라이언트 ID 생성</li>
                  </ol>
                  <Button variant="outline" size="sm" className="w-full border-blue-300 text-blue-700">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Google Cloud Console 바로가기
                  </Button>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-700">2. 필요한 API 목록</h4>
                  <ul className="space-y-1 text-sm text-blue-600">
                    <li>• Google Sheets API</li>
                    <li>• Google Calendar API</li>
                    <li>• YouTube Data API v3</li>
                    <li>• Google Analytics Reporting API</li>
                  </ul>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <p className="text-xs text-blue-700">
                      <Info className="h-3 w-3 inline mr-1" />
                      승인된 리디렉션 URI에 반드시 추가하세요: 
                      <code className="bg-white px-1 rounded">https://yourapp.com/auth/callback</code>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API 키 설정 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API 키 관리
              </CardTitle>
              <CardDescription>
                외부 서비스 연동을 위한 API 키와 인증 정보를 안전하게 관리합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  모든 API 키는 암호화되어 저장되며, 브라우저를 벗어나지 않습니다. 
                  보안을 위해 정기적으로 키를 재생성하는 것을 권장합니다.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="google_client_id">Google Client ID</Label>
                  <div className="flex gap-2">
                    <Input
                      id="google_client_id"
                      type={showApiKeys.google_client_id ? "text" : "password"}
                      placeholder="Google OAuth Client ID 입력"
                      value={apiKeys.google_client_id}
                      onChange={(e) => setApiKeys({...apiKeys, google_client_id: e.target.value})}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowApiKeys({...showApiKeys, google_client_id: !showApiKeys.google_client_id})}
                    >
                      {showApiKeys.google_client_id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="google_client_secret">Google Client Secret</Label>
                  <div className="flex gap-2">
                    <Input
                      id="google_client_secret"
                      type={showApiKeys.google_client_secret ? "text" : "password"}
                      placeholder="Google OAuth Client Secret 입력"
                      value={apiKeys.google_client_secret}
                      onChange={(e) => setApiKeys({...apiKeys, google_client_secret: e.target.value})}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowApiKeys({...showApiKeys, google_client_secret: !showApiKeys.google_client_secret})}
                    >
                      {showApiKeys.google_client_secret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="openai_api_key">OpenAI API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="openai_api_key"
                      type={showApiKeys.openai_api_key ? "text" : "password"}
                      placeholder="sk-..."
                      value={apiKeys.openai_api_key}
                      onChange={(e) => setApiKeys({...apiKeys, openai_api_key: e.target.value})}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowApiKeys({...showApiKeys, openai_api_key: !showApiKeys.openai_api_key})}
                    >
                      {showApiKeys.openai_api_key ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube_api_key">YouTube Data API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="youtube_api_key"
                      type={showApiKeys.youtube_api_key ? "text" : "password"}
                      placeholder="YouTube API 키 입력"
                      value={apiKeys.youtube_api_key}
                      onChange={(e) => setApiKeys({...apiKeys, youtube_api_key: e.target.value})}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowApiKeys({...showApiKeys, youtube_api_key: !showApiKeys.youtube_api_key})}
                    >
                      {showApiKeys.youtube_api_key ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  키 재생성
                </Button>
                <Button className="bg-brand-gradient hover:opacity-90">
                  <Shield className="h-4 w-4 mr-2" />
                  안전하게 저장
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 서비스별 연결 상태 */}
          {Object.entries(groupedConnections).map(([category, connections]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </CardTitle>
                <CardDescription>
                  {category === 'google' && '구글 서비스와의 연동 상태를 관리합니다.'}
                  {category === 'social' && '소셜미디어 플랫폼 연동을 관리합니다.'}
                  {category === 'analytics' && '분석 도구와의 데이터 동기화를 관리합니다.'}
                  {category === 'productivity' && 'AI 및 생산성 도구 연동을 관리합니다.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {connections.map((connection) => (
                    <div key={connection.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <connection.icon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{connection.name}</h4>
                          <p className="text-sm text-muted-foreground">{connection.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(connection.status)}>
                              {getStatusIcon(connection.status)}
                              <span className="ml-1">{getStatusText(connection.status)}</span>
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              마지막 동기화: {connection.lastSync}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {connection.status === 'connected' && (
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            동기화
                          </Button>
                        )}
                        <Button
                          variant={connection.status === 'connected' ? 'destructive' : 'default'}
                          size="sm"
                          onClick={() => testApiConnection(connection.id)}
                          disabled={isTestingConnection[connection.id]}
                          className={connection.status !== 'connected' ? 'bg-brand-gradient hover:opacity-90' : ''}
                        >
                          {isTestingConnection[connection.id] ? (
                            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                          ) : connection.status === 'connected' ? (
                            <XCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <Link className="h-3 w-3 mr-1" />
                          )}
                          {isTestingConnection[connection.id] 
                            ? '테스트 중...' 
                            : connection.status === 'connected' 
                              ? '연결 해제' 
                              : '연결하기'
                          }
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* 알림 설정 탭 */}
        <TabsContent value="notifications" className="space-y-6">
          {/* 카카오톡 알림 설정 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-yellow-600" />
                카카오톡 알림
              </CardTitle>
              <CardDescription>
                카카오톡으로 실시간 트렌드 알림과 인사이트를 받아보세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">카카오톡 알림 서비스</h4>
                    <p className="text-sm text-muted-foreground">
                      트렌드 변화, 수익 기회, 콘텐츠 타이밍 등을 실시간으로 알림받으세요
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowKakaoModal(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  설정하기
                </Button>
              </div>
              
              <Alert>
                <MessageCircle className="h-4 w-4" />
                <AlertDescription>
                  카카오톡 알림은 무료이며, 개인정보는 안전하게 보호됩니다. 
                  언제든지 연동을 해제할 수 있습니다.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                기본 알림 설정
              </CardTitle>
              <CardDescription>
                중요한 업데이트와 인사이트를 놓치지 않도록 알림을 설정하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">이메일 알림</h4>
                    <p className="text-sm text-muted-foreground">중요한 업데이트를 이메일로 받습니다</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings, 
                        notifications: {...settings.notifications, email: checked}
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">트렌드 알림</h4>
                    <p className="text-sm text-muted-foreground">새로운 트렌드와 급상승 키워드 알림</p>
                  </div>
                  <Switch
                    checked={settings.notifications.trendsAlert}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings, 
                        notifications: {...settings.notifications, trendsAlert: checked}
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">성과 리포트</h4>
                    <p className="text-sm text-muted-foreground">주간 성과 요약 리포트</p>
                  </div>
                  <Switch
                    checked={settings.notifications.performanceReport}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings, 
                        notifications: {...settings.notifications, performanceReport: checked}
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">주간 다이제스트</h4>
                    <p className="text-sm text-muted-foreground">매주 주요 인사이트와 추천사항</p>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyDigest}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings, 
                        notifications: {...settings.notifications, weeklyDigest: checked}
                      })
                    }
                  />
                </div>
              </div>

              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  알림 설정은 즉시 적용되며, 언제든지 변경할 수 있습니다. 
                  중요한 보안 알림은 설정과 관계없이 발송됩니다.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 개인정보 탭 */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                개인정보 및 보안
              </CardTitle>
              <CardDescription>
                데이터 수집, 저장, 사용에 대한 설정을 관리합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">데이터 수집 동의</h4>
                    <p className="text-sm text-muted-foreground">서비스 개선을 위한 익명화된 사용 데이터 수집</p>
                  </div>
                  <Switch
                    checked={settings.privacy.dataCollection}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings, 
                        privacy: {...settings.privacy, dataCollection: checked}
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">분석 추적</h4>
                    <p className="text-sm text-muted-foreground">사용 패턴 분석을 통한 개인화된 추천</p>
                  </div>
                  <Switch
                    checked={settings.privacy.analytics}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings, 
                        privacy: {...settings.privacy, analytics: checked}
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">개인화 서비스</h4>
                    <p className="text-sm text-muted-foreground">맞춤형 콘텐츠 및 추천 기능</p>
                  </div>
                  <Switch
                    checked={settings.privacy.personalization}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings, 
                        privacy: {...settings.privacy, personalization: checked}
                      })
                    }
                  />
                </div>
              </div>

              <Alert>
                <Lock className="h-4 w-4" />
                <AlertDescription>
                  모든 개인 데이터는 업계 표준 암호화로 보호되며, 
                  사용자 동의 없이 제3자와 공유되지 않습니다.
                </AlertDescription>
              </Alert>

              <div className="flex justify-start gap-2">
                <Button variant="outline">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  데이터 다운로드
                </Button>
                <Button variant="destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  계정 삭제
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 일반 설정 탭 */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                일반 설정
              </CardTitle>
              <CardDescription>
                언어, 시간대, 동기화 등 기본적인 서비스 설정을 관리합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">언어</Label>
                  <Select value={settings.display.language} onValueChange={(value) => 
                    setSettings({...settings, display: {...settings.display, language: value}})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ko">한국어</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">시간대</Label>
                  <Select value={settings.display.timezone} onValueChange={(value) => 
                    setSettings({...settings, display: {...settings.display, timezone: value}})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Seoul">���울 (KST)</SelectItem>
                      <SelectItem value="Asia/Tokyo">도쿄 (JST)</SelectItem>
                      <SelectItem value="America/New_York">뉴욕 (EST)</SelectItem>
                      <SelectItem value="Europe/London">런던 (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">테마</Label>
                  <Select value={settings.display.theme} onValueChange={(value) => 
                    setSettings({...settings, display: {...settings.display, theme: value}})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">라이트</SelectItem>
                      <SelectItem value="dark">다크</SelectItem>
                      <SelectItem value="auto">시스템 설정</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sync_interval">동기화 주기</Label>
                  <Select value={settings.sync.syncInterval} onValueChange={(value) => 
                    setSettings({...settings, sync: {...settings.sync, syncInterval: value}})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5분</SelectItem>
                      <SelectItem value="15">15분</SelectItem>
                      <SelectItem value="30">30분</SelectItem>
                      <SelectItem value="60">1시간</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">자동 동기화</h4>
                    <p className="text-sm text-muted-foreground">백그라운드에서 자동으로 데이터를 동기화합니다</p>
                  </div>
                  <Switch
                    checked={settings.sync.autoSync}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings, 
                        sync: {...settings.sync, autoSync: checked}
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">백그라운드 동기화</h4>
                    <p className="text-sm text-muted-foreground">앱이 백그라운드에서도 데이터를 동기화합니다</p>
                  </div>
                  <Switch
                    checked={settings.sync.backgroundSync}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings, 
                        sync: {...settings.sync, backgroundSync: checked}
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 고급 설정 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                고급 설정
              </CardTitle>
              <CardDescription>
                개발자 및 고급 사용자를 위한 추가 설정입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  고급 설정을 변경하면 서비스 동작에 영향을 줄 수 있습니다. 
                  변경 전에 현재 설정을 백업하는 것을 권장합니다.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="webhook_url">웹훅 URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="webhook_url"
                    placeholder="https://your-webhook-endpoint.com/webhook"
                    className="font-mono text-sm"
                  />
                  <Button variant="outline" size="sm">
                    <Webhook className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  중요한 이벤트가 발생할 때 웹훅으로 알림을 받습니다
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  기본값으로 복원
                </Button>
                <Button className="bg-brand-gradient hover:opacity-90">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  설정 저장
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 카카오톡 알림 설정 모달 */}
      <KakaoNotificationModal
        isOpen={showKakaoModal}
        onClose={() => setShowKakaoModal(false)}
      />
    </div>
  );
}