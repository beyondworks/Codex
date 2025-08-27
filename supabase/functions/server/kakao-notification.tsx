import * as kv from "./kv_store.tsx";

interface KakaoUser {
  phoneNumber: string;
  kakaoId: string;
  isVerified: boolean;
  createdAt: string;
}

interface NotificationSettings {
  userId: string;
  phoneNumber: string;
  trendChanges: boolean;
  priceDrops: boolean;
  competitorAnalysis: boolean;
  revenueOpportunities: boolean;
  contentTiming: boolean;
  weeklyReports: boolean;
  thresholds: {
    growthRate: number;
    priceChange: number;
    revenueIncrease: number;
  };
}

interface NotificationHistory {
  id: string;
  phoneNumber: string;
  productName: string;
  type: string;
  message: string;
  sentAt: string;
  status: 'sent' | 'failed';
}

// 카카오톡 비즈니스 메시지 템플릿
const KAKAO_TEMPLATES = {
  trendAlert: {
    templateCode: "TREND_ALERT_001",
    template: (data: any) => ({
      template_object: {
        object_type: "text",
        text: `🚀 ${data.productName}이 급상승 중입니다!\n\n성장률: ${data.growth > 0 ? '+' : ''}${data.growth}% ${data.growth > 0 ? '↗️' : '↘️'}\n예상 수익: ${data.revenue}\n\n지금이 콘텐츠 제작 최적 타이밍입니다!`,
        link: {
          web_url: "https://creator-pulse.com",
          mobile_web_url: "https://creator-pulse.com"
        }
      }
    })
  },
  priceAlert: {
    templateCode: "PRICE_ALERT_001", 
    template: (data: any) => ({
      template_object: {
        object_type: "text",
        text: `💰 ${data.productName} 가격 변동 알림!\n\n변동률: ${data.priceChange > 0 ? '+' : ''}${data.priceChange}%\n현재 가격: ${data.currentPrice}\n\n할인 기회를 놓치지 마세요!`,
        link: {
          web_url: "https://creator-pulse.com",
          mobile_web_url: "https://creator-pulse.com"
        }
      }
    })
  },
  weeklyReport: {
    templateCode: "WEEKLY_REPORT_001",
    template: (data: any) => ({
      template_object: {
        object_type: "text", 
        text: `📊 주간 리포트가 도착했습니다!\n\n이번 주 TOP 상품:\n1. ${data.topProducts[0]?.name} (+${data.topProducts[0]?.growth}%)\n2. ${data.topProducts[1]?.name} (+${data.topProducts[1]?.growth}%)\n3. ${data.topProducts[2]?.name} (+${data.topProducts[2]?.growth}%)\n\n자세한 분석은 앱에서 확인하세요!`,
        link: {
          web_url: "https://creator-pulse.com/dashboard",
          mobile_web_url: "https://creator-pulse.com/dashboard"
        }
      }
    })
  }
};

// 카카오톡 메시지 전송
export async function sendKakaoMessage(phoneNumber: string, templateType: string, data: any) {
  try {
    const template = KAKAO_TEMPLATES[templateType as keyof typeof KAKAO_TEMPLATES];
    if (!template) {
      throw new Error(`Unknown template type: ${templateType}`);
    }

    // 실제 환경에서는 카카오톡 비즈니스 API 호출
    const kakaoApiKey = Deno.env.get("KAKAO_REST_API_KEY");
    if (!kakaoApiKey) {
      console.log("카카오톡 API 키가 설정되지 않음 - 개발 모드로 실행");
      return { success: true, messageId: `dev_${Date.now()}` };
    }

    const response = await fetch("https://kapi.kakao.com/v2/api/talk/memo/default/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${kakaoApiKey}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        template_object: JSON.stringify(template.template(data))
      })
    });

    if (!response.ok) {
      throw new Error(`카카오톡 API 에러: ${response.status}`);
    }

    const result = await response.json();
    
    // 전송 기록 저장
    const historyId = `kakao_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const history: NotificationHistory = {
      id: historyId,
      phoneNumber,
      productName: data.productName || "전체",
      type: templateType,
      message: template.template(data).template_object.text,
      sentAt: new Date().toISOString(),
      status: 'sent'
    };
    
    await kv.set(`notification_history:${historyId}`, JSON.stringify(history));
    
    return { success: true, messageId: result.message_id };
    
  } catch (error) {
    console.error("카카오톡 메시지 전송 실패:", error);
    
    // 실패 기록 저장
    const historyId = `kakao_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const history: NotificationHistory = {
      id: historyId,
      phoneNumber,
      productName: data.productName || "전체",
      type: templateType,
      message: `전송 실패: ${error.message}`,
      sentAt: new Date().toISOString(),
      status: 'failed'
    };
    
    await kv.set(`notification_history:${historyId}`, JSON.stringify(history));
    
    return { success: false, error: error.message };
  }
}

// 사용자 알림 설정 저장
export async function saveNotificationSettings(userId: string, settings: NotificationSettings) {
  try {
    await kv.set(`notification_settings:${userId}`, JSON.stringify(settings));
    return { success: true };
  } catch (error) {
    console.error("알림 설정 저장 실패:", error);
    return { success: false, error: error.message };
  }
}

// 사용자 알림 설정 조회
export async function getNotificationSettings(userId: string): Promise<NotificationSettings | null> {
  try {
    const settings = await kv.get(`notification_settings:${userId}`);
    return settings ? JSON.parse(settings) : null;
  } catch (error) {
    console.error("알림 설정 조회 실패:", error);
    return null;
  }
}

// 카카오톡 사용자 등록
export async function registerKakaoUser(phoneNumber: string, kakaoId: string) {
  try {
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const user: KakaoUser = {
      phoneNumber,
      kakaoId,
      isVerified: true,
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`kakao_user:${phoneNumber}`, JSON.stringify(user));
    await kv.set(`kakao_user_by_id:${userId}`, JSON.stringify(user));
    
    return { success: true, userId };
  } catch (error) {
    console.error("카카오톡 사용자 등록 실패:", error);
    return { success: false, error: error.message };
  }
}

// 알림 히스토리 조회
export async function getNotificationHistory(phoneNumber: string, limit: number = 10) {
  try {
    const historyKeys = await kv.getByPrefix("notification_history:");
    const allHistory: NotificationHistory[] = [];
    
    for (const key of historyKeys) {
      const data = await kv.get(key);
      if (data) {
        const history: NotificationHistory = JSON.parse(data);
        if (history.phoneNumber === phoneNumber) {
          allHistory.push(history);
        }
      }
    }
    
    // 최신 순으로 정렬
    allHistory.sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
    
    return allHistory.slice(0, limit);
  } catch (error) {
    console.error("알림 히스토리 조회 실패:", error);
    return [];
  }
}

// 트렌드 변화 감지 시 자동 알림 발송
export async function checkAndSendTrendAlerts() {
  try {
    // 모든 사용자의 알림 설정 조회
    const settingsKeys = await kv.getByPrefix("notification_settings:");
    
    for (const key of settingsKeys) {
      const settingsData = await kv.get(key);
      if (!settingsData) continue;
      
      const settings: NotificationSettings = JSON.parse(settingsData);
      
      if (!settings.trendChanges) continue;
      
      // 실제 구현에서는 여기서 상품 트렌드 데이터를 확인
      // 예시 데이터로 대체
      const trendData = {
        productName: "애플 에어팟 프로",
        growth: 67,
        revenue: "₩3.2M",
        threshold: settings.thresholds.growthRate
      };
      
      // 임계값 확인
      if (Math.abs(trendData.growth) >= trendData.threshold) {
        await sendKakaoMessage(settings.phoneNumber, "trendAlert", trendData);
        console.log(`트렌드 알림 전송: ${settings.phoneNumber} - ${trendData.productName}`);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error("트렌드 알림 확인 실패:", error);
    return { success: false, error: error.message };
  }
}

// 주간 리포트 발송
export async function sendWeeklyReports() {
  try {
    const settingsKeys = await kv.getByPrefix("notification_settings:");
    
    for (const key of settingsKeys) {
      const settingsData = await kv.get(key);
      if (!settingsData) continue;
      
      const settings: NotificationSettings = JSON.parse(settingsData);
      
      if (!settings.weeklyReports) continue;
      
      // 주간 리포트 데이터 생성
      const reportData = {
        topProducts: [
          { name: "애플 에어팟 프로", growth: 67 },
          { name: "삼성 갤럭시 워치", growth: 45 },
          { name: "LG 그램 노트북", growth: 38 }
        ]
      };
      
      await sendKakaoMessage(settings.phoneNumber, "weeklyReport", reportData);
      console.log(`주간 리포트 전송: ${settings.phoneNumber}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error("주간 리포트 전송 실패:", error);
    return { success: false, error: error.message };
  }
}