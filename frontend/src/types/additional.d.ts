declare interface Window {
  requestIdleCallback: <T extends Function>(callback: T, options?: object) => {}
}

type articleTypeDirectory = {
  name: string;
  title: string;
  tags: string[];
  categories: string;
  info: string;
  time: string;
  desc: string;
  keywords: string[];
  updatedAt: string;
  url: string;
  dirUrl: string;
}

type articleType = articleTypeDirectory & { body: string };
declare module 'articleDist/*.json' {
  const value: Array<articleType> | Array<articleTypeDirectory>
  export default value
}
