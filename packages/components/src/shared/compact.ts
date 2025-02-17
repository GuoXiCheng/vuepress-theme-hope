import type { ExactLocaleConfig } from "@vuepress/helper/shared";

/**
 * @deprecated Use `vuepress-plugin-auto-catalog` instead
 */
export interface CatalogLocaleData {
  /**
   * Catalog title text
   *
   * 目录标题文字
   */
  title: string;
}

/**
 * @deprecated Use `vuepress-plugin-auto-catalog` instead
 */
export type CatalogLocaleConfig = ExactLocaleConfig<CatalogLocaleData>;
