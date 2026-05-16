---
title: "Open Source — A Complete Guide to Contribute"
slug: open-source-guide-to-contribute
date: 2023-10-08
tags: [Open Source, Engineering, Git]
excerpt: "A step-by-step guide to making your first open-source contribution on GitHub — from forking to pull request, without the confusion."
readingTime: 5
featured: false
---

# Open Source - Contributing to a GitHub Project

Contributing to an open-source project on GitHub involves several steps, from cloning the repository to creating a pull request. Here's a step-by-step guide:

1. **Fork the Repository**:

    - Visit the GitHub repository you want to contribute to.
    - Click the "Fork" button in the upper right corner of the repository's page. This will create a copy of the repository under your GitHub account.

2. **Clone Your Fork**:

    - Go to your forked repository on GitHub.
    - Click the "Code" button and copy the repository's URL.
    - Open your terminal or command prompt and navigate to the directory where you want to store the project.
    - Use the `git clone` command to clone your fork:
        ```bash
        git clone https://github.com/your-username/repository-name.git
        ```
        Replace `your-username` with your GitHub username and `repository-name` with the name of the repository.

3. **Set Up Upstream Remote**:

    - To keep your fork up to date with the original repository, you should add it as a remote:
        ```bash
        git remote add upstream https://github.com/original-owner/repository-name.git
        ```
        Replace `original-owner` with the username of the project's owner and `repository-name` with the name of the repository.

4. **Create a New Branch**:

    - Before making changes, create a new branch for your work:
        ```bash
        git checkout -b my-feature-branch
        ```
        Replace `my-feature-branch` with a descriptive branch name for your contribution.

5. **Make Changes**:

    - Make the necessary code changes or additions in your local branch.

6. **Commit Your Changes**:

    - Stage your changes for commit:
        ```bash
        git add .
        ```
    - Commit your changes with a meaningful commit message:
        ```bash
        git commit -m "Add a new feature"
        ```

7. **Push Your Changes to Your Fork**:

    - Push your branch to your fork on GitHub:
        ```bash
        git push origin my-feature-branch
        ```
        Replace `my-feature-branch` with the name of your branch.

8. **Create a Pull Request**:

    - Visit your fork on GitHub and switch to the branch you just pushed.
    - Click the "New Pull Request" button.
    - GitHub will compare your branch with the original repository's main branch by default. Make sure this is what you want.
    - Write a clear and informative pull request description explaining your changes.
    - Click the "Create Pull Request" button.

9. **Discuss and Make Changes**:

    - The project maintainers and other contributors may review your pull request and request changes or discuss your code.
    - Make any necessary updates and push them to your branch.

10. **Merge the Pull Request**:

    - Once your pull request is approved, a maintainer will merge it into the main repository.

11. **Sync Your Fork** (Optional):
    - Periodically, you may want to sync your fork with the original repository to ensure it's up to date.

To do this, run the following commands:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

This fetches changes from the original repository and merges them into your main branch. Then, you push those changes to your fork.

That's it! You've successfully contributed to the GitHub project. Remember to always follow the project's contribution guidelines and be responsive to feedback during the review process.
