## 01. 你有用到哪些 git 指令呢

- git fetch
- git pull
- git add
- git commit -m
- git commit --amend -m 在不创建新的 commit 记录的情况下，将修改的内容提交到最近一个 commit 上
- git push
- git reset HEAD
- git reset hard --commitId 回撤到指定版本
- git checkout 切换分支
- git checkout -b 创建分支并切换到新创建的分支上
- git branch 创建分支
- git stash 暂存修改的内容
- git stash pop 弹出暂存修改的内容
- git merge
- git rebase
- git log
- git rm
- git tag
- git diff 查看修改了哪些文件


## 02. git merge 和 git rebase 的区别

1. git merge 是当前分支去合并其他分支的内容，git rebase 是被合并的分支合并到要合并的分支上
2. git merge 解决冲突后， git commit 提交，会产生一条 commit 记录；git rebase 解决冲突后，git rebase --continue 提交，不会产生额外的 commit 记录
3. git merge 合并分支后，commit 的记录是按时间顺序的；git rebase 是把自己的 commit 都放在被合并的那个分支的 commit 之后