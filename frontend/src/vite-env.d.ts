/// <reference types="vite/client" />

type articleType = {
  name: string;
  title: string;
  tags: string[];
  categories: string;
  info: string;
  time: string;
  desc: string;
  keywords: string[];
  body?: string;
  updatedAt: string;
  url: string;
  dirUrl: string;
}
declare module 'articleDist/*.json' {
  const value: Array<articleType>
  export default value
}
