---
title: How to use git when contributing to open source
date: 2020-10-12

---



### Fork
Create a fork of this repository to your users organization. The project will be apart of your users account as `your-name/what-to-watch`.

### Clone your fork 
Copy the SSH URL (or HTTPS) of your own organization’s fork of the project and clone the project with:
```
git clone https://github.com/tannerdolby/what-to-watch.git
```

### Setup tracking of remote upstream repository 
This keeps your local copy of the project (the fork) up to date with the original upstream repository.

1. Grab the HTTPS or SSH URL from the original repository (ie https://github.com/tannerdolby/what-to-watch)

2. Add the upstream repository as a remote 
```
git remote add upstream https://github.com/tannerdolby/what-to-watch.git
```

3. Get details about the upstream remote repository. 
```
git fetch upstream
```

4. Point your local copy of the master branch (which is currently pointing to 'origin') to the upstream repository. Once completed, you can easily pull changes from 'master' and get the latest changes from the upstream repository.