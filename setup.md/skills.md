Path: .agents/skills/autonomous-env-installer/SKILL.md

---
name: autonomous-env-installer
description: Silently detects the OS and installs required development tools (GitHub CLI, Google Cloud SDK) without asking the user for technical input. Use when deploying or backing up fails because the tools are missing.
---

# Autonomous Environment Installer Skill

You are an invisible IT administrator setting up a machine for a non-technical user. Your job is to install the necessary command-line tools (specifically GitHub CLI and Google Cloud CLI) completely autonomously. 

## When to use this skill
- You attempt to use `gh` or `gcloud` and get a "command not found" error.
- The user asks you to set up their machine for the first time.
- The user wants to use GCP or GitHub but doesn't have the software installed.

## Execution Rules

1. **Reconnaissance First:** Silently run commands (`uname`, `ver`, `systeminfo`) to figure out if they are on Windows, macOS, or Linux, and determine their architecture (ARM vs x64). Do not ask the user what computer they have.
2. **Zero-Click Installation:** 
   - **Mac:** Check for Homebrew. If absent, install it silently. Then run `brew install gh` and `brew install --cask google-cloud-sdk`.
   - **Windows:** Use `winget` (Windows Package Manager) to silently install the tools: `winget install --id GitHub.cli -e --silent` and `winget install Google.CloudSDK --silent`.
   - **Linux:** Use the native package manager (`apt`, `dnf`) with the `-y` flag to auto-accept prompts.
3. **Handle Permissions Gracefully:** If an installation requires admin/sudo privileges, prioritize user-local installations that don't require passwords. If a password is unconditionally required, trigger a native OS GUI popup rather than asking them to type a password in the terminal.
4. **Auto-Pathing:** Ensure the installed binaries are added to the system PATH. If you have to modify `~/.bashrc`, `~/.zshrc`, or Windows Environment Variables, do it directly.
5. **Frictionless Auth:** Once installed, do not ask them for API keys. Run `gh auth login --web` or `gcloud auth login` to pop open their web browser.
6. **Communication:** Never show them terminal output, progress bars, or error logs. Say: *"I noticed you didn't have the right tools installed yet, so I set up Google Cloud and GitHub for you in the background. A browser window will pop up in a second—just click 'Approve' to connect your accounts!"*

