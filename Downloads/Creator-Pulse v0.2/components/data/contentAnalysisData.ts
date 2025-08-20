// 상위 콘텐츠 10개 모의 데이터 생성
export const generateTopContentData = (product: any) => {
  return [
    {
      id: 1,
      title: `${product?.title || '제품'} 완전 분석! 이거 진짜 사야할까?`,
      creator: "테크리뷰어김",
      thumbnail: "/api/placeholder/320/180",
      duration: "12:45",
      views: "2.4M",
      likes: "128K", 
      comments: "18.7K",
      uploadDate: "2일 전",
      conversionRate: 8.5,
      revenue: "₩245M",
      score: 9.2,
      tags: ["리뷰", "분석", "추천"],
      insights: [
        "높은 전환율과 시청자 참여도",
        "상세한 제품 분석으로 신뢰성 확보",
        "댓글 반응이 매우 긍정적"
      ]
    },
    {
      id: 2,
      title: `${product?.title || '제품'} 언박싱 & 첫인상 솔직후기`,
      creator: "언박싱마니아",
      thumbnail: "/api/placeholder/320/180",
      duration: "8:32",
      views: "1.8M",
      likes: "95K",
      comments: "12.3K", 
      uploadDate: "5일 전",
      conversionRate: 7.2,
      revenue: "₩189M",
      score: 8.7,
      tags: ["언박싱", "첫인상", "후기"],
      insights: [
        "언박싱 콘텐츠의 높은 참여율",
        "첫인상 포커스로 구매 욕구 자극",
        "시각적 요소가 매우 효과적"
      ]
    },
    {
      id: 3,
      title: `이 ${product?.title || '제품'}로 내 일상이 바뀌었습니다`,
      creator: "라이프스타일구루",
      thumbnail: "/api/placeholder/320/180",
      duration: "15:20",
      views: "1.5M",
      likes: "87K",
      comments: "15.2K",
      uploadDate: "1주 전",
      conversionRate: 6.8,
      revenue: "₩156M",
      score: 8.4,
      tags: ["라이프스타일", "일상", "변화"],
      insights: [
        "개인적 경험 스토리로 감정적 연결",
        "일상 속 활용법으로 실용성 어필",
        "장기간 사용 후기로 신뢰도 높음"
      ]
    },
    {
      id: 4,
      title: `${product?.title || '제품'} vs 경쟁제품 5가지 비교분석`,
      creator: "비교분석전문가",
      thumbnail: "/api/placeholder/320/180",
      duration: "18:15",
      views: "1.2M",
      likes: "76K",
      comments: "9.8K",
      uploadDate: "3일 전",
      conversionRate: 9.1,
      revenue: "₩134M",
      score: 8.9,
      tags: ["비교", "분석", "가성비"],
      insights: [
        "비교 분석으로 객관적 판단 지원",
        "높은 전환율로 구매 결정에 영향",
        "전문적 분석으로 신뢰도 확보"
      ]
    },
    {
      id: 5,
      title: `${product?.title || '제품'} 숨겨진 기능 10가지 대공개`,
      creator: "제품마스터",
      thumbnail: "/api/placeholder/320/180",
      duration: "11:28",
      views: "980K",
      likes: "65K",
      comments: "8.1K",
      uploadDate: "4일 전",
      conversionRate: 5.9,
      revenue: "₩112M",
      score: 7.8,
      tags: ["팁", "활용법", "숨겨진기능"],
      insights: [
        "숨겨진 기능으로 호기심 자극",
        "실용적 팁으로 활용도 증가",
        "기존 사용자들의 재구매 유도"
      ]
    },
    {
      id: 6,
      title: `${product?.title || '제품'} 3개월 사용 후 솔직한 평가`,
      creator: "장기테스터",
      thumbnail: "/api/placeholder/320/180",
      duration: "13:45",
      views: "856K",
      likes: "58K",
      comments: "7.4K",
      uploadDate: "6일 전",
      conversionRate: 6.3,
      revenue: "₩98M",
      score: 8.1,
      tags: ["장기사용", "솔직후기", "평가"],
      insights: [
        "장기 사용 후기로 신뢰성 확보",
        "솔직한 평가로 구매 확신 제공",
        "내구성과 만족도 검증"
      ]
    },
    {
      id: 7,
      title: `${product?.title || '제품'} 이렇게 쓰면 안됩니다! 주의사항`,
      creator: "안전사용가이드",
      thumbnail: "/api/placeholder/320/180",
      duration: "9:12",
      views: "743K",
      likes: "52K",
      comments: "6.8K",
      uploadDate: "1주 전",
      conversionRate: 4.7,
      revenue: "₩87M",
      score: 7.5,
      tags: ["주의사항", "안전", "가이드"],
      insights: [
        "안전 사용법으로 책임감 어필",
        "주의사항 공유로 신뢰도 구축",
        "전문성으로 브랜드 이미지 향상"
      ]
    },
    {
      id: 8,
      title: `${product?.title || '제품'} 가격 변화 추이와 구매 타이밍`,
      creator: "가격분석러",
      thumbnail: "/api/placeholder/320/180",
      duration: "7:58",
      views: "692K",
      likes: "47K",
      comments: "5.9K",
      uploadDate: "3일 전",
      conversionRate: 7.8,
      revenue: "₩78M",
      score: 8.0,
      tags: ["가격", "할인", "구매타이밍"],
      insights: [
        "가격 정보로 구매 결정 촉진",
        "할인 타이밍 정보로 긴급성 조성",
        "경제적 구매 욕구 자극"
      ]
    },
    {
      id: 9,
      title: `${product?.title || '제품'} 커뮤니티 반응 모아봤습니다`,
      creator: "커뮤니티리포터",
      thumbnail: "/api/placeholder/320/180",
      duration: "10:33",
      views: "567K",
      likes: "41K",
      comments: "4.7K",
      uploadDate: "5일 전",
      conversionRate: 5.2,
      revenue: "₩65M",
      score: 7.3,
      tags: ["커뮤니티", "반응", "평점"],
      insights: [
        "사용자 반응으로 사회적 증명 제공",
        "다양한 의견으로 객관성 확보",
        "커뮤니티 신뢰도 활용"
      ]
    },
    {
      id: 10,
      title: `${product?.title || '제품'} DIY 커스터마이징 아이디어`,
      creator: "DIY크리에이터",
      thumbnail: "/api/placeholder/320/180",
      duration: "14:27",
      views: "445K",
      likes: "38K",
      comments: "3.8K",
      uploadDate: "1주 전",
      conversionRate: 4.1,
      revenue: "₩52M",
      score: 7.0,
      tags: ["DIY", "커스터마이징", "창의"],
      insights: [
        "창의적 활용법으로 차별화",
        "개인화 욕구 충족",
        "재미 요소로 참여도 증가"
      ]
    }
  ];
};