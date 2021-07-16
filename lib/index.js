const __$$history = window.history || {}
const __$$listeners = []
let lastHref = location.href
let timer = null

function hook_func () {
  if (timer != null) {
    clearTimeout(timer)
  }
  timer = setTimeout(function tmcb() {
    let currUrl = location.href
    const len = __$$listeners.length
    for (let i = 0; i < len; i++) {
      __$$listeners[i](lastHref, currUrl)
    }
    lastHref = currUrl
  }, 0)
}

function hashChangeHandle () {
  hook_func('hashChange', arguments)
}

function popStateHandle () {
  const prevUrl = new URL(lastHref)
  if (prevUrl.origin !== location.origin || prevUrl.pathname !== location.pathname) {
    hook_func('popState', arguments)
  }
}

function injectStateHandle (name) {
  if (__$$history[name]) {
    const __$$oldHandle = __$$history[name]
    __$$history[name] = function () {
      hook_func(name, arguments)
      return __$$oldHandle.apply(__$$history, arguments)
    }
  }
}

window.addEventListener('popstate', popStateHandle)
window.addEventListener('hashchange', hashChangeHandle)

injectStateHandle('pushState')
injectStateHandle('replaceState')

export default function (listener) {
  __$$listeners.push(listener)
  return function () {
    let idx = __$$listeners.findIndex((item) => {
      return item === listener
    })

    __$$listeners.splice(idx, 1)
  }
}