import { useBlogType } from "vuepress-plugin-blog2/lib/client";
import { inject, provide } from "vue";

import type { BlogTypeData } from "vuepress-plugin-blog2/lib/client";
import type { ComputedRef, InjectionKey } from "vue";
import type { ArticleMeta } from "../../../shared";

export type EncryptedArticlesRef = ComputedRef<BlogTypeData<ArticleMeta>>;

export const encryptedArticlesSymbol: InjectionKey<EncryptedArticlesRef> =
  Symbol.for("encryptedArticles");

/**
 * Inject encryptedArticles
 */
export const useEncryptedArticles = (): EncryptedArticlesRef => {
  const encryptedArticles = inject(encryptedArticlesSymbol);

  if (!encryptedArticles) {
    throw new Error("useEncryptedArticles() is called without provider.");
  }

  return encryptedArticles;
};

/**
 * Provide encryptedArticles
 */
export const setupEncryptedArticles = (): void => {
  const encryptedArticles = useBlogType<ArticleMeta>("encrypted");

  provide(encryptedArticlesSymbol, encryptedArticles);
};
