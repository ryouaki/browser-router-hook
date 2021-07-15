import RouterHook from './lib'

const removeDispatch = RouterHook((event, state) => {
  console.log('log:', event, state)
})
