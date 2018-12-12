module.exports = (robot) => {
  robot.on('pull_request.closed', async context => {
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
      github.pullRequests.getAll({owner, repo, base: head, state, per_page}),
      async page => {
        for (const {number, body} of page.data) {
          // Find all pull requests this one extends.
          // Should be only one in the usual case,
          // but handle exceptions gracefully.
          const regex = /extend(?:s|ed)? +#(\d+)/ig
          const extend = []
          let match
          while ((match = regex.exec(body)) !== null) {
            extend.push(Number(match[1]))
          }
          
          // Check if the original PR is extended by this PR
          if (extend.includes(self.number)) {
              // Change the base to match where the original PR was merged.
              github.pullRequests.update({owner, repo, number, base})
          }
        }
      }
    )
  })
}
