# Deskify
Group 7 project. <br>
Deskify will be a web based ticket management system for IT support teams. <br>
It will allow users to create tickets for issues they are having with their computer and IT support teams to manage 
these tickets and resolve them.

## Users / Roles
- [@gtaEPIC (Johnathan Hall)](https://github.com/gtaEPIC) - Project Manager
- [@imirza7 (Ibtesam Mirza)](https://github.com/imirza7) - Lead Software Engineer
- [@rsotoacu (Rodrigo Soto Acuna)](https://github.com/rsotoacu) - UI Programmer
- [@Subhan636 (Mohammed Subhaan Asif Hakeem)](https://github.com/Subhan636) - Security Programmer
- [@Annie021 (Anmoljeet Kaur)](https://github.com/Annie021) - Database Programmer
- [@saiham019 (Saiham Salim Ullah)](https://github.com/saiham019) - Web Designer

## ⚠️ DATABASE SETUP ⚠️
The database library is mongoose. <br>
You will need to create a `.env` file in the root directory. <br>
Inside this file you should have the following variables: <br>
```
ATLASDB=<your atlas db connection string>
```
If you do not include this, your program will not work. <br>
**Do not surround with `"`, just use the text and make sure the password is correct.** <br>

## Branch Protection
The `main` branch is protected from being pushed to. <br>
All changes must be made with a branch and a pull request. <br>
**ALL PULL REQUESTS** must be reviewed by at least **3** other members of the team before being merged into `main`. <br>
When a pull request is ready for review, please add all other contributors to request a review. <br>
You can also enable Auto-Merge to automatically merge it when approved. <br>

### Pull request blocking
There is a github bot that will prevent pull requests from being merged if something is wrong. <br>
An example is leaking secrets. <br>

### I accidentally committed to main
If you accidentally commit to main, make a new branch from your current main. <br>
Push this branch to github. <br>
Then, reset your local main to the remote main. <br>
You can then create a pull request to merge your branch into main (If you're ready) <br>

## Issues
Our [Agile issue tracking](https://github.com/users/gtaEPIC/projects/3) it being handled with Github / Github Projects. <br>
You can find details on our project submissions with the [Milestones Page](https://github.com/gtaEPIC/COMP229-Deskify/milestones) <br>
Each Milestone will contain a list of issues (requirements) that need to be completed for this submission. <br>
Each issue is being tracked with the [Github Projects](https://github.com/users/gtaEPIC/projects/3) page. <br>
You can also see all the issues on the [Issues Page](https://github.com/gtaEPIC/COMP229-Deskify/issues)

### Missing issues / new problems
If you find any issues that are not listed, please [create a new issue](https://github.com/gtaEPIC/COMP229-Deskify/issues/new). <br>
It's possible I missed something, or you may have found a problem in the project.<br>

### Issue Tracking
The [Github Projects](https://github.com/users/gtaEPIC/projects/3) page is being used to track our issues. <br>
#### High Level Column
Anything in this column is a high level requirement. <br>
***THESE ISSUES SHOULD NOT BE ASSIGNED*** <br>
Instead they will contain sub-issues that are required to be complete <br>
#### TODO Column
This column contains issues that are not assigned to anyone. <br>
When you are looking for something to do, you can pick an issue from here. <br>
To assign this issue to you, click on the issue and click the `assign yourself` button in the top right. <br>
This will assign the issue to you and should automatically change the column in the [Github Projects Page](https://github.com/users/gtaEPIC/projects/3). <br>
#### Assigned Column
This column contains issues that are assigned to someone. <br>
If you are working on this issue, please move it to the `In Progress` column. <br>
#### In Progress Column
This column contains issues that are being worked on. <br>
If you are working on this issue, please move it to this column. <br>
**Please remember to create a branch for your issue**, this can either be done locally or on the specific issue. <br>
*There is a button under `Development` that says `Create branch`* <br>
When you are done working on this issue, please create a pull request (new branch into main) and request reviews from everyone. <br>
This *should* automatically move the issue to the `Requesting Review` column. <br>
#### Requesting Review Column
This column contains issues or pull requests that are requesting review. <br>
If you see anything here, please check to see if you have reviewed it. <br>
Once 3/5 people have reviewed it, the pull request will be allowed to be merged, and will move to `Done` <br>
#### Done Column
This column contains issues that are reviewed and done. <br>

# [Discussions](https://github.com/gtaEPIC/COMP229-Deskify/discussions)
Discussions can be used to help talk about specific topics that won't clog our group chat or an issue. <br>
You can also use this if you have a question as well. <br>
I will try my best to answer them, though you might want to mention @gtaEPIC to make sure I see it. <br>