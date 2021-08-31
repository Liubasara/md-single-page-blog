# 新博客单页应用

技术栈：TypeScript + gulp + Vite + Vue3

- node: v14.12.0
- npm: 6.14.8
- yarn: 1.22.10

TODOLIST：

- Markdown 文章生成对应 JS
  - ~~directory~~
    - ~~directory中记录文章的相对路径，页面中通过 /static/article + 路径来访问~~
  - ~~所有文章内容（prefetch）~~
  - ~~单独文章内容~~

- 博客静态页面（响应式页面）
  - ~~首页~~
  - ~~TAG 功能~~
  - ~~分类功能~~
  - ~~搜索功能~~
  - ~~preload/prefetch 优化~~
  - 优化：service worker缓存全部文章内容？
  - 优化：
    > https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html

    使用github action进行ci/cd触发部署？？是否可行：
    - 在某条分支上提交dist文件夹，每次本地构建后进行部署？
    - 或者进一步在 article 仓库加actions，article push 之后触发博客的 push 钩子进行构建？

- jsonp API 提供

- 定时任务后台
  - 定时拉取文章
  - 定时构建并推送 githubPage 仓库

> **参考资料**：
>
> 样式功能原型参考：
>
> - [Cofess - Web Developer & Designer](https://blog.cofess.com/)
>
> 如何使用 spawn 子进程并保留原输出颜色：
>
> - [node.js - preserve color when executing child_process.spawn - Stack Overflow](https://stackoverflow.com/questions/7725809/preserve-color-when-executing-child-process-spawn#answer-43375301)
> - [在 spawn 的子进程中保持命令行颜色](https://kohpoll.github.io/blog/2016/09/15/spawn-and-terminal-color/)

