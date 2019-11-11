import Reactotron, { networking, openInEditor, trackGlobalErrors } from 'reactotron-react-native'
// import host from 'pads/app/config/host'

const apisaucePlugin = require('reactotron-apisauce')
const sagaPlugin = require('reactotron-redux-saga')
const { reactotronRedux } = require('reactotron-redux')

// eslint-disable-next-line
if (__DEV__) {
  Reactotron.configure({
    name: 'smartcheft app',
    host: '192.168.43.52' // put your ip machine or only work with host module
  })// controls connection & communication settings
    .useReactNative()
    .use(networking())
    .use(openInEditor())
    .use(apisaucePlugin())
    .use(reactotronRedux())
    .use(sagaPlugin())
    .use(trackGlobalErrors())
    .connect() // let's connect

  Reactotron.clear()
  console.tron = Reactotron
  console.log('config reactotron')
} else {
  console.tron = {
    log: () => false,
    warn: () => false,
    error: () => false,
    display: () => false,
    image: () => false
  }
}
