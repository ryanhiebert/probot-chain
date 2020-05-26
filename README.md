# probot-chain

![Chain Logo](logo.png)

> a GitHub App built with [probot](https://github.com/probot/probot) that
> makes it easy to manage chained pull requests.

## Note: You probably don't need this

GitHub will automatically change the base of pull requests that currently
have their head set to the branch being deleted if the deleting is done
automatically on merge or via the button on the pull request.

So if you merge a pull request, and then you click the "Delete branch" button:

![Delete branch button](delete-branch.png)

Then you'll see this on all the dependent pull requests:

![Base automatically changed activity](base-changed.png)

And this also works if you have GitHub delete branches automatically on merge:

![Automatically delete head branches checkbox in settings](auto-delete-on-merge.png)

So you probably don't need this. If you think you actually do need this, open up an issue and tell me. I'll probably delete this app in a while if you don't.

## Usage

Chain helps manage the drudgery of dealing with chained pull requests.
When you open a pull request that is based on another pull request,
simply make sure that the base branch is the head branch of
the pull request that you're wanting to extend.

When the initial pull request is closed or merged,
the follow-up pull request will automatically have it's base
be changed to follow the base of the original pull request,
so that your follow-up pull request is ready to merge.

## Setup

```
# Install dependencies
npm install

# Run the bot
npm start
```

See [docs/deploy.md](docs/deploy.md) if you would like to run your own instance of this app.
