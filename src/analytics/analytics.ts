import Cookies from "js-cookie";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CONSENT_COOKIE = "cookieConsent";
const VISITOR_COOKIE = "analytics_vid";
const ANALYTICS_ENDPOINT = "/api/analytics.php"; // optional server-side collector (PHP)

type EventPayload = {
  event: string;
  data: Record<string, any>;
  url: string;
  timestamp: string;
  visitorId?: string;
};

let eventQueue: EventPayload[] = [];

function getVisitorId(): string {
  let id = Cookies.get(VISITOR_COOKIE);
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    Cookies.set(VISITOR_COOKIE, id, { expires: 365, path: "/" });
  }
  return id;
}

function getSavedConsent() {
  const raw = Cookies.get(CONSENT_COOKIE);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/* -----------------------------
   CORE: consent check
   - returns true only when analytics consent is granted
------------------------------*/
function canTrack(): boolean {
  const consent = getSavedConsent();
  return !!(consent && consent.analytics);
}

/* -----------------------------
   CORE: flush queue to server/provider
   - uses navigator.sendBeacon when available for unload-safe sending
------------------------------*/
function sendToServer(payload: EventPayload) {
  // Try sendBeacon first (best for unload), otherwise fetch
  try {
    const body = JSON.stringify(payload);
    if (navigator && (navigator as any).sendBeacon) {
      const ok = (navigator as any).sendBeacon(ANALYTICS_ENDPOINT, new Blob([body], { type: "application/json" }));
      if (ok) return Promise.resolve();
    }
  } catch (e) {
    // fall through to fetch
  }

  return fetch(ANALYTICS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(() => {}).catch(() => {});
}

function flushQueue() {
  if (!canTrack() || eventQueue.length === 0) return;

  const queue = eventQueue.slice();
  eventQueue = [];

  queue.forEach((ev) => {
    // best-effort: send to server (endpoint optional). Keep console fallback.
    if (typeof window !== "undefined") {
      console.log("[ANALYTICS] flush", ev);
    }
    // fire-and-forget
    sendToServer(ev);
  });
}

// listen to consent changes (CookieBanner emits a `cookieConsentChanged` CustomEvent)
if (typeof window !== "undefined") {
  window.addEventListener("cookieConsentChanged", () => {
    // when consent changes, try flushing queued events
    if (canTrack()) flushQueue();
  });
}

/* -----------------------------
   CORE: event tracker
   - queues events until consent is available
------------------------------*/
export function track(event: string, data: Record<string, any> = {}) {
  const payload: EventPayload = {
    event,
    data,
    url: typeof window !== "undefined" ? window.location.pathname : "",
    timestamp: new Date().toISOString(),
    visitorId: getVisitorId(),
  };

  // always store locally first
  eventQueue.push(payload);

  // if allowed, flush immediately
  if (canTrack()) {
    flushQueue();
  } else {
    if (typeof window !== "undefined") console.debug("[ANALYTICS] queued (no consent)", payload.event);
  }
}

/* -----------------------------
   CLICK TRACKING
------------------------------*/
export function trackClick(name: string, data?: Record<string, any>) {
  track("click", { name, ...data });
}

/* -----------------------------
   PAGE VIEW TRACKING (SPA-aware)
   - uses react-router location to fire on path changes
------------------------------*/
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    track("page_view", { path: location.pathname });
  }, [location.pathname]);
}

/* -----------------------------
   ARTICLE TRACKING
------------------------------*/
export function useArticleTracking(articleId?: string) {
  useEffect(() => {
    if (!articleId) return;
    track("article_view", { articleId });
  }, [articleId]);
}

/* -----------------------------
   SCROLL DEPTH TRACKING
   - fire once per threshold [25,50,75,100]
   - use rAF throttling
------------------------------*/
export function useScrollTracking() {
  useEffect(() => {
    let maxPercent = 0;
    const thresholds = [25, 50, 75, 100];
    let rafId: number | null = null;

    const check = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
      const percent = height > 0 ? Math.round((scrollTop / height) * 100) : 100;

      if (percent > maxPercent) {
        maxPercent = percent;
        thresholds.forEach((t) => {
          if (percent >= t && maxPercent >= t) {
            track("scroll_depth", { percent: t });
          }
        });
      }
      rafId = null;
    };

    const onScroll = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

/* -----------------------------
   TIME ON PAGE TRACKING
   - also sends on unload via sendBeacon when possible
------------------------------*/
export function useTimeTracking() {
  useEffect(() => {
    const start = Date.now();

    const send = () => {
      const seconds = Math.round((Date.now() - start) / 1000);
      track("time_on_page", { seconds });
      // try immediate flush on unload
      if (typeof navigator !== "undefined" && (navigator as any).sendBeacon && eventQueue.length > 0) {
        flushQueue();
      }
    };

    window.addEventListener("beforeunload", send);
    return () => {
      send();
      window.removeEventListener("beforeunload", send);
    };
  }, []);
}

/* -----------------------------
   NAVIGATION TRACKING (alias to page tracking)
------------------------------*/
export function useNavigationTracking() {
  usePageTracking();
}