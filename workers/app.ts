import { getAssetFromKV, serveSinglePageApp } from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST'; // Wranglerがビルド時に解決

const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(
    request: Request,
    env: { __STATIC_CONTENT: Fetcher }, // Wranglerが [site] 設定に基づいてバインド
    ctx: ExecutionContext
  ): Promise<Response> {
    try {
      const response = await getAssetFromKV(
        {
          request,
          waitUntil: (promise) => ctx.waitUntil(promise),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
          mapRequestToAsset: serveSinglePageApp, // これが重要
        }
      );
      return response;
    } catch (e) {
      // アセットが見つからない場合など (通常 serveSinglePageApp が index.html を返す)
      // もし index.html も見つからない場合は、ここでカスタムの404ページを返すこともできる
      // 通常は、serveSinglePageApp が index.html を返そうとするため、
      // ここに到達するのは設定ミスなどで index.html が KV にない場合など
      let pathname = new URL(request.url).pathname;
      return new Response(`Asset ${pathname} not found`, {
        status: 404,
        statusText: 'not found',
      });
    }
  },
};

// Env 型の定義 (必要に応じて wrangler.toml の bindings に合わせて拡張)
interface Env {
  __STATIC_CONTENT: Fetcher;
  // 他のバインディングがあればここに追加 (例: MY_KV_NAMESPACE: KVNamespace;)
}
