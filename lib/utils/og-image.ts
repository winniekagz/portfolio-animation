
export async function fetchOgImage(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 },
      // Twitterbot UA causes Medium to include og:image in the HTML response
      headers: { "User-Agent": "Twitterbot/1.0" },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const html = await res.text();
    const match =
      /<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i.exec(html) ||
      /<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i.exec(html);
    return match ? match[1] : null;
  } catch {
    clearTimeout(timer);
    return null;
  }
}
