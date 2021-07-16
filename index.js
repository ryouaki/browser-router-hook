import RouterHook from './lib'

RouterHook((event, state) => {
  console.log('log:', event, state)
})
