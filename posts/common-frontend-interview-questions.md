---
title: 常見的前端面試手寫考題，deepClone、debounce、throttle
date: '2023-01-18'
tags: interview interview-questions frontend-interview
---

![coding-interview](/images/post/common-frontend-interview-questions/interview.jpg)

> 相關函式的詳細解釋這邊就不做特別說明，這篇只專注在 code 的部分

## deepClone

請實作一個簡易版的 deepClone

```js
// 最簡易，但會有什麼限制？ 為什麼這樣可以？
const cloned = JSON.parse(JSON.stringify(objectToClone))
```

```js
/**
 * 簡易版 deepClone
 * 有許多 Edge cases 沒有考慮到，
 * 如果是產品的見還是用 loadsh的 _.cloneDeep 比較保險
 *
 * 用遞歸的方式判斷假如是object就不斷在進到下一層，
 * 若不是object的話就賦值給 target
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('Error arguments', 'deepClone')
  }
  // 可以用 source.constructor 或是 Array.isArray(source) 來判斷是 Array 還是 Object
  const target = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      target[keys] = deepClone(source[keys])
    } else {
      target[keys] = source[keys]
    }
  })
  return target
}
```

延伸問題：

- 有哪些東西是 deep copy ? 、哪些是 shallow copy ?

## debounce

請實作一個 debounce 的 function，以及請說明 debounce 的應用場合

```js
/**
 * 簡易版
 * @param {Function} func func The function to debounce.
 * @param {number} wait
 * @return {Function} Returns the new debounced function.
 */
function debounce(fun, delay) {
  return function (args) {
    let that = this
    let _args = args
    // 每次執行的時候重置setTimeout
    clearTimeout(fun.time)
    fun.time = setTimeout(function () {
      // 執行傳入的fun1(透過call方法傳遞參數_args)
      fun.call(that, _args)
    }, delay)
  }
}
```

```js
/**
 * 簡易版 + 立即執行
 * @param {Function} func func The function to debounce.
 * @param {number} wait
 * @param {boolean} immediate is immediate execute
 * @return {Function} Returns the new debounced function.
 */
function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 據上一次觸發時間間隔
    const last = +new Date() - timestamp

    // 上次被包裝函數被調用時間間隔 last 小於設定時間間隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果設定為 immediate === true，因為開始邊界已經調用過了此處無需調用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延時不存在，重新設定延時
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
```

使用情境:

- 監聽 resize 事件時，不用立即執行，只要最後停止時在做計算即可

- google 的 search bar，不用使用者每輸入一個字都去 call api，只要最後停下來後再去要資料就好了

## Throttle

```js
function throttle(func, timeout = 250) {
  let last
  let timer

  return function () {
    const context = this
    const args = arguments
    const now = +new Date()

    if (last && now < last + timeout) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        func.apply(context, args)
      }, timeout)
    } else {
      last = now
      func.apply(context, args)
    }
  }
}
```

使用情境:

- 有個 button 有綁定 click 事件，若沒有 throttle 在不斷點擊按鈕，會按幾次就觸發幾次，用 throttle 可以有效限制在固定時間內只會觸發一次而已
