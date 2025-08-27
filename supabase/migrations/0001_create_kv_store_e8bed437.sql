CREATE TABLE IF NOT EXISTS kv_store_e8bed437 (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL
);

-- Helpful index for prefix scans if needed later
CREATE INDEX IF NOT EXISTS idx_kv_store_key_prefix ON kv_store_e8bed437 (key text_pattern_ops);


