---
title: Fetch a remote branch to review changes
date: 2021-05-03
datetime: 2021-05-03 00:00:00 Z
preview: When reviewing a PR, its usually helpful to pull into that feature branch and test the changes locally in your own copy of the project.
tags:
  - git
---

{{ preview }}

> Can you pull into my feature branch and review the changes locally to provide review?

I saw this phrase appear again and again while contributing to Open Source. Before I knew the `git` commands for handling this, I tried thinking about how I would actually get the changes from a remote branch. It seemed straightforward, fetch changes from that upstream branch associated with a specific pull request ID. Turns out it was really quite simple. 

```git
git fetch origin pull/id/head:$BRANCHNAME
```

We fetch the changes from a specific feature branch and then can use `git checkout` to switch branches into the feature branch.

```git
git fetch origin pull/2/head:563-some-bug-fix

git checkout 563-some-bug-fix
```

That's it. Fetch changes from a local or remote feature branch and switch branches to the newly created branch from the fetch.


<h2 class="post-heading">Fetch a remote branch</h2>

If your pulling into a feature branch from a remote repository, use `upstream` instead of `origin`.

```git
git fetch upstream pull/id/head:$BRANCHNAME
```

Lets say there was a pull request with `id` equaling 25 and the branch this PR was submitted from is `323-fix-async`. The following usage would be:

```git
git fetch upstream pull/25/head:323-fix-async

```

Then switch branches into the feature branch with `git checkout`.

```git
git checkout 323-fix-async

Switched to branch '323-fix-async'
```

Now you have a local copy of the changes in a upstream feature branch, its time to start revewing and approve or reject those changes! If you want to see what branch your currently on, use `git branch`.