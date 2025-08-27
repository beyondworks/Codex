import jsPDF from 'jspdf';

// 리포트 타입 정의
export interface ReportData {
  title: string;
  subtitle: string;
  generatedAt: string;
  data: any;
}

// CSV 다운로드 유틸리티
export const downloadCSV = (data: any[], filename: string) => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
  ].join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// JSON 다운로드 유틸리티
export const downloadJSON = (data: any, filename: string) => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// PDF 다운로드 유틸리티 (기본적인 텍스트 기반)
export const downloadPDF = (reportData: ReportData, filename: string) => {
  const doc = new jsPDF();
  
  // 한글 폰트 설정 (기본 폰트로 대체)
  doc.setFont('helvetica');
  
  // 제목
  doc.setFontSize(20);
  doc.text(reportData.title, 20, 30);
  
  // 부제목
  doc.setFontSize(14);
  doc.text(reportData.subtitle, 20, 45);
  
  // 생성 날짜
  doc.setFontSize(10);
  doc.text(`Generated: ${reportData.generatedAt}`, 20, 60);
  
  // 데이터 섹션
  let yPosition = 80;
  doc.setFontSize(12);
  
  if (typeof reportData.data === 'object' && reportData.data !== null) {
    Object.entries(reportData.data).forEach(([key, value]) => {
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(12);
      doc.text(`${key}:`, 20, yPosition);
      doc.setFontSize(10);
      
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          yPosition += 15;
          if (typeof item === 'object') {
            doc.text(`  ${index + 1}. ${JSON.stringify(item)}`, 25, yPosition);
          } else {
            doc.text(`  ${index + 1}. ${String(item)}`, 25, yPosition);
          }
        });
      } else if (typeof value === 'object') {
        yPosition += 15;
        doc.text(JSON.stringify(value, null, 2), 25, yPosition);
      } else {
        yPosition += 15;
        doc.text(String(value), 25, yPosition);
      }
      
      yPosition += 20;
    });
  }
  
  doc.save(`${filename}_${new Date().toISOString().split('T')[0]}.pdf`);
};

// 수익 리포트 데이터 생성
export const generateRevenueReportData = (): ReportData => {
  return {
    title: 'Creator-Pulse 수익 분석 리포트',
    subtitle: '월별/일별 수익 현황 및 성장 분석',
    generatedAt: new Date().toLocaleString('ko-KR'),
    data: {
      summary: {
        totalRevenue: '₩12,847,230',
        monthlyGrowth: '+15.3%',
        dailyAverage: '₩414,750',
        topPerformingDay: '2024-08-15'
      },
      monthlyData: [
        { month: '2024-01', revenue: 8500000, growth: 12.5 },
        { month: '2024-02', revenue: 9200000, growth: 8.2 },
        { month: '2024-03', revenue: 10100000, growth: 9.8 },
        { month: '2024-04', revenue: 11300000, growth: 11.9 },
        { month: '2024-05', revenue: 12847230, growth: 13.7 }
      ],
      topProducts: [
        { name: '무선 이어폰', revenue: 3200000, percentage: 24.9 },
        { name: '스마트워치', revenue: 2800000, percentage: 21.8 },
        { name: '블루투스 스피커', revenue: 2100000, percentage: 16.3 }
      ],
      insights: [
        '모바일 기기 카테고리가 전체 수익의 63%를 차지',
        '주말 대비 평일 수익이 23% 높음',
        '오후 6-9시 시간대 최고 성과'
      ]
    }
  };
};

// 성장률 리포트 데이터 생성
export const generateGrowthReportData = (): ReportData => {
  return {
    title: 'Creator-Pulse 성장률 분석 리포트',
    subtitle: '구독자 및 조회수 성장 현황',
    generatedAt: new Date().toLocaleString('ko-KR'),
    data: {
      summary: {
        subscriberGrowth: '+28.7%',
        viewsGrowth: '+34.2%',
        engagementGrowth: '+19.5%',
        projectedGrowth: '+42.3%'
      },
      weeklyGrowth: [
        { week: 'Week 1', subscribers: 1250, views: 45600, engagement: 7.8 },
        { week: 'Week 2', subscribers: 1890, views: 52300, engagement: 8.2 },
        { week: 'Week 3', subscribers: 2340, views: 61200, engagement: 8.9 },
        { week: 'Week 4', subscribers: 3120, views: 73400, engagement: 9.4 }
      ],
      competitorAnalysis: [
        { competitor: '경쟁자 A', growth: 21.3, position: 'Behind' },
        { competitor: '경쟁자 B', growth: 25.7, position: 'Behind' },
        { competitor: '경쟁자 C', growth: 31.2, position: 'Ahead' }
      ]
    }
  };
};

// 조회수 리포트 데이터 생성
export const generateViewsReportData = (): ReportData => {
  return {
    title: 'Creator-Pulse 조회수 분석 리포트',
    subtitle: '영상별 조회수 및 시청자 행동 분석',
    generatedAt: new Date().toLocaleString('ko-KR'),
    data: {
      summary: {
        totalViews: '1,234,567',
        averageViewTime: '8:32',
        clickThroughRate: '12.4%',
        retentionRate: '68.5%'
      },
      hourlyPattern: [
        { hour: '00-06', views: 45600, percentage: 8.2 },
        { hour: '06-12', views: 123400, percentage: 22.1 },
        { hour: '12-18', views: 234500, percentage: 42.0 },
        { hour: '18-24', views: 156700, percentage: 27.7 }
      ],
      topVideos: [
        { title: '최신 스마트폰 리뷰', views: 234560, duration: '12:34', ctr: 14.2 },
        { title: '무선 이어폰 비교', views: 189340, duration: '09:45', ctr: 13.8 },
        { title: '게이밍 기어 추천', views: 156780, duration: '15:22', ctr: 12.9 }
      ],
      audienceRetention: {
        introduction: 89.5,
        middle: 68.2,
        conclusion: 45.3
      }
    }
  };
};

// 전환률 리포트 데이터 생성
export const generateConversionReportData = (): ReportData => {
  return {
    title: 'Creator-Pulse 전환률 분석 리포트',
    subtitle: '쇼핑 태그 클릭부터 구매까지의 전환 분석',
    generatedAt: new Date().toLocaleString('ko-KR'),
    data: {
      summary: {
        overallConversion: '8.7%',
        clickToView: '78.3%',
        viewToPurchase: '11.1%',
        averageOrderValue: '₩156,780'
      },
      conversionFunnel: [
        { stage: '영상 조회', count: 45620, percentage: 100 },
        { stage: '쇼핑 태그 클릭', count: 12340, percentage: 27.1 },
        { stage: '상품 페이지 방문', count: 9650, percentage: 21.2 },
        { stage: '장바구니 추가', count: 5430, percentage: 11.9 },
        { stage: '결제 완료', count: 3970, percentage: 8.7 }
      ],
      topConvertingProducts: [
        { name: '무선 이어폰', conversion: 12.3, revenue: 1234000 },
        { name: '스마트워치', conversion: 9.8, revenue: 987000 },
        { name: '블루투스 스피커', conversion: 8.4, revenue: 756000 }
      ]
    }
  };
};

// 영상 리포트 데이터 생성
export const generateVideoReportData = (videoData: any): ReportData => {
  return {
    title: `영상 분석 리포트: ${videoData?.title || '영상 제목'}`,
    subtitle: '영상별 상세 성과 및 최적화 제안',
    generatedAt: new Date().toLocaleString('ko-KR'),
    data: {
      basicMetrics: {
        views: videoData?.views || '0',
        revenue: videoData?.revenue || '₩0',
        ctr: videoData?.ctr || '0%',
        retention: '68.5%',
        likes: '3,547',
        comments: '892'
      },
      audienceAnalysis: {
        demographics: [
          { age: '18-24', percentage: 22.3, engagement: 7.8 },
          { age: '25-34', percentage: 41.7, engagement: 8.9 },
          { age: '35-44', percentage: 28.1, engagement: 6.4 },
          { age: '45+', percentage: 7.9, engagement: 5.2 }
        ],
        devices: [
          { device: '모바일', percentage: 72.4 },
          { device: '데스크톱', percentage: 23.1 },
          { device: '태블릿', percentage: 4.5 }
        ]
      },
      productPerformance: [
        { name: '무선 이어폰', clicks: 892, sales: 67, conversion: 7.5 },
        { name: '스마트워치', clicks: 634, sales: 42, conversion: 6.6 },
        { name: '블루투스 스피커', clicks: 445, sales: 28, conversion: 6.3 }
      ],
      optimization: [
        '끝화면 최적화로 시청률 향상 가능',
        '모바일 최적화된 미리보기 이미지 권장',
        '오후 6-9시 업로드로 최적 노출 시간 활용'
      ]
    }
  };
};