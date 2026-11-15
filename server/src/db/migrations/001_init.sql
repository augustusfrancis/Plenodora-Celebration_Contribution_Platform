CREATE TABLE users (
  id              BIGSERIAL PRIMARY KEY,
  name            TEXT NOT NULL,
  phone           TEXT UNIQUE,
  email           TEXT NOT NULL UNIQUE,
  password_hash   TEXT NOT NULL,
  profile_pic_url TEXT,
  upi_id          TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE events (
  id          BIGSERIAL PRIMARY KEY,
  host_id     BIGINT NOT NULL REFERENCES users(id),
  slug        TEXT NOT NULL UNIQUE,
  title       TEXT NOT NULL,
  event_date  DATE,
  message     TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE wishes (
  id            BIGSERIAL PRIMARY KEY,
  event_id      BIGINT NOT NULL REFERENCES events(id),
  title         TEXT NOT NULL,
  description   TEXT,
  image_url     TEXT,
  target_amount NUMERIC(12,2) CHECK (target_amount > 0),
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE contributions (
  id          BIGSERIAL PRIMARY KEY,
  event_id    BIGINT NOT NULL REFERENCES events(id),
  wish_id     BIGINT REFERENCES wishes(id),
  guest_name  TEXT NOT NULL,
  guest_phone TEXT,
  message     TEXT,
  house_name  TEXT,
  place       TEXT,
  amount      NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  status      TEXT NOT NULL DEFAULT 'pending'
              CHECK (status IN ('pending', 'paid', 'failed')),
  paid_at     TIMESTAMPTZ
);

CREATE TABLE buy_me (
  id           BIGSERIAL PRIMARY KEY,
  event_id     BIGINT NOT NULL REFERENCES events(id),
  product_name TEXT NOT NULL,
  image_url    TEXT,
  product_url  TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'available'
               CHECK (status IN ('available', 'claimed')),
  claimed_by   TEXT,
  claimed_at   TIMESTAMPTZ
);

CREATE INDEX ON events (host_id);
CREATE INDEX ON wishes (event_id);
CREATE INDEX ON contributions (event_id, status);
CREATE INDEX ON contributions (wish_id);
CREATE INDEX ON buy_me (event_id, status);
