git branch -d master
git push origin --delete master
git subtree split --prefix=app -b master
git checkout master
git push origin master
