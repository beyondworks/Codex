#!/bin/bash

# Creator Pulse 데이터베이스 시딩 스크립트
# 임시 RLS 정책을 사용하여 안전하게 데이터를 삽입합니다.

echo "🚀 Creator Pulse 데이터베이스 시딩 시작..."

# 데이터베이스 연결 정보
DB_URL="postgresql://postgres:@rovkcrtpnknwdujebfca.supabase.co:5432/postgres"

echo "1️⃣ 임시 INSERT 권한 정책 적용 중..."
psql "$DB_URL" -f scripts/temp-allow-inserts.sql

if [ $? -ne 0 ]; then
    echo "❌ 임시 정책 적용 실패"
    exit 1
fi

echo "2️⃣ 샘플 데이터 삽입 중..."
node scripts/seed-database.js

SEED_RESULT=$?

echo "3️⃣ 임시 정책 제거 중..."
psql "$DB_URL" -f scripts/remove-temp-policies.sql

if [ $SEED_RESULT -eq 0 ]; then
    echo "✅ 데이터베이스 시딩 완료!"
    echo "💫 이제 웹사이트에서 실시간 데이터를 확인할 수 있습니다."
else
    echo "❌ 데이터 시딩 중 오류 발생"
    exit 1
fi