import { createClient } from '@supabase/supabase-js'

// 환경변수를 우선 사용하고, 없으면 새 Supabase 프로젝트 값을 fallback으로 사용
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://rovkcrtpnknwdujebfca.supabase.co'
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvdmtjcnRwbmtud2R1amViZmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTY5NzEsImV4cCI6MjA3MDI5Mjk3MX0.Qh3pYcZTVntiGRRVJXDvgY_yXrIniGlJXO_Tq8Euq6M'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


