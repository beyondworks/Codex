import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import * as kakaoNotification from "./kakao-notification.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-e8bed437/health", (c) => {
  return c.json({ status: "ok" });
});

// 카카오톡 사용자 등록
app.post("/make-server-e8bed437/kakao/register", async (c) => {
  try {
    const { phoneNumber, kakaoId } = await c.req.json();
    
    if (!phoneNumber || !kakaoId) {
      return c.json({ error: "전화번호와 카카오ID가 필요합니다" }, 400);
    }
    
    const result = await kakaoNotification.registerKakaoUser(phoneNumber, kakaoId);
    
    if (result.success) {
      return c.json({ success: true, userId: result.userId });
    } else {
      return c.json({ error: result.error }, 500);
    }
  } catch (error) {
    console.error("카카오톡 사용자 등록 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

// 알림 설정 저장
app.post("/make-server-e8bed437/kakao/settings", async (c) => {
  try {
    const settings = await c.req.json();
    
    if (!settings.userId || !settings.phoneNumber) {
      return c.json({ error: "사용자 정보가 필요합니다" }, 400);
    }
    
    const result = await kakaoNotification.saveNotificationSettings(settings.userId, settings);
    
    if (result.success) {
      return c.json({ success: true });
    } else {
      return c.json({ error: result.error }, 500);
    }
  } catch (error) {
    console.error("알림 설정 저장 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

// 알림 설정 조회
app.get("/make-server-e8bed437/kakao/settings/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const settings = await kakaoNotification.getNotificationSettings(userId);
    
    if (settings) {
      return c.json(settings);
    } else {
      return c.json({ error: "설정을 찾을 수 없습니다" }, 404);
    }
  } catch (error) {
    console.error("알림 설정 조회 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

// 즉시 알림 발송 (테스트용)
app.post("/make-server-e8bed437/kakao/send", async (c) => {
  try {
    const { phoneNumber, templateType, data } = await c.req.json();
    
    if (!phoneNumber || !templateType || !data) {
      return c.json({ error: "전화번호, 템플릿 타입, 데이터가 필요합니다" }, 400);
    }
    
    const result = await kakaoNotification.sendKakaoMessage(phoneNumber, templateType, data);
    
    if (result.success) {
      return c.json({ success: true, messageId: result.messageId });
    } else {
      return c.json({ error: result.error }, 500);
    }
  } catch (error) {
    console.error("카카오톡 메시지 전송 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

// 알림 히스토리 조회
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

// 트렌드 알림 확인 (크론 작업용)
app.post("/make-server-e8bed437/kakao/check-trends", async (c) => {
  try {
    const result = await kakaoNotification.checkAndSendTrendAlerts();
    
    if (result.success) {
      return c.json({ success: true, message: "트렌드 알림 확인 완료" });
    } else {
      return c.json({ error: result.error }, 500);
    }
  } catch (error) {
    console.error("트렌드 알림 확인 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

// 주간 리포트 발송 (크론 작업용)
app.post("/make-server-e8bed437/kakao/weekly-reports", async (c) => {
  try {
    const result = await kakaoNotification.sendWeeklyReports();
    
    if (result.success) {
      return c.json({ success: true, message: "주간 리포트 발송 완료" });
    } else {
      return c.json({ error: result.error }, 500);
    }
  } catch (error) {
    console.error("주간 리포트 발송 오류:", error);
    return c.json({ error: "서버 오류가 발생했습니다" }, 500);
  }
});

Deno.serve(app.fetch);