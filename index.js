// listenerFetch()
// window.addEventListener('hashchange', listenerFetch) // - hash路由变化 + 浏览器前进后退
// // popstate只能监听到History.back()、History.forward()、History.go().
// window.addEventListener('popstate', listenerFetch) // - hash路由变化 - 浏览器前进后退
// // 在方法里面主动的去触发popState事件
// let _wr = function(type) {
//   let orig = history[type]
//   return function() {
//     let rv = orig.apply(this, arguments)
//     let e = new Event(type)
//     e.arguments = arguments
//     window.dispatchEvent(e)
//     return rv
//   }
// }
// history.pushState = _wr('pushState')
// history.replaceState = _wr('replaceState')
// // 针对History.pushState()、History.replaceState()单独监听
// window.addEventListener('replaceState', listenerFetch)
// window.addEventListener('pushState', listenerFetch)

console.log(111)