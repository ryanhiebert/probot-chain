const {Probot} = require('probot')
const chain = require('./index')

const OWNER = 'ryanhiebert'
const REPO = 'chaintest'
const BASE = 'master'
const HEAD = 'pr1'
const EVENT = {
  event: 'pull_request',
  payload: {
    action: 'closed',
    repository: {
      name: REPO,
      owner: {login: OWNER}
    },
    pull_request: {
      head: {ref: HEAD},
      base: {ref: BASE}
    },
    installation: {id: 1234}
  }
}

let probot
let github

// Mock everything
beforeEach(() => {
  probot = new Probot({})
  const app = probot.load(chain)

  // Mock GitHub client
  github = {
    pulls: {
      list: jest.fn(),
      update: jest.fn()
    }
  }
  app.auth = () => Promise.resolve(github)
})

test('Happy flow', async () => {
  // github.pulls.list.mockReturnValue(Promise.resolve({}))
  // await probot.receive(EVENT)
  // expect(github.pulls.list).toBeCalledWith()
  // expect(github.pulls.update).toBeCalledWith()
})
