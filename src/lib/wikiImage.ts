/**
 * Wikimedia Commons, tarayıcı olmayan (ör. OkHttp'nin varsayılan) User-Agent'larla gelen
 * istekleri 403 ile engelliyor. Görsel isteklerine tarayıcı benzeri bir User-Agent ekleyerek
 * bunu aşıyoruz.
 */
export const WIKIMEDIA_IMAGE_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
};

export function wikiImageSource(uri: string) {
  return { uri, headers: WIKIMEDIA_IMAGE_HEADERS };
}
