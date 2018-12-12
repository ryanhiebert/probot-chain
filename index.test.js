const { createRobot } = require('probot')

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

// Ours
const app = require('./index')

// Globals
let robot
let github

// Mock everything
beforeEach(() => {
  robot = createRobot()
  app(robot)  // Register our app to Probot

  // Mock GitHub client
  github = {
    pullRequests: {
      getAll: jest.fn(),
      update: jest.fn()
    }
  }

  // Passes the mocked out GitHub API into out robot instance
  robot.auth = () => Promise.resolve(github)
})

test('With a matching pull request', async () => {
  // Setup the return value for `getAll`
  github.pullRequests.getAll.mockReturnValue(Promise.resolve({
    
  }))
  
  await robot.receive(EVENT)
  
  // Check that getAll was called with the correct args
  expect(github.pullRequests.getAll).toBeCalledWith()
  
  // Check that update is called with the correct args
  //expect(github.pullRequests.update).toBeCalledWith()
})

test.skip('With a non-matching pull request', async () => {
  // Setup the return value for `getAll`
  
  await robot.receive(EVENT)
  
  // Check that update is called with the correct args
})

test.skip('With a pull request that extends a different parent', async () => {
  // Setup the return value for `getAll`
  
  await robot.receive(EVENT)
  
  // Check that update is called with the correct args
})

// test('processing plain issue comments', async () => {
//   await robot.receive(events.issue_comment_created)
//   expect(github.issues.addLabels).not.toBeCalled()
// })

// test('adding metadata', async () => {
//   await robot.receive(events.pr_comment_created)
//   expect(metadata).toBeCalledWith(
//     expect.objectContaining({ payload: expect.any(Object) })
//   )
//   expect(metadata().set).toBeCalledWith('dependencies', expect.any(Array))
// })

// test('adding the marker', async () => {
//   await robot.receive(events.pr_comment_created)
//   expect(github.issues.addLabels).toBeCalledWith(
//     expect.objectContaining({
//       owner: 'user',
//       repo: 'test',
//       number: 1,
//       labels: expect.any(Array)
//     })
//   )
// })

// test('removing the marker', async () => {
//   await robot.receive(events.pr_comment_created_remove)
//   expect(github.issues.removeLabel).toBeCalled()
//   expect(github.issues.addLabels).not.toBeCalled()
// })