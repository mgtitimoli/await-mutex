# How to contribute

First of all, WELCOME!! It is really great to receive contributions/suggestions, and I truly believe it's the best way to make an open source project growing.

## Getting Started

- Download and install [Node.JS](https://nodejs.org/en/download/).
- [Fork this repository](https://help.github.com/articles/fork-a-repo/).
- In a terminal, move to the directory where you've forked the repo and run the following command to install all the dependencies:
```
npm install
```

## Making Changes

- Create a topic branch from where you want to base your work. For example to branch from **master** and immediately switch to the newly created branch, run the following command (replace *branch_name* with a proper name that describes the changes you want to submit):
```
git checkout -b <branch-name>
```
- To start developing a new feature or a fix, run the following command (it will listen to changes in **src** and **test** directories, and execute all the tests when a change occurs):
```
npm run dev
```
- For each fix or feature you will work on, create a test file under the **test** directory to reflect the intent of that changes.

## Submitting Changes

- Be sure you have created one or more tests to reflect the intent of your change, and all the tests are passing (it won't let you proceed with the next items if these conditions are not met).
- Run the following command to push your changes to the topic branch you created in your fork of the repository:
```
git push -u origin <branch-name>
```
- Submit a [pull request](https://help.github.com/articles/creating-a-pull-request/).
