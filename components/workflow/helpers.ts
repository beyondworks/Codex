import { Task, ScheduleItem, AIAssistantData } from "./types";
import { mockAnalysisData } from "./data";

export const getStatusColor = (status: ScheduleItem['status']) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-700 border-green-200';
    case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'pending': return 'bg-gray-100 text-gray-700 border-gray-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const getPriorityColor = (priority: ScheduleItem['priority']) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-700 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'low': return 'bg-green-100 text-green-700 border-green-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const getDifficultyColor = (difficulty: Task['difficulty']) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-700 border-green-200';
    case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'hard': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const getTypeIcon = (type: ScheduleItem['type']) => {
  const iconMap = {
    'content': 'Image',
    'upload': 'Upload',
    'analysis': 'BarChart3',
    'meeting': 'Users'
  };
  return iconMap[type] || 'Calendar';
};

export const generateMockAnalysis = (taskId: string, analysisType: string): AIAssistantData => {
  const analysis = mockAnalysisData[taskId as keyof typeof mockAnalysisData];
  
  if (analysis) {
    return {
      taskId,
      ...analysis
    };
  }
  
  return {
    taskId,
    recommendations: ["분석을 시작하겠습니다.", "데이터를 수집 중입니다.", "결과를 준비하고 있습니다."]
  };
};

// 향상된 AI 응답 생성 - 작업별 맞춤형 답변
export const generateAiResponse = (userMessage: string, task: Task | null): string => {
  if (!task) {
    return "안녕하세요! 어떤 작업에 대해 도움이 필요하신가요?";
  }

  // 메시지 키워드 분석
  const message = userMessage.toLowerCase();
  const taskId = task.id;
  
  // 작업별 맞춤형 응답
  const taskSpecificResponses: Record<string, Record<string, string[]>> = {
    "audience-analysis": {
      "시작": [
        "타겟 오디언스 분석을 시작해보겠습니다! 먼저 유튜브 스튜디오의 애널리틱스 데이터에 접근해주세요.",
        "🎯 분석을 위해 다음 데이터가 필요합니다:\n• 최근 3개월 시청자 인구통계\n• 댓글 활동이 높은 영상 목록\n• 시청 지속 시간이 긴 영상들\n\n어떤 데이터부터 확인하시겠어요?"
      ],
      "데이터": [
        "좋습니다! 데이터 수집에 대해 안내해드리겠습니다.\n\n📊 **수집해야 할 데이터:**\n1. 유튜브 스튜디오 > 애널리틱스 > 잠재고객\n2. 연령별, 성별 분포 데이터\n3. 상위 지역 및 언어 정보\n4. 시청 시간대 패턴\n\n이 데이터를 바탕으로 정확한 페르소나를 생성할 수 있습니다.",
        "데이터 분석 중입니다... 🔍\n\n현재 플랫폼에 연동된 YouTube Analytics API를 통해 실시간 데이터를 불러오고 있습니다. 잠시만 기다려주세요!"
      ],
      "페르소나": [
        "페르소나 생성에 대해 설명드리겠습니다!\n\n👤 **효과적인 페르소나 생성 방법:**\n• 실제 이름과 나이 설정\n• 직업과 라이프스타일 정의\n• 쇼핑 패턴과 선호도 분석\n• 미디어 소비 습관 파악\n\n구체적일수록 타겟팅이 정확해집니다.",
        "AI가 분석한 데이터를 바탕으로 3개의 핵심 페르소나를 생성했습니다:\n\n1️⃣ **직장인 지민 (28세)** - 효율성 중시\n2️⃣ **육아맘 수연 (32세)** - 실용성 중시  \n3️⃣ **대학생 민호 (22세)** - 가성비 중시\n\n각 페르소나별 상세 프로필을 확인하시겠어요?"
      ],
      "개선": [
        "분석 결과를 개선하는 방법을 알려드리겠습니다:\n\n📈 **개선 포인트:**\n• 더 많은 데이터 포인트 수집\n• 경쟁사 오디언스와 비교\n• 계절별 패턴 분석\n• 구매 전환 데이터 연결\n\n어떤 부분을 우선적으로 개선하고 싶으신가요?",
        "현재 분석 정확도: **87%** 📊\n\n정확도를 높이려면:\n✅ 더 긴 기간의 데이터 수집 (권장: 6개월)\n✅ 구글 애널리틱스 연동으로 웹사이트 방문자 데이터 추가\n✅ 설문조사를 통한 직접적인 피드백 수집\n\n이 중에서 어떤 방법을 시도해보시겠어요?"
      ]
    },
    "keyword-research": {
      "시작": [
        "키워드 연구를 시작해보겠습니다! 🔍\n\n먼저 어떤 카테고리의 키워드를 분석하고 싶으신가요?\n• 계절성 상품 (겨울 패션, 여름 용품 등)\n• 트렌드 아이템\n• 일상 필수품\n• 특별한 카테고리가 있으시다면 말씀해주세요!",
        "키워드 분석을 위한 도구들을 준비했습니다:\n\n🛠️ **활용 가능한 도구들:**\n• Google Trends 실시간 데이터\n• YouTube 검색 제안 분석\n• 경쟁사 키워드 추출\n• 소셜미디어 해시태그 트렌드\n\n어떤 도구부터 사용해보시겠어요?"
      ],
      "트렌드": [
        "현재 급상승하는 키워드들을 분석했습니다! 📈\n\n🔥 **이번 주 HOT 키워드:**\n1. '겨울 필수템' (+340%)\n2. '연말 선물' (+280%)\n3. '홈카페' (+150%)\n4. '다이어트 도시락' (+120%)\n\n이 중에서 관심 있는 키워드가 있으신가요?",
        "트렌드 키워드 활용 전략을 제안드리겠습니다:\n\n⚡ **빠른 대응 전략:**\n• 트렌드 키워드 발견 후 48시간 내 콘텐츠 제작\n• 관련 상품 미리 조사해두기\n• 썸네일에 트렌드 키워드 포함\n\n지금 바로 시도해볼까요?"
      ],
      "경쟁사": [
        "경쟁사 키워드 분석 결과입니다! 🎯\n\n📊 **경쟁 현황:**\n• 상위 경쟁사 5개 채널 분석 완료\n• 그들이 놓친 키워드 17개 발견\n• 블루오션 키워드 8개 식별\n\n가장 유망한 갭 키워드를 보여드릴까요?",
        "경쟁사 분석을 통해 발견한 기회 키워드들:\n\n💎 **블루오션 키워드:**\n1. '30대 직장인 겨울 아우터' (검색량 높음, 경쟁 낮음)\n2. '작은 방 수납 아이템' (틈새 시장)\n3. '반려동물 겨울용품' (성장 중인 시장)\n\n이 키워드들로 콘텐츠를 기획해보시겠어요?"
      ]
    },
    "ai-product-analysis": {
      "시작": [
        "AI 상품 분석을 시작하겠습니다! 🤖\n\n현재 분석 가능한 데이터:\n• 실시간 쇼핑몰 트렌드\n• 소셜미디어 언급량\n• 검색량 변화 추이\n• 가격 변동 패턴\n\n어떤 카테고리부터 분석해드릴까요?",
        "상품 분석 AI를 가동했습니다! ⚙️\n\n🔄 **분석 진행 중:**\n• 10,000개 상품 데이터 수집 중...\n• 트렌드 패턴 학습 중...\n• 수익성 스코어 계산 중...\n\n예상 완료 시간: 2-3분"
      ],
      "수익": [
        "수익성 분석 결과를 공유드립니다! 💰\n\n📈 **고수익 상품 TOP 5:**\n1. 무선 이어폰 (예상 ROI: 45%)\n2. 스마트워치 (예상 ROI: 38%)\n3. 홈트레이닝 용품 (예상 ROI: 35%)\n4. 겨울 아우터 (예상 ROI: 32%)\n5. 뷰티 디바이스 (예상 ROI: 28%)\n\n상세 분석을 원하는 상품이 있으신가요?",
        "맞춤형 수익 최적화 전략을 제안드리겠습니다:\n\n🎯 **수익 극대화 방법:**\n• 고마진 상품과 인기 상품의 조합\n• 계절성을 활용한 타이밍 전략\n• 번들 상품으로 객단가 상승\n• 리뷰 영상으로 신뢰도 증대\n\n어떤 전략부터 적용해보시겠어요?"
      ],
      "리스크": [
        "상품별 리스크 분석 결과입니다! ⚠️\n\n📊 **리스크 등급:**\n🟢 **낮음:** 생필품, 계절용품\n🟡 **보통:** 전자기기, 패션 아이템  \n🔴 **높음:** 트렌드 상품, 명품\n\n안전한 포트폴리오 구성을 도와드릴까요?",
        "리스크 관리 전략을 알려드리겠습니다:\n\n🛡️ **안전한 상품 선택 가이드:**\n• 포트폴리오의 70%는 안정성 높은 상품\n• 20%는 중간 리스크 성장 상품\n• 10%는 고위험 고수익 도전 상품\n\n이런 비율로 구성하시는 것을 추천드려요!"
      ]
    },
    "ai-thumbnail-optimization": {
      "시작": [
        "AI 썸네일 최적화를 시작하겠습니다! 🎨\n\n📊 **분석할 요소들:**\n• 색상 조합과 시각적 임팩트\n• 텍스트 가독성과 배치\n• 얼굴 표정과 감정 전달\n• 상품 노출 비율과 각도\n\n현재 썸네일의 어떤 부분을 개선하고 싶으신가요?",
        "썸네일 성과 분석 시스템을 가동했습니다! 📈\n\n🔍 **현재 분석 중:**\n• 기존 썸네일들의 CTR 패턴\n• 색상별 클릭률 상관관계\n• 텍스트 크기와 성과 연결고리\n• 경쟁 채널 성공 썸네일 벤치마킹"
      ],
      "색상": [
        "색상 최적화 분석 결과입니다! 🌈\n\n🎨 **고성과 색상 조합:**\n1. 빨강 + 노랑 (CTR +34%)\n2. 파랑 + 흰색 (CTR +28%)\n3. 보라 + 금색 (CTR +25%)\n\n**카테고리별 추천:**\n• 뷰티: 핑크, 골드 톤\n• 테크: 블루, 실버 톤  \n• 패션: 블랙, 화이트 조합\n\n어떤 카테고리의 썸네일을 만드시나요?",
        "색상 심리학을 적용한 맞춤 추천입니다:\n\n🧠 **타겟 오디언스별 색상 전략:**\n• **20대 여성:** 파스텔 + 비비드 조합\n• **30대 직장인:** 모던한 무채색 + 포인트 컬러\n• **40대 주부:** 따뜻한 톤 + 안정감 있는 색상\n\n현재 타겟에 맞는 색상을 적용해보시겠어요?"
      ],
      "텍스트": [
        "썸네일 텍스트 최적화 가이드입니다! ✍️\n\n📝 **효과적인 텍스트 전략:**\n• 제목과 50% 이하 중복으로 호기심 유발\n• 3-5단어로 간결하게 구성\n• 감정적 어필 단어 활용\n• 숫자나 기호로 시선 집중\n\n예시: '이걸로 끝!', '10만원 vs 100만원', '충격적인 결과'\n\n어떤 스타일이 마음에 드시나요?",
        "AI가 분석한 고성과 텍스트 패턴입니다:\n\n🔥 **클릭 유도 문구 TOP 10:**\n1. '이거 실화?'\n2. '완전 다른 결과'\n3. '예상외의 반전'\n4. '솔직한 후기'\n5. '가격 대비 최고'\n\n이런 문구들을 활용해서 썸네일을 만들어보세요!"
      ]
    }
  };

  // 일반적인 질문 패턴
  const generalPatterns: Record<string, string[]> = {
    "도움": [
      "물론입니다! 제가 도와드릴 수 있는 영역들이에요:\n\n🎯 **전문 분야:**\n• 데이터 분석 및 해석\n• 단계별 실행 가이드\n• 맞춤형 전략 수립\n• 성과 최적화 방법\n\n구체적으로 어떤 부분이 궁금하신가요?",
      "네, 언제든 도움드리겠습니다! 💪\n\n현재 작업 단계에서 가장 중요한 포인트들을 알려드릴까요? 아니면 특정한 문제나 궁금한 점이 있으시다면 자세히 설명해주세요!"
    ],
    "방법": [
      `"${task.title}" 작업을 효과적으로 수행하는 방법을 알려드리겠습니다!\n\n📋 **단계별 가이드:**\n${task.detailedGuide.steps.slice(0, 2).join('\n')}\n\n더 자세한 설명이 필요한 단계가 있으신가요?`,
      `구체적인 실행 방법을 제안드리겠습니다:\n\n✅ **즉시 실행 가능한 액션:**\n• ${task.detailedGuide.tips[0]}\n• 예상 소요 시간: ${task.estimatedTime}\n• 필요한 도구: Creator-Pulse 플랫폼 내 분석 도구\n\n바로 시작해보시겠어요?`
    ],
    "문제": [
      "어떤 문제가 발생했는지 자세히 알려주세요! 🔧\n\n일반적으로 이런 문제들이 발생할 수 있어요:\n• 데이터 수집 관련 이슈\n• 분석 결과 해석의 어려움\n• 도구 사용법 관련 질문\n• 전략 적용 시 예상과 다른 결과\n\n구체적인 상황을 말씀해주시면 맞춤 솔루션을 제공해드릴게요!",
      "문제 해결을 도와드리겠습니다! 🛠️\n\n**자주 발생하는 이슈별 해결법:**\n• API 연동 오류 → 설정 페이지에서 재연결\n• 데이터 불러오기 실패 → 권한 설정 확인\n• 분석 결과가 이상함 → 데이터 기간 및 필터 재설정\n\n어떤 유형의 문제인지 알려주세요!"
    ],
    "완료": [
      "훌륭합니다! 🎉 작업이 완료되셨군요.\n\n**다음 단계 추천:**\n• 결과를 구글 시트에 자동 저장\n• 관련 일정을 캘린더에 추가\n• 성과 추적을 위한 모니터링 설정\n\n어떤 후속 작업을 진행하시겠어요?",
      `"${task.title}" 완료를 축하드립니다! 🏆\n\n**성과 요약:**\n• 예상 효과: ${task.detailedGuide.expectedResult}\n• 다음 권장 작업: 관련 워크플로우의 다음 단계\n\n결과를 팀원들과 공유하거나 리포트로 저장하시겠어요?`
    ]
  };

  // 작업별 맞춤형 응답 찾기
  const taskResponses = taskSpecificResponses[taskId];
  if (taskResponses) {
    for (const [keyword, responses] of Object.entries(taskResponses)) {
      if (message.includes(keyword)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  }

  // 일반 패턴 응답 찾기
  for (const [keyword, responses] of Object.entries(generalPatterns)) {
    if (message.includes(keyword)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // 기본 맞춤형 응답
  const contextualResponses = [
    `"${task.title}" 작업에 대해 구체적으로 도와드리겠습니다! 어떤 부분이 가장 궁금하신가요?\n\n💡 **자주 묻는 질문들:**\n• 시작하는 방법\n• 데이터 해석 방법\n• 결과 활용 전략\n• 성과 최적화 팁`,
    
    `현재 "${task.title}" 단계에서 제가 도울 수 있는 일들이에요:\n\n🔍 **분석 지원:** 데이터 해석 및 인사이트 도출\n📋 **가이드 제공:** 단계별 상세 실행 방법\n⚡ **자동화 제안:** 효율성 개선 방안\n📊 **성과 예측:** 예상 결과 및 개선점\n\n어떤 도움이 필요하신지 말씀해주세요!`,
    
    `"${task.title}" 작업을 위한 맞춤형 조언을 드리겠습니다.\n\n현재 작업의 핵심 포인트:\n• 난이도: ${task.difficulty === 'easy' ? '쉬움' : task.difficulty === 'medium' ? '보통' : '어려움'}\n• 예상 시간: ${task.estimatedTime}\n• ${task.aiAssistance.description}\n\n구체적인 질문이나 막히는 부분이 있으시면 언제든 말씀해주세요!`,
    
    `이 작업에서 성공하기 위한 실전 팁을 공유드릴게요! 💪\n\n🎯 **성공 포인트:**\n${task.detailedGuide.tips[0]}\n\n🚀 **예상 결과:**\n${task.detailedGuide.expectedResult.slice(0, 100)}...\n\n더 자세한 설명이나 다른 질문이 있으시면 언제든 물어보세요!`
  ];

  return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
};

export const getTotalProgress = (steps: any[]) => {
  const totalTasks = steps.reduce((acc, step) => acc + step.tasks.filter((t: Task) => t.required).length, 0);
  const completedTasks = steps.reduce((acc, step) => 
    acc + step.tasks.filter((t: Task) => t.required && t.completed).length, 0);
  return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
};

export const getCurrentStepProgress = (step: any) => {
  const requiredTasks = step.tasks.filter((t: Task) => t.required);
  const completedTasks = requiredTasks.filter((t: Task) => t.completed);
  return requiredTasks.length > 0 ? Math.round((completedTasks.length / requiredTasks.length) * 100) : 0;
};

// 플랫폼 내 데이터 분석 함수들
export const analyzeInternalData = (dataType: string, parameters: any) => {
  // 실제 구현에서는 여기서 플랫폼 내부 데이터를 분석
  const analysisResults: Record<string, any> = {
    "audience": {
      demographics: {
        age: { "18-24": 15, "25-34": 45, "35-44": 25, "45+": 15 },
        gender: { male: 35, female: 65 },
        location: { seoul: 40, busan: 15, others: 45 }
      },
      interests: ["패션", "뷰티", "라이프스타일", "홈인테리어"],
      engagement: { avgWatchTime: "4:32", likeRate: 8.5, commentRate: 2.3 }
    },
    "trends": {
      trending: ["겨울패션", "홈카페", "다이어트", "반려동물"],
      seasonal: { current: "겨울용품", next: "신년준비" },
      growth: [
        { keyword: "무선이어폰", growth: 340 },
        { keyword: "스마트워치", growth: 280 },
        { keyword: "홈트용품", growth: 220 }
      ]
    },
    "products": {
      topPerforming: [
        { name: "블루투스 이어폰", roi: 45, trend: "상승" },
        { name: "겨울 패딩", roi: 38, trend: "안정" },
        { name: "스킨케어 세트", roi: 35, trend: "상승" }
      ],
      emerging: ["스마트홈기기", "펫케어용품", "홈피트니스"],
      declining: ["여름용품", "구형전자기기"]
    }
  };

  return analysisResults[dataType] || {};
};

// 구글 API 연동을 위한 헬퍼 함수들
export const syncWithGoogleSheets = async (data: any, sheetId?: string) => {
  // 실제 구현에서는 Google Sheets API 호출
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        sheetUrl: `https://docs.google.com/spreadsheets/d/${sheetId || 'example-sheet-id'}`,
        message: "데이터가 구글 시트에 성공적으로 동기화되었습니다."
      });
    }, 2000);
  });
};

export const syncWithGoogleCalendar = async (events: any[], calendarId?: string) => {
  // 실제 구현에서는 Google Calendar API 호출
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        eventsCreated: events.length,
        calendarUrl: `https://calendar.google.com/calendar/u/0/r?cid=${calendarId || 'primary'}`,
        message: `${events.length}개의 일정이 구글 캘린더에 추가되었습니다.`
      });
    }, 1500);
  });
};

// 실시간 플랫폼 데이터 수집 함수
export const collectPlatformData = (sources: string[]) => {
  const mockData: Record<string, any> = {
    youtube: {
      channelStats: { subscribers: 156000, views: 2400000, videos: 284 },
      recentVideos: [
        { title: "겨울 필수 아이템 TOP 10", views: 45000, likes: 2100, ctr: 8.5 },
        { title: "올해 베스트 뷰티 제품", views: 38000, likes: 1800, ctr: 7.2 }
      ],
      analytics: { avgWatchTime: "4:32", retention: 65, engagement: 8.5 }
    },
    instagram: {
      profile: { followers: 89000, posts: 567, engagement: 4.2 },
      recentPosts: [
        { type: "reel", views: 125000, likes: 8900, saves: 1200 },
        { type: "post", likes: 5600, comments: 234, shares: 89 }
      ]
    },
    tiktok: {
      profile: { followers: 234000, likes: 5600000, views: 45000000 },
      trending: { hashtags: ["겨울패션", "뷰티템", "홈카페"], sounds: ["trending-sound-1"] }
    }
  };

  return sources.reduce((acc, source) => {
    acc[source] = mockData[source] || {};
    return acc;
  }, {} as Record<string, any>);
};