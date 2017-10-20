const express = require('express')
const app = express()
// const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
// const session = require('express-session')
const Web3 = require('web3')
const web3 = new Web3('http://localhost:8545')
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())

const functionNames = [
  // 'currentProvider',
  // '_requestManager',
  // 'givenProvider',
  // 'providers',
  // '_provider',
  // 'setProvider',
  // 'BatchRequest',
  // 'extend',
  // 'defaultAccount',
  // 'defaultBlock',
  // 'clearSubscriptions',
  // 'net',
  // 'accounts',
  // 'personal',
  // 'Contract',
  // 'Iban',
  // 'abi',
  // 'getProtocolVersion',
  // 'getCoinbase',
  // 'isMining',
  // 'getHashrate',
  // 'isSyncing',
  'getGasPrice',
  'getAccounts',
  'getBlockNumber',
  // 'getBalance',
  // 'getStorageAt',
  // 'getCode',
  // 'getBlock',
  // 'getUncle',
  // 'getBlockTransactionCount',
  // 'getBlockUncleCount',
  // 'getTransaction',
  // 'getTransactionFromBlock',
  // 'getTransactionReceipt',
  // 'getTransactionCount',
  // 'sendSignedTransaction',
  // 'signTransaction',
  // 'sendTransaction',
  // 'sign',
  // 'call',
  // 'estimateGas',
  // 'getCompilers',
  // 'compile',
  // 'submitWork',
  // 'getWork',
  // 'getPastLogs',
  // 'subscribe'
]

app.get('/', (request, response) => {
  response.render('index', {functionNames})
})

app.post('/ajax-request', (request, response) => {
  const { functionName, parameters } = request.body

  console.log('server receiving ajax-request')
  console.log('    functionName:', functionName)
  console.log('    parameters:', parameters)

  web3.eth[functionName].apply(null, parameters)
    .then(result => {
      console.log('successfully called', functionName)
      console.log('    with result:', result)
      response.send(JSON.stringify(result))
    })
})

app.listen(port, () => {
  console.log(`Ethereum Dapp listening on http://localhost:${port}...`)
})
