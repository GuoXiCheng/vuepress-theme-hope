import defaultTheme from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress/cli";
import { blogPlugin } from "vuepress-plugin-blog2";

const base = <"/" | `/${string}/`>process.env["BASE"] || "/";

export default defineUserConfig({
  base,

  title: "Blog2",
  description: "Blog plugin for VuePress2",

  theme: defaultTheme({
    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/blog2/",

    navbar: [
      "/",
      {
        text: "Article",
        link: "/article/",
      },
      {
        text: "Category",
        link: "/category/",
      },
      {
        text: "Tag",
        link: "/tag/",
      },
      {
        text: "Timeline",
        link: "/timeline/",
      },
    ],
  }),

  plugins: [
    blogPlugin({
      // Only files under posts are articles
      filter: ({ filePathRelative }) =>
        filePathRelative ? filePathRelative.startsWith("posts/") : false,

      // Getting article info
      getInfo: ({ frontmatter, title, data }) => ({
        title,
        author: frontmatter["author"] || "",
        date: frontmatter.date || null,
        category: frontmatter["category"] || [],
        tag: frontmatter["tag"] || [],
        excerpt:
          // Support manually set excerpt through frontmatter
          typeof frontmatter["excerpt"] === "string"
            ? frontmatter["excerpt"]
            : data?.["excerpt"] || "",
      }),

      // Generate excerpt for all pages excerpt those users choose to disable
      excerptFilter: ({ frontmatter }) =>
        !frontmatter["home"] &&
        frontmatter["excerpt"] !== false &&
        typeof frontmatter["excerpt"] !== "string",

      category: [
        {
          key: "category",
          getter: (page): string[] =>
            <string[]>page.frontmatter["category"] || [],
          layout: "Category",
          itemLayout: "Category",
          frontmatter: (): Record<string, unknown> => ({
            title: "Categories",
            sidebar: false,
          }),
          itemFrontmatter: (name): Record<string, unknown> => ({
            title: `Category ${name}`,
            sidebar: false,
          }),
        },
        {
          key: "tag",
          getter: (page): string[] => <string[]>page.frontmatter["tag"] || [],
          layout: "Tag",
          itemLayout: "Tag",
          frontmatter: (): Record<string, unknown> => ({
            title: "Tags",
            sidebar: false,
          }),
          itemFrontmatter: (name): Record<string, unknown> => ({
            title: `Tag ${name}`,
            sidebar: false,
          }),
        },
      ],

      type: [
        {
          key: "article",
          // Remove archive articles
          filter: (page): boolean => !page.frontmatter["archive"],
          path: "/article/",
          layout: "Article",
          frontmatter: (): Record<string, unknown> => ({
            title: "Articles",
            sidebar: false,
          }),
          // Sort pages with time and sticky
          sorter: (pageA, pageB): number => {
            if (pageA.frontmatter["sticky"] && pageB.frontmatter["sticky"])
              return (
                (pageB.frontmatter["sticky"] as number) -
                (pageA.frontmatter["sticky"] as number)
              );

            if (pageA.frontmatter["sticky"] && !pageB.frontmatter["sticky"])
              return -1;

            if (!pageA.frontmatter["sticky"] && pageB.frontmatter["sticky"])
              return 1;

            if (!pageB.frontmatter.date) return 1;
            if (!pageA.frontmatter.date) return -1;

            return (
              new Date(pageB.frontmatter.date).getTime() -
              new Date(pageA.frontmatter.date).getTime()
            );
          },
        },
        {
          key: "timeline",
          // Only article with date should be added to timeline
          filter: (page): boolean => page.frontmatter.date instanceof Date,
          // Sort pages with time
          sorter: (pageA, pageB): number =>
            new Date(pageB.frontmatter.date as Date).getTime() -
            new Date(pageA.frontmatter.date as Date).getTime(),
          path: "/timeline/",
          layout: "Timeline",
          frontmatter: (): Record<string, unknown> => ({
            title: "Timeline",
            sidebar: false,
          }),
        },
      ],
      hotReload: true,
    }),
  ],
});
