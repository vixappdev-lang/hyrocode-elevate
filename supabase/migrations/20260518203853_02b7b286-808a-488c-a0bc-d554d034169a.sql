-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Admins read roles" ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Visitor events
CREATE TABLE public.visitor_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip text,
  country text,
  country_code text,
  region text,
  city text,
  lat double precision,
  lng double precision,
  timezone text,
  device text,
  os text,
  browser text,
  user_agent text,
  referrer text,
  path text,
  is_vpn boolean DEFAULT false,
  is_proxy boolean DEFAULT false,
  is_mobile boolean DEFAULT false,
  asn text,
  isp text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX visitor_events_created_at_idx ON public.visitor_events (created_at DESC);
CREATE INDEX visitor_events_country_idx ON public.visitor_events (country);

ALTER TABLE public.visitor_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read visitor events" ON public.visitor_events FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Site settings (key/value JSONB)
CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read pricing_buttons" ON public.site_settings FOR SELECT
  USING (key = 'pricing_buttons');

CREATE POLICY "Admins read all settings" ON public.site_settings FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Seed default pricing buttons settings
INSERT INTO public.site_settings (key, value) VALUES (
  'pricing_buttons',
  jsonb_build_object(
    'essencial', jsonb_build_object('url', '', 'label', 'QUERO ESSE'),
    'pro',       jsonb_build_object('url', '', 'label', 'QUERO ESSE'),
    'premium',   jsonb_build_object('url', '', 'label', 'QUERO ESSE')
  )
);