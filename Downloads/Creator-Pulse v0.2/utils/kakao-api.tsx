import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-e8bed437`;

interface KakaoUser {
  phoneNumber: string;
  kakaoId: string;
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

interface NotificationData {
  productName: string;
  growth?: number;
  revenue?: string;
  priceChange?: number;
  currentPrice?: string;
  topProducts?: Array<{ name: string; growth: number }>;
}

class KakaoAPI {
  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: '서버 오류' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // 카카오톡 사용자 등록
  async registerUser(phoneNumber: string, kakaoId: string): Promise<{ userId: string }> {
    return this.request('/kakao/register', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber, kakaoId }),
    });
  }

  // 인증번호 발송 (실제로는 카카오톡 API를 통해 처리)
  async sendVerificationCode(phoneNumber: string): Promise<{ success: boolean }> {
    // 실제 구현에서는 카카오톡 비즈니스 API 호출
    // 현재는 시뮬레이션
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
  }

  // 인증번호 확인 (실제로는 카카오톡 API를 통해 처리)
  async verifyCode(phoneNumber: string, code: string): Promise<{ success: boolean; kakaoId?: string }> {
    // 실제 구현에서는 카카오톡 인증 확인
    // 현재는 시뮬레이션
    return new Promise((resolve) => {
      setTimeout(() => {
        if (code === '123456' || code.length === 6) {
          resolve({ 
            success: true, 
            kakaoId: `kakao_${phoneNumber.replace(/-/g, '')}`
          });
        } else {
          resolve({ success: false });
        }
      }, 1000);
    });
  }

  // 알림 설정 저장
  async saveNotificationSettings(settings: NotificationSettings): Promise<void> {
    await this.request('/kakao/settings', {
      method: 'POST',
      body: JSON.stringify(settings),
    });
  }

  // 알림 설정 조회
  async getNotificationSettings(userId: string): Promise<NotificationSettings | null> {
    try {
      return await this.request(`/kakao/settings/${userId}`);
    } catch (error) {
      if (error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  // 즉시 알림 발송
  async sendNotification(
    phoneNumber: string, 
    templateType: 'trendAlert' | 'priceAlert' | 'weeklyReport', 
    data: NotificationData
  ): Promise<{ messageId: string }> {
    return this.request('/kakao/send', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber, templateType, data }),
    });
  }

  // 알림 히스토리 조회
  async getNotificationHistory(phoneNumber: string, limit: number = 10): Promise<any[]> {
    return this.request(`/kakao/history/${phoneNumber}?limit=${limit}`);
  }

  // 트렌드 알림 확인 (관리자용)
  async checkTrendAlerts(): Promise<void> {
    await this.request('/kakao/check-trends', {
      method: 'POST',
    });
  }

  // 주간 리포트 발송 (관리자용)
  async sendWeeklyReports(): Promise<void> {
    await this.request('/kakao/weekly-reports', {
      method: 'POST',
    });
  }
}

export const kakaoAPI = new KakaoAPI();