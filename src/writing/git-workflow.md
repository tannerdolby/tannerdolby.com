---
title: Using Git for Contributing to Open Source
date: 2020-12-27
datetime: 2020-12-27 00:00:00 Z
tags: 
  - git
permalink: "/writing/{{ title | slug }}/"
preview: 'To begin contributing to open-source software, you might want to become familiar with Git. Understanding the workflow of creating your own local copy of a repository and keeping it up to date with the upstream repository is integral to start creating PRs in public projects.'
---

{{ preview }}

[Git](https://git-scm.com/) is a distributed version control system (DVCS) that can handle just about any size project you throw at it. The software is blazing fast and is now something I use everyday while contributing to projects on GitHub.

<h2 class="post-heading">Local Setup</h2>

Before you can start submitting a Pull Request (PR) to a public repository, you will usually want to copy the project files to your local system. This can be done by performing a `git clone` on a forked public repository from GitHub. Before cloning, you need to create your own local copy by forking it. Then you can setup your upstream repository (e.g. the repo you forked from) and any other branch or environment setup.

<h2 class="post-heading">Fork</h2>

To create a local copy of a repository, use the `Fork` button in the top right corner of the public repository webpage on GitHub. After forking a repository, the project will be part of your users account as `your-username/repository-name`.

<h2 class="post-heading">Clone your fork</h2>

Copy the SSH URL (or HTTPS) of your own organization’s fork of the project and then clone the project. The URL can be found by clicking the large green button on GitHub that says "Code". Below is an example of my GitHub account ([@tannerdolby](https://github.com/tannerdolby)) cloning my fork of [11ty/11ty-website](https://github.com/11ty/11ty-website).

```git
git clone git@github.com:tannerdolby/11ty-website.git
```

<h2 class="post-heading">Setup tracking of remote upstream repository</h2>

To make sure your local copy of the project (the fork) is up to date with the original upstream repository. Grab the `.git` SSH/HTTPS URL from the original repository [11ty/11ty-website](https://github.com/11ty/11ty-website). This URL will have the original project organization name followed by the repository like `11ty/11ty-website`.

Add the upstream repository as a remote:

```git
git remote add upstream git@github.com:11ty/11ty-website.git
```

Point your local copy of the master branch (which is currently pointing to 'origin') to the upstream repository. Once completed, you can easily pull changes from 'master' and get the latest changes from the upstream repository. If the upstream repository doesn't use the default `master` branch and uses another branch such as `main`. Just make sure to update the following Git command to reflect that.

```git
git branch --set-upstream-to=upstream/master master
```

To get details about the upstream remote repository, you can use `git fetch`. This will display a list of all the branches referenced in the upstream repository.

```git
git fetch upstream

From github.com:11ty/11ty-website
   834b9589..0ae7bf64  master         -> upstream/master
 * [new branch]        opencollective-update-opencollective-integration -> upstream/opencollective-update-opencollective-integration
   e8fed377..70951217  production-dev -> upstream/production-dev
```

<h2 class="post-heading">Making changes</h2>

Now that your local copy of the project is all setup to track changes from the upstream repository, it's time to start making changes. Once you have modified files within your local copy of the project, the source tree will track those changes and put them in something called the "Staging Area". 

When file changes are recoginized in the staging area, you can perform `git add <filename>` to "stage" those changes to then commit and push the changes into the upstream repository. 

To display the status of your source tree, run the `git status` command.

```git
tannerdolby:11ty-portfolio TannerDolby$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   src/writing/node-list.md
```

Add the modified file to the staging area:

```git
git add src/writing/node-list.md
```

When you add the file changes to the staging area (ie stage changes). The `git status` command will look like this:

```git
tannerdolby:11ty-portfolio TannerDolby$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   src/writing/node-list.md
```

Now that the modified files have been staged, it's time to commit those changes and push.

```git
git commit -m "commit message"
```

<h2 class="post-heading">Pushing changes upstream</h2>

With the changes committed, you are now ready to push those changes into the project. Using `git push` ensures that the file modifications that were apart of your commits are included in the up-to-date project. To understand the Git command below. The `-u` is shorthand for `--set-upstream`. The full syntax for using the push command is: `git push <local-branch> <upstream-branch>`

```git
git push -u origin master
```

<h2 class="post-heading">Creating a Pull Request</h2>

Once you have pushed your commits upstream, you can open a Pull Request (PR). A pull request is essentially a way of asking the project maintainer to review your changes and merge them into the original project. After you push your commits, you can head over to the original repository on GitHub and open a new PR. 

Click on the Pull Requests tab and then "Compare across forks", make sure that you compare with the branch you've pushed from. Sometimes, it will take a few minutes for the PR to appear in the "Pull Requests" tab in the original repo. 

Once you create a PR, you will be asked to provide a title for it and a description. I typically just add a descriptive title for what changes I made and a short description, unless I need to ask the maintainer about more specific details.

```git
Title: Fix failing unit tests for direct links

Desc: Fixes #855
```

The above code snippet is an example of what title and description I would typically use for submitting a PR. The `#855` is a issue number that the PR would potentially fix, if the PR doesn't directly fix a current issue, then simply describe your PR with a short description. 

Ignore the "Title:" and "Desc:" as I only included those only as a helpful reminder of what you will see on GitHub.

After you submit the PR, you have sucessfully completed creating and submitting a pull request. Congrats! Now all you can do is wait to hear back from the project maintainer. If the PR needs changes, the maintainer will "Request Changes". If not, your PR will be sucessfully merged into the project. This might seem like quite the process, but these are the necessary steps to becoming comfortable with contributing to open-source software.
