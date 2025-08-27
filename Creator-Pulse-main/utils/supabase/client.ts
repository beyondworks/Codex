import { createClient } from '@supabase/supabase-js'

// 환경변수를 우선 사용하고, 없으면 하드코딩된 값을 fallback으로 사용
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://jprvfwkayhzfqqwbhold.supabase.co'
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwcnZmd2theWh6ZnFxd2Job2xkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTUzMTksImV4cCI6MjA3MDI5MTMxOX0.LpTi6IPPGBv5KEdNnEH9oU3_ybh6b6d5H7H5RlCU204'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


