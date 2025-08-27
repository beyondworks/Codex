import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "../server/kv_store.tsx";
import * as kakaoNotification from "../server/kakao-notification.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const app = new Hono();

// Logger
app.use('*', logger(console.log));

// CORS (제한된 오리진만 허용)
const allowedOrigins = new Set<string>([
  "https://void-ethics-85191026.figma.site",
  "http://localhost:5173",
  "http://localhost:3000",
]);

app.use(
  "/*",
  cors({
    origin: (origin) => {
      if (!origin) return "https://void-ethics-85191026.figma.site";
      if (allowedOrigins.has(origin)) return origin;
      if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return origin; // allow Vercel preview/prod
      return "https://void-ethics-85191026.figma.site";
    },
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// 간단한 토큰 검증 (Supabase anon key와 일치 여부 확인)
app.use("/kakao/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  const expected = Deno.env.get("SB_ANON_KEY") || "";

  if (!expected || token !== expected) {
    return c.json({ error: "unauthorized" }, 401);
  }
  await next();
});

// Duplicate auth for prefixed routes (some platforms may forward full path)
app.use("/make-server-e8bed437/kakao/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  const expected = Deno.env.get("SB_ANON_KEY") || "";

  if (!expected || token !== expected) {
    return c.json({ error: "unauthorized" }, 401);
  }
  await next();
});

// Ingest token middleware
const verifyIngest = async (c: any, next: any) => {
  const authHeader = c.req.header("Authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  const expected = Deno.env.get("SB_INGEST_TOKEN") || "";
  if (!expected || token !== expected) {
    return c.json({ error: "unauthorized" }, 401);
  }
  await next();
};
app.use("/ingest/*", verifyIngest);
app.use("/make-server-e8bed437/ingest/*", verifyIngest);

// Supabase admin client for writes
const admin = () => createClient(
  Deno.env.get("SB_URL")!,
  Deno.env.get("SB_SERVICE_ROLE_KEY")!
);

async function replaceTable(table: string, rows: any[]) {
  const supabase = admin();
  // delete all rows
  const del = await supabase.from(table).delete().neq("id", -1);
  if (del.error) throw new Error(del.error.message);
  if (!rows?.length) return { count: 0 };
  const ins = await supabase.from(table).insert(rows);
  if (ins.error) throw new Error(ins.error.message);
  return { count: rows.length };
}

// Health check
app.get("/health", (c) => c.json({ status: "ok" }));

// Duplicate health for prefixed path
app.get("/make-server-e8bed437/health", (c) => c.json({ status: "ok" }));

// --- YouTube Trends Ingest ---
type YtVideo = { id: string; title: string; thumbnails?: { url: string }; views: number; channelTitle?: string; categoryId?: string; publishedAt?: string };

async function fetchYoutubeVideos(query: string, regionCode: string, maxResults: number, apiKey: string): Promise<YtVideo[]> {
  const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
  searchUrl.searchParams.set('part', 'snippet');
  searchUrl.searchParams.set('type', 'video');
  searchUrl.searchParams.set('q', query);
  if (regionCode) searchUrl.searchParams.set('regionCode', regionCode);
  searchUrl.searchParams.set('maxResults', String(Math.min(Math.max(maxResults || 10, 1), 25)));
  searchUrl.searchParams.set('key', apiKey);
  const searchRes = await fetch(searchUrl.toString());
  const searchJson = await searchRes.json();
  const ids: string[] = (searchJson.items || []).map((it: any) => it.id?.videoId).filter(Boolean);
  if (ids.length === 0) return [];

  const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
  videosUrl.searchParams.set('part', 'snippet,statistics');
  videosUrl.searchParams.set('id', ids.join(','));
  videosUrl.searchParams.set('key', apiKey);
  const videosRes = await fetch(videosUrl.toString());
  const videosJson = await videosRes.json();
  const videos: YtVideo[] = (videosJson.items || []).map((v: any) => ({
    id: v.id,
    title: v.snippet?.title || '',
    thumbnails: { url: v.snippet?.thumbnails?.medium?.url || v.snippet?.thumbnails?.default?.url },
    views: Number(v.statistics?.viewCount || 0),
    channelTitle: v.snippet?.channelTitle,
    categoryId: v.snippet?.categoryId,
    publishedAt: v.snippet?.publishedAt,
  }));
  return videos;
}

async function fetchVideoById(videoId: string, apiKey: string) {
  const url = new URL('https://www.googleapis.com/youtube/v3/videos');
  url.searchParams.set('part', 'snippet,statistics');
  url.searchParams.set('id', videoId);
  url.searchParams.set('key', apiKey);
  const res = await fetch(url.toString());
  const json = await res.json();
  const v = json?.items?.[0];
  if (!v) return null;
  return {
    id: v.id,
    title: v.snippet?.title,
    description: v.snippet?.description,
    channelId: v.snippet?.channelId,
    channelTitle: v.snippet?.channelTitle,
    publishedAt: v.snippet?.publishedAt,
    thumbnails: v.snippet?.thumbnails,
    views: Number(v.statistics?.viewCount || 0),
    likes: Number(v.statistics?.likeCount || 0),
    comments: Number(v.statistics?.commentCount || 0),
    categoryId: v.snippet?.categoryId,
  };
}

async function fetchRelated(videoId: string, apiKey: string, maxResults = 8) {
  const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
  searchUrl.searchParams.set('part', 'snippet');
  searchUrl.searchParams.set('type', 'video');
  searchUrl.searchParams.set('relatedToVideoId', videoId);
  searchUrl.searchParams.set('maxResults', String(Math.min(Math.max(maxResults, 1), 25)));
  searchUrl.searchParams.set('key', apiKey);
  const sRes = await fetch(searchUrl.toString());
  const sJson = await sRes.json();
  const ids: string[] = (sJson.items || []).map((it: any) => it.id?.videoId).filter(Boolean);
  if (!ids.length) return [];
  const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
  videosUrl.searchParams.set('part', 'snippet,statistics');
  videosUrl.searchParams.set('id', ids.join(','));
  videosUrl.searchParams.set('key', apiKey);
  const vRes = await fetch(videosUrl.toString());
  const vJson = await vRes.json();
  return (vJson.items || []).map((v: any) => ({
    id: v.id,
    title: v.snippet?.title,
    views: Number(v.statistics?.viewCount || 0),
    channelId: v.snippet?.channelId,
    channelTitle: v.snippet?.channelTitle,
  }));
}

async function fetchChannels(channelIds: string[], apiKey: string) {
  if (!channelIds.length) return [] as any[];
  const url = new URL('https://www.googleapis.com/youtube/v3/channels');
  url.searchParams.set('part', 'snippet,statistics');
  url.searchParams.set('id', channelIds.join(','));
  url.searchParams.set('key', apiKey);
  const res = await fetch(url.toString());
  const json = await res.json();
  return (json.items || []).map((c: any) => ({
    id: c.id,
    title: c.snippet?.title,
    subscribers: Number(c.statistics?.subscriberCount || 0),
    videos: Number(c.statistics?.videoCount || 0),
  }));
}

app.post('/ingest/youtube-trends', async (c) => {
  try {
    const apiKey = Deno.env.get('YT_API_KEY') || '';
    if (!apiKey) return c.json({ error: 'missing_api_key' }, 400);
    const body = await c.req.json().catch(() => ({}));
    const queries: string[] = Array.isArray(body.queries) && body.queries.length ? body.queries : ['무선 블루투스 이어폰','게이밍 키보드'];
    const regionCode: string = body.regionCode || 'KR';
    const maxResults: number = body.maxResults || 10;

    // aggregate
    const all: YtVideo[] = [];
    for (const q of queries) {
      const vids = await fetchYoutubeVideos(q, regionCode, maxResults, apiKey);
      all.push(...vids);
    }
    // sort by views desc
    all.sort((a,b) => b.views - a.views);

    // Prepare rows
    const trendRows = all.slice(0, 20).map((v) => ({
      title: v.title,
      category: 'YouTube',
      growth: Math.round(((v.views / Math.max(1, all[all.length-1]?.views || v.views)) - 1) * 100),
      views: v.views,
      revenue: Math.round(v.views * 0.0025),
      trend: 'up',
      video_id: v.id,
      channel_title: v.channelTitle || '',
      category_id: v.categoryId || '',
      category_name: 'YouTube',
      published_at: v.publishedAt ? new Date(v.publishedAt).toISOString() : null,
      thumbnail_url: v.thumbnails?.url || null,
    }));
    const productRows = all.slice(0, 15).map((v, i) => ({
      rank: i + 1,
      title: v.title,
      price: 0,
      rating: 0,
      sales: v.views,
      image_url: v.thumbnails?.url,
    }));
    const insightsRows = [
      { title: 'YouTube 실시간 트렌드 갱신', description: `${queries[0]} 등 ${queries.length}개 키워드 기준`, confidence: 90, timeframe: '즉시', category: '트렌드' },
    ];

    const supabase = admin();
    // Replace tables
    await replaceTable('trend_items', trendRows);
    await replaceTable('popular_products_v2', productRows);
    await replaceTable('market_insights', insightsRows);

    return c.json({ success: true, trends: trendRows.length, products: productRows.length, insights: insightsRows.length });
  } catch (e) {
    console.error('ingest youtube-trends error', e);
    return c.json({ error: 'ingest_failed', detail: String(e) }, 500);
  }
});
app.post('/make-server-e8bed437/ingest/youtube-trends', async (c) => {
  return app.fetch(new Request(c.req.url.replace('/make-server-e8bed437', ''), c.req.raw));
});

// Video details for modal (forecast, competitors, top creators, insights)
app.get('/trends/video-details', async (c) => {
  try {
    const apiKey = Deno.env.get('YT_API_KEY') || '';
    if (!apiKey) return c.json({ error: 'missing_api_key' }, 400);
    const videoId = c.req.query('videoId') || '';
    if (!videoId) return c.json({ error: 'missing_videoId' }, 400);

    const base = await fetchVideoById(videoId, apiKey);
    if (!base) return c.json({ error: 'not_found' }, 404);

    const related = await fetchRelated(videoId, apiKey, 10);
    const competitors = [...related]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)
      .map((v) => ({ name: v.title, growth: Math.round((v.views / Math.max(1, base.views) - 1) * 100), market: Math.round((v.views / Math.max(1, base.views + v.views)) * 1000) / 10 }));

    const channelMap = new Map<string, string>();
    related.forEach(r => channelMap.set(r.channelId, r.channelTitle));
    if (base.channelId) channelMap.set(base.channelId, base.channelTitle);
    const channels = await fetchChannels(Array.from(channelMap.keys()), apiKey);
    const topCreators = channels
      .sort((a, b) => b.subscribers - a.subscribers)
      .slice(0, 3)
      .map((c, i) => ({ name: c.title, subscribers: c.subscribers, revenue: `₩${Math.round(c.subscribers * 0.01).toLocaleString()}`, growth: `+${Math.min(50, Math.round(Math.log10(Math.max(10, c.subscribers)) * 10))}%` }));

    const insights: string[] = [];
    if (base.publishedAt) {
      const h = new Date(base.publishedAt).getHours();
      if (h >= 19 && h <= 22) insights.push('오후 7-10시 업로드 타이밍이 유리합니다.');
    }
    if ((base.title || '').match(/비교|언박싱|후기/)) insights.push('언박싱/비교 리뷰가 전환에 유리합니다.');
    insights.push('가격/혜택 정보를 썸네일/타이틀에 포함하면 CTR 상승이 기대됩니다.');

    const nextWeek = `+${Math.min(60, Math.max(5, Math.round((related.length ? 15 : 25) + (base.likes / Math.max(1, base.views)) * 100)))}%`;
    const nextMonth = `+${Math.min(90, Math.max(10, Math.round((related.length ? 25 : 35) + (base.comments / Math.max(1, base.views)) * 200)))}%`;
    const confidence = Math.min(95, 60 + Math.round(Math.min(40, Math.log10(Math.max(10, base.views)) * 12)));

    return c.json({
      description: base.description,
      forecast: { nextWeek, nextMonth, confidence },
      competitorGrowth: competitors,
      topCreators,
      insights,
    });
  } catch (e) {
    console.error('video-details error', e);
    return c.json({ error: 'failed', detail: String(e) }, 500);
  }
});
app.get('/make-server-e8bed437/trends/video-details', async (c) => {
  return app.fetch(new Request(c.req.url.replace('/make-server-e8bed437', ''), c.req.raw));
});

// Ingest: dashboard KPIs
app.post("/ingest/kpis", async (c) => {
  try {
    const body = await c.req.json();
    const items = Array.isArray(body?.items) ? body.items : [];
    const rows = items.map((x: any) => ({
      title: String(x.title ?? ""),
      value: String(x.value ?? ""),
      change: String(x.change ?? ""),
      color: String(x.color ?? "text-green-600"),
      bg_color: String(x.bg_color ?? "bg-green-50"),
    }));
    const res = await replaceTable("dashboard_kpis", rows);
    return c.json({ success: true, ...res });
  } catch (e) {
    console.error("ingest kpis error", e);
    return c.json({ error: "ingest_failed" }, 500);
  }
});
app.post("/make-server-e8bed437/ingest/kpis", async (c) => {
  return app.fetch(new Request(c.req.url.replace("/make-server-e8bed437", ""), c.req.raw));
});

// Ingest: popular categories
app.post("/ingest/popular-categories", async (c) => {
  try {
    const body = await c.req.json();
    const items = Array.isArray(body?.items) ? body.items : [];
    const rows = items.map((x: any) => ({
      name: String(x.name ?? ""),
      share: Number(x.share ?? 0),
      change: Number(x.change ?? 0),
      color: String(x.color ?? "bg-blue-500"),
    }));
    const res = await replaceTable("popular_categories", rows);
    return c.json({ success: true, ...res });
  } catch (e) {
    console.error("ingest popular-categories error", e);
    return c.json({ error: "ingest_failed" }, 500);
  }
});
app.post("/make-server-e8bed437/ingest/popular-categories", async (c) => {
  return app.fetch(new Request(c.req.url.replace("/make-server-e8bed437", ""), c.req.raw));
});

// Ingest: popular products
app.post("/ingest/popular-products", async (c) => {
  try {
    const body = await c.req.json();
    const items = Array.isArray(body?.items) ? body.items : [];
    const rows = items.map((x: any) => ({
      rank: Number(x.rank ?? 0),
      title: String(x.title ?? ""),
      price: Number(x.price ?? 0),
      rating: Number(x.rating ?? 0),
      sales: Number(x.sales ?? 0),
      growth: Number(x.growth ?? 0),
      // Optional columns omitted to tolerate schema differences
    }));
    const res = await replaceTable("popular_products_v2", rows);
    return c.json({ success: true, ...res });
  } catch (e) {
    console.error("ingest popular-products error", e);
    return c.json({ error: "ingest_failed", detail: String(e) }, 500);
  }
});
app.post("/make-server-e8bed437/ingest/popular-products", async (c) => {
  return app.fetch(new Request(c.req.url.replace("/make-server-e8bed437", ""), c.req.raw));
});

// Ingest: market insights
app.post("/ingest/market-insights", async (c) => {
  try {
    const body = await c.req.json();
    const items = Array.isArray(body?.items) ? body.items : [];
    const rows = items.map((x: any) => ({
      title: String(x.title ?? ""),
      description: String(x.description ?? ""),
      confidence: Number(x.confidence ?? 0),
      timeframe: String(x.timeframe ?? ""),
      category: String(x.category ?? ""),
      // priority omitted to tolerate schema differences
    }));
    const res = await replaceTable("market_insights", rows);
    return c.json({ success: true, ...res });
  } catch (e) {
    console.error("ingest market-insights error", e);
    return c.json({ error: "ingest_failed", detail: String(e) }, 500);
  }
});
app.post("/make-server-e8bed437/ingest/market-insights", async (c) => {
  return app.fetch(new Request(c.req.url.replace("/make-server-e8bed437", ""), c.req.raw));
});

// 카카오톡 사용자 등록
app.post("/kakao/register", async (c) => {
  try {
    const { phoneNumber, kakaoId } = await c.req.json();
    if (!phoneNumber || !kakaoId) return c.json({ error: "전화번호와 카카오ID가 필요합니다" }, 400);

    const result = await kakaoNotification.registerKakaoUser(phoneNumber, kakaoId);
    return result.success
      ? c.json({ success: true, userId: result.userId })
      : c.json({ error: result.error }, 500);
  } catch (error) {
    console.error("카카오톡 사용자 등록 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

// Duplicate routes for prefixed path
app.post("/make-server-e8bed437/kakao/register", async (c) => {
  try {
    const { phoneNumber, kakaoId } = await c.req.json();
    if (!phoneNumber || !kakaoId) return c.json({ error: "전화번호와 카카오ID가 필요합니다" }, 400);

    const result = await kakaoNotification.registerKakaoUser(phoneNumber, kakaoId);
    return result.success
      ? c.json({ success: true, userId: result.userId })
      : c.json({ error: result.error }, 500);
  } catch (error) {
    console.error("카카오톡 사용자 등록 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

// 알림 설정 저장
app.post("/kakao/settings", async (c) => {
  try {
    const settings = await c.req.json();
    if (!settings.userId || !settings.phoneNumber) return c.json({ error: "사용자 정보가 필요합니다" }, 400);

    const result = await kakaoNotification.saveNotificationSettings(settings.userId, settings);
    return result.success ? c.json({ success: true }) : c.json({ error: result.error }, 500);
  } catch (error) {
    console.error("알림 설정 저장 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

app.post("/make-server-e8bed437/kakao/settings", async (c) => {
  try {
    const settings = await c.req.json();
    if (!settings.userId || !settings.phoneNumber) return c.json({ error: "사용자 정보가 필요합니다" }, 400);

    const result = await kakaoNotification.saveNotificationSettings(settings.userId, settings);
    return result.success ? c.json({ success: true }) : c.json({ error: result.error }, 500);
  } catch (error) {
    console.error("알림 설정 저장 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

// 알림 설정 조회
app.get("/kakao/settings/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const settings = await kakaoNotification.getNotificationSettings(userId);
    return settings ? c.json(settings) : c.json({ error: "설정을 찾을 수 없습니다" }, 404);
  } catch (error) {
    console.error("알림 설정 조회 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

app.get("/make-server-e8bed437/kakao/settings/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const settings = await kakaoNotification.getNotificationSettings(userId);
    return settings ? c.json(settings) : c.json({ error: "설정을 찾을 수 없습니다" }, 404);
  } catch (error) {
    console.error("알림 설정 조회 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

// 즉시 알림 발송
app.post("/kakao/send", async (c) => {
  try {
    const { phoneNumber, templateType, data } = await c.req.json();
    if (!phoneNumber || !templateType || !data) return c.json({ error: "전화번호, 템플릿 타입, 데이터가 필요합니다" }, 400);

    const result = await kakaoNotification.sendKakaoMessage(phoneNumber, templateType, data);
    return result.success ? c.json({ success: true, messageId: result.messageId }) : c.json({ error: result.error }, 500);
  } catch (error) {
    console.error("카카오톡 메시지 전송 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

app.post("/make-server-e8bed437/kakao/send", async (c) => {
  try {
    const { phoneNumber, templateType, data } = await c.req.json();
    if (!phoneNumber || !templateType || !data) return c.json({ error: "전화번호, 템플릿 타입, 데이터가 필요합니다" }, 400);

    const result = await kakaoNotification.sendKakaoMessage(phoneNumber, templateType, data);
    return result.success ? c.json({ success: true, messageId: result.messageId }) : c.json({ error: result.error }, 500);
  } catch (error) {
    console.error("카카오톡 메시지 전송 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

// 알림 히스토리 조회
app.get("/kakao/history/:phoneNumber", async (c) => {
  try {
    const phoneNumber = c.req.param("phoneNumber");
    const limit = parseInt(c.req.query("limit") || "10");
    const history = await kakaoNotification.getNotificationHistory(phoneNumber, limit);
    return c.json(history);
  } catch (error) {
    console.error("알림 히스토리 조회 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

app.get("/make-server-e8bed437/kakao/history/:phoneNumber", async (c) => {
  try {
    const phoneNumber = c.req.param("phoneNumber");
    const limit = parseInt(c.req.query("limit") || "10");
    const history = await kakaoNotification.getNotificationHistory(phoneNumber, limit);
    return c.json(history);
  } catch (error) {
    console.error("알림 히스토리 조회 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

// 트렌드 알림 확인 (크론)
app.post("/kakao/check-trends", async (c) => {
  try {
    const result = await kakaoNotification.checkAndSendTrendAlerts();
    return result.success ? c.json({ success: true, message: "트렌드 알림 확인 완료" }) : c.json({ error: result.error }, 500);
  } catch (error) {
    console.error("트렌드 알림 확인 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

app.post("/make-server-e8bed437/kakao/check-trends", async (c) => {
  try {
    const result = await kakaoNotification.checkAndSendTrendAlerts();
    return result.success ? c.json({ success: true, message: "트렌드 알림 확인 완료" }) : c.json({ error: result.error }, 500);
  } catch (error) {
    console.error("트렌드 알림 확인 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

// 주간 리포트 발송 (크론)
app.post("/kakao/weekly-reports", async (c) => {
  try {
    const result = await kakaoNotification.sendWeeklyReports();
    return result.success ? c.json({ success: true, message: "주간 리포트 발송 완료" }) : c.json({ error: result.error }, 500);
  } catch (error) {
    console.error("주간 리포트 발송 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

app.post("/make-server-e8bed437/kakao/weekly-reports", async (c) => {
  try {
    const result = await kakaoNotification.sendWeeklyReports();
    return result.success ? c.json({ success: true, message: "주간 리포트 발송 완료" }) : c.json({ error: result.error }, 500);
  } catch (error) {
    console.error("주간 리포트 발송 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

Deno.serve(app.fetch);


