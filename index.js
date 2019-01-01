module.exports = app => {
  app.on('pull_request.closed', async context => {
    const {github, payload} = context
    const self = payload.pull_request

    const owner = payload.repository.owner.login
    const repo = payload.repository.name
    const head = self.head.ref
    const base = self.base.ref
    const state = 'open'
    const per_page = 100

    // Get all open pull requests with a base matching this head
    github.paginate(
      github.pullRequests.list({owner, repo, base: head, state, per_page}),
      async page => {
        for (const {number} of page.data) {
          // CHange the base to match where the original PR was merged.
          github.pullRequests.update({owner, repo, number, base})
        }
      }
    )
  })
}
