#!/bin/bash
#
# I was playing with "Github Wiki Sidebar" in a windows machine, and found out that something was missing
# when I cloned it´s wiki repository: "https://github.com/adriantanasa/github-wiki-sidebar.wiki.git". The
# problem was some "forbidden" file names that could not be checked out in windows.
#
# Some usefull links:
# - [Github Wiki Sidebar](https://github.com/adriantanasa/github-wiki-sidebar)
# - [Git clone leads to deleted & untracked files](https://stackoverflow.com/questions/38980293/git-clone-leads-to-deleted-untracked-files/38992095)
# - [What characters are forbidden in Windows and Linux directory names](https://stackoverflow.com/questions/1976007/what-characters-are-forbidden-in-windows-and-linux-directory-names)
# - [How to get a file in Windows with a colon in the filename](https://stackoverflow.com/questions/10386344/how-to-get-a-file-in-windows-with-a-colon-in-the-filename)
# - [Checkout older revision of a file under a new name in Git](https://stackoverflow.com/questions/888414/git-checkout-older-revision-of-a-file-under-a-new-name)
# - [FINDSTR in FOR loop with variables as strings](https://stackoverflow.com/questions/24415011/findstr-in-for-loop-with-variables-as-strings-batch-file)
# - [Removing files with rm using find and xargs](https://stackoverflow.com/questions/42828021/removing-files-with-rm-using-find-and-xargs)
# - [How to hide command output in Bash](https://stackoverflow.com/questions/18062778/how-to-hide-command-output-in-bash)
# - [Fun With GIT and AWK](http://travistidwell.com/blog/2014/06/11/fun-with-git-and-awk/)
# - [How to escape a single quote inside awk](https://stackoverflow.com/questions/9899001/how-to-escape-a-single-quote-inside-awk)
# - [How do I paste multi-line bash codes into terminal and run it all at once](https://stackoverflow.com/questions/6713056/how-do-i-paste-multi-line-bash-codes-into-terminal-and-run-it-all-at-once/43164204)
#
git ls-files -o | xargs rm &> /dev/null; \
git status --short | findstr -v ? | cut -b 4- | awk '{ 
x=$0; gsub(":","꞉", $0); y=$0;
system("git show HEAD^:'\''"x"'\''>'\''"y"'\''") 
}' &> /dev/null; \
git add -A &> /dev/null; \
git commit -m "Renamed some file names with a colon that windows accepts" &> /dev/null; \
echo done;