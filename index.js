module.exports = (app) => {
  app.on('pull_request.closed', async (context) => {
    const {github, payload} = context
    const self = payload.pull_request

    if (self.base.repo.default_branch === self.head.ref) {
      return // Skip if the the head is the default branch
    }

    const owner = payload.repository.owner.login
    const repo = payload.repository.name
    const head = self.head.ref
    const base = self.base.ref
    const state = 'open'
    const per_page = 100

    // Get all open pull requests with a base matching this head
    await github.paginate(
      github.pulls.list,
      {owner, repo, base: head, state, per_page},
      async (page) => {
        for (const {number} of page.data) {
          // Change the base to match where the original PR was merged.
          github.pulls.update({owner, repo, number, base})
        }
      }
    )

    // Delete the branch if the repository deletes branches on merge.
    const repoInfo = await github.repos.get({owner, repo})
    if (repoInfo.delete_branch_on_merge) {
      await github.git.deleteReference({owner, repo, ref: head})
    }
  })
}
