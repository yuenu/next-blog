---
title: React如何實現Vue的keep-alive功能？ 初探 React Router v6
date: '2023-01-17'
tags: react react-router
---

![react-router ](/images/post/explore-react-router-v6/react-router.jpeg)

### 專案上需要用到 cache 頁面

最近剛好有個需求是在某些頁面的情況之下，

使用者從 A 畫面 -> 跳至 B 畫面 -> 再回到 A 畫面時，scroll 的狀態要維持在原本的位置，

有玩過 Vue 的人就知道這用[Vue.js](https://vuejs.org/)的 keep-alive 很容易就可以實現了，

然而此專案是用 React class component 寫的，所以選擇不多，有 CJY0208 開源的 `React Activation` 、 `react-router-cache-route`

最後選擇用[react-router-cache-route](https://github.com/CJY0208/react-router-cache-route)來實現此功能，因為有支援 class component 的相關生命週期可以使用以及所需 cache 的頁面不是很多

它的原理就是在要 cache 的這個頁面外層加個 div 然後切換此頁面時在此 div 設置 display: none; 切換到 cache 的頁面時再移除 display: none;就行了

思路很簡單，不過如果要 cache 的頁面越來越多的情況下，html 的結構會越長越大(因為沒有 unmounted component)，這實在不是個好辦法

### Vue.js 的 keep-alive

之後開始研究了 Vue.js 的 keep-alive 是如何實現的， [源碼在此](https://github.com/vuejs/vue/blob/main/src/core/components/keep-alive.ts)

而 keep-alive 是透過 [LRU cache](https://josephjsf2.github.io/data/structure/and/algorithm/2020/05/09/LRU.html) 策略儲存在 VNode

但因此就讓我思考了難道 React 沒有如 keep-alive cache 頁面的方法

目前查到 2 個方法

- [React 18 OffScreen](https://zh-hant.reactjs.org/blog/2022/06/15/react-labs-what-we-have-been-working-on-june-2022.html#offscreen) (目前還沒有[相關的 API 可使用](https://zh-hant.reactjs.org/blog/2022/06/15/react-labs-what-we-have-been-working-on-june-2022.html#offscreen))

- [基于 react-router V6 实现 路由缓存](https://juejin.cn/post/7041490849858846728)

### 初探 React Router v6

目前在 React 中比較熱門的 router library 有

- 由 Remix 團隊所開源的 [react-router](https://github.com/remix-run/react-router) (應該是目前最多人使用的)

- [reach-router](https://reach.tech/router/) (在 react-router v6 跟 react router 合併了，目前已沒有在維護)

- 由 React Query 團隊開源的 [TanStack Router](https://tanstack.com/router/v1) (不過現在還在 beta 中，文檔也還不齊全，不過看得出來他們的野心，想要讓現在主流框架都能使用到)

{% asset_img tanStack-router.png TanStack Router %}

### 本文開始

代補

### Ref

[Remixing React Router](https://remix.run/blog/remixing-react-router#tldr)

[LRU Cache](https://josephjsf2.github.io/data/structure/and/algorithm/2020/05/09/LRU.html)

[keep-alive 是如何实现缓存的](https://juejin.cn/post/6862206197877964807)
