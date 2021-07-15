const defaultUrl = new URL(location.href)
let prevUrl = defaultUrl
let currUrl = defaultUrl
let nextUrl = defaultUrl
let lastUrl = defaultUrl

const __$$history = window.history || {}
const __$$listeners = []

const EnumType = {
  'UNKNOW': 'UNKNOW',
  'BACK': 'BACK',
  'GO': 'GO',
  'FORWARD': 'FORWARD',
  'PUSH': 'PUSH',
  'REPLACE': 'REPLACE',
  'REFRESH': 'REFRESH'
}

Object.freeze(EnumType)

const sessionStorage = window.sessionStorage;

function hook_func (event, state) {
  let type = EnumType.UNKNOW
  // 记住上一次的URL，用来判断是否是刷新或者是前进，后退。
  prevUrl = currUrl
  switch(event) {
    case 'pushState':
      {
        type = EnumType.PUSH
        lastUrl = nextUrl = currUrl = new URL(location.href)
      }
      break;
    case 'replaceState':
      {
        type = EnumType.REPLACE
        lastUrl = nextUrl = currUrl = new URL(location.href)
      }
      break;
    default:
      break;
  }

  // 回调路由监听
  const len = __$$listeners.length
  for (let i = 0; i < len; i++) {
    __$$listeners[i](type, currUrl)
  }
}

function hashChangeHandle () {
  hook_func('hashChange', arguments)
}

function popStateHandle () {
  hook_func('popState', arguments)
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

window.addEventListener('hashchange', hashChangeHandle)
window.addEventListener('popstate', popStateHandle)

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