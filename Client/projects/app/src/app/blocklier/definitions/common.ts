export const helpUrlBuilder =
  (scope: string) =>
  (id: string): string =>
    `https://pro.autojs.org/docs/#/zh-cn/${scope}?id=${id}`;
