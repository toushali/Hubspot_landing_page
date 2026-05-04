-- ============================================================
-- hire.sdtcdigital.com — leads table
-- Runs on any Postgres 12+ (Supabase, Neon, RDS, self-hosted)
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Form fields (from the lead modal)
  full_name       VARCHAR(255) NOT NULL,
  email           VARCHAR(255) NOT NULL,
  company_website VARCHAR(500) NOT NULL,
  hubspot_need    VARCHAR(500),
  
  -- UTM capture
  utm_source      VARCHAR(255),
  utm_medium      VARCHAR(255),
  utm_campaign    VARCHAR(255),
  utm_content     VARCHAR(255),
  utm_term        VARCHAR(255),
  referrer        VARCHAR(500),
  
  -- Spam / abuse analysis
  hashed_ip       VARCHAR(64),     -- SHA-256 hex of IP, no raw IP stored
  user_agent      VARCHAR(500),
  
  -- Audit timestamps
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS leads_email_idx       ON leads (email);
CREATE INDEX IF NOT EXISTS leads_created_at_idx  ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_hashed_ip_idx   ON leads (hashed_ip);

-- Auto-update the updated_at column on row changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS leads_updated_at_trigger ON leads;
CREATE TRIGGER leads_updated_at_trigger
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();