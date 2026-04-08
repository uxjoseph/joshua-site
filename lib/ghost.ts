/**
 * Ghost Content API client for joshua.site
 */

const GHOST_URL = import.meta.env.VITE_GHOST_URL;
const GHOST_KEY = import.meta.env.VITE_GHOST_CONTENT_API_KEY;

if (!GHOST_URL || !GHOST_KEY) {
  console.warn('[ghost] VITE_GHOST_URL or VITE_GHOST_CONTENT_API_KEY is not set in .env.local');
}

export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  feature_image: string;
  featured: boolean;
  published_at: string;
  updated_at: string;
  url: string;
  reading_time?: number;
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

export const getPosts = async (limit: number = 10, page: number = 1): Promise<GhostPost[]> => {
  try {
    const response = await fetch(
      `${GHOST_URL}/ghost/api/content/posts/?key=${GHOST_KEY}&limit=${limit}&page=${page}&include=tags`
    );
    if (!response.ok) {
      throw new Error(`Ghost API responded with ${response.status}`);
    }
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching Ghost posts:', error);
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<GhostPost | null> => {
  try {
    const response = await fetch(
      `${GHOST_URL}/ghost/api/content/posts/slug/${slug}/?key=${GHOST_KEY}&include=tags`
    );
    if (!response.ok) {
      throw new Error(`Ghost API responded with ${response.status}`);
    }
    const data = await response.json();
    return data.posts?.[0] || null;
  } catch (error) {
    console.error(`Error fetching Ghost post with slug ${slug}:`, error);
    return null;
  }
};

/**
 * Subscribe an email to Ghost via the Members API magic link flow.
 * Ghost will email the visitor a confirmation link to complete signup.
 *
 * Ghost 5.x+ requires an integrity token: first GET /members/api/integrity-token/,
 * then POST /members/api/send-magic-link/ with that token in the body.
 */
export interface SubscribeResult {
  ok: boolean;
  error?: string;
}

const fetchIntegrityToken = async (): Promise<string | null> => {
  try {
    const res = await fetch(`${GHOST_URL}/members/api/integrity-token/`, {
      method: 'GET',
      headers: { Accept: 'text/plain' },
    });
    if (!res.ok) return null;
    return (await res.text()).trim();
  } catch {
    return null;
  }
};

export const subscribeMember = async (email: string): Promise<SubscribeResult> => {
  try {
    const integrityToken = await fetchIntegrityToken();

    const response = await fetch(`${GHOST_URL}/members/api/send-magic-link/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({
        email,
        emailType: 'signup',
        labels: [],
        name: '',
        honeypot: '',
        requestSrc: 'portal',
        autoRedirect: true,
        integrityToken,
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      let message = text || `HTTP ${response.status}`;
      try {
        const parsed = JSON.parse(text);
        message = parsed?.errors?.[0]?.message || message;
      } catch {
        /* not JSON */
      }
      return { ok: false, error: message };
    }
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { ok: false, error: message };
  }
};
