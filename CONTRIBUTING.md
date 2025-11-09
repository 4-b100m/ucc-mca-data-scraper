# Contributing to UCC-MCA Intelligence Platform

Thank you for your interest in contributing to the UCC-MCA Intelligence Platform! This document provides guidelines for contributing to this project.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [PR Comment Management](#pr-comment-management)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Security](#security)

---

## Code of Conduct

This project adheres to professional and respectful collaboration. Please:
- Be respectful and constructive in all interactions
- Welcome newcomers and help them get started
- Focus on what is best for the community and project
- Show empathy towards other community members

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Familiarity with TypeScript and React

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/public-record-data-scrapper.git
   cd public-record-data-scrapper
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## How to Contribute

### Types of Contributions

- 🐛 **Bug Reports**: Submit detailed bug reports with reproduction steps
- ✨ **Feature Requests**: Propose new features with clear use cases
- 📝 **Documentation**: Improve docs, add examples, fix typos
- 💻 **Code**: Fix bugs, implement features, improve performance
- 🧪 **Testing**: Add tests, improve test coverage
- 🎨 **Design**: Improve UI/UX, create mockups

### Before You Start

1. Check existing issues to avoid duplicates
2. For large changes, open an issue first to discuss
3. Review the [PRD.md](./PRD.md) and [LOGIC_ANALYSIS.md](./LOGIC_ANALYSIS.md) to understand the project
4. Read [SECURITY.md](./SECURITY.md) for security guidelines

---

## Pull Request Process

### Creating a Pull Request

1. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**:
   - Follow coding standards (see below)
   - Add tests if applicable
   - Update documentation
   - Run linter: `npm run lint`
   - Build the project: `npm run build`

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**:
   - Use a clear, descriptive title
   - Reference related issues (e.g., "Fixes #123")
   - Provide detailed description of changes
   - Add screenshots for UI changes
   - List any breaking changes

### PR Checklist

Before submitting your PR, ensure:

- [ ] Code follows the project's coding standards
- [ ] Tests pass locally
- [ ] Documentation is updated (if needed)
- [ ] Commit messages follow conventions
- [ ] No hardcoded secrets or credentials
- [ ] PR description is clear and complete
- [ ] Related issues are referenced
- [ ] You've tested your changes thoroughly

---

## PR Comment Management

We track and manage PR comments to ensure clarity and timely resolution. Please follow these guidelines:

### For Comment Authors

**Making Effective Comments**:
- **Be Specific**: Clearly state the issue or suggestion
- **Be Actionable**: Provide concrete next steps
- **Be Constructive**: Focus on improvement, not criticism
- **Use Tags**: Prefix with `[Question]`, `[Suggestion]`, `[Security]`, `[Blocker]`, etc.

**Example**:
```
[Security] The database password on line 42 is hardcoded. Please use environment 
variables instead:

process.env.DB_PASSWORD

This prevents credential exposure in version control.
```

**Response Time**:
- Respond to questions within 48 hours
- For urgent items (security, blockers), respond within 24 hours
- If you need more time, acknowledge the comment with an ETA

### For PR Authors

**Handling Comments**:
1. **Review all comments** before responding
2. **Acknowledge** each comment, even if you disagree
3. **Ask for clarification** if a comment is unclear
4. **Make changes** based on valid feedback
5. **Mark as resolved** once addressed
6. **Update the PR description** to reflect major changes

**Unresolved Comments**:
- If a comment requires discussion, label it with `[Discussion Needed]`
- Tag relevant stakeholders
- Document the discussion outcome
- Update [PR_COMMENTS_TRACKING.md](./PR_COMMENTS_TRACKING.md) for open-ended items

### For Reviewers

**Providing Reviews**:
- **Review promptly**: Within 48-72 hours of PR creation
- **Be thorough**: Check code, tests, docs, and security
- **Prioritize**: Mark critical issues clearly
- **Suggest, don't demand**: Offer alternatives
- **Approve or request changes**: Don't leave PRs in limbo

**Comment Categories**:
- 🔴 **Blocker**: Must be fixed before merge (security, breaking changes)
- 🟡 **Important**: Should be addressed (performance, maintainability)
- 🟢 **Nice to have**: Optional improvements (style, minor optimizations)
- 💬 **Question**: Seeking clarification

### Open-Ended Comment Process

If a comment requires extended discussion or decision-making:

1. **Document in [PR_COMMENTS_TRACKING.md](./PR_COMMENTS_TRACKING.md)**:
   - Comment summary
   - Stakeholders involved
   - Decision points
   - Proposed resolution
   - Timeline

2. **Assign an owner**: Someone responsible for driving resolution

3. **Set a deadline**: When a decision should be made

4. **Follow up**: Check status weekly

5. **Resolve and document**: Once resolved, update tracking document and mark comment as resolved in GitHub

---

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Use functional components and hooks in React
- Avoid `any` type; use proper typing

### File Organization

```
src/
├── components/     # React components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and libraries
├── types/          # TypeScript type definitions
└── data/           # Mock data and constants
```

### Naming Conventions

- **Files**: PascalCase for components (`ProspectCard.tsx`), camelCase for utilities (`formatDate.ts`)
- **Components**: PascalCase (`ProspectCard`)
- **Functions**: camelCase (`calculateScore`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Interfaces/Types**: PascalCase (`ProspectData`)

### Code Quality

- Run `npm run lint` before committing
- Fix all ESLint warnings
- Use `prettier` for code formatting (if configured)
- Keep functions small and focused (single responsibility)
- Avoid deep nesting (max 3 levels)
- Use early returns to reduce complexity

---

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, tooling
- `ci`: CI/CD changes

### Examples

```
feat(dashboard): add stale data warning component

Implements a visual indicator to alert users when prospect data 
is more than 24 hours old.

Fixes #42
```

```
fix(filters): resolve state closure bug in batch operations

Previously, batch operations used stale filter state due to closure
issues. Now uses functional updates to ensure current state.

Resolves issue identified in LOGIC_ANALYSIS.md
```

---

## Security

### Security Best Practices

- **Never commit secrets**: No API keys, passwords, or credentials in code
- **Use environment variables**: For sensitive configuration
- **Validate inputs**: Sanitize user inputs and external data
- **Report vulnerabilities**: See [SECURITY.md](./SECURITY.md) for reporting process
- **Review dependencies**: Check for known vulnerabilities
- **Follow principle of least privilege**: Request only necessary permissions

### Security Review

All PRs are subject to security review. Common security issues to avoid:

- Hardcoded credentials
- SQL injection vulnerabilities
- XSS vulnerabilities
- Insecure data storage
- Insufficient input validation
- Information disclosure through error messages
- Unencrypted sensitive data transmission

---

## Getting Help

- **Questions**: Open an issue with the `question` label
- **Discussions**: Use GitHub Discussions (if enabled)
- **Bugs**: Open an issue with the `bug` label
- **Features**: Open an issue with the `enhancement` label

---

## Recognition

Contributors who make significant contributions will be recognized in:
- Project README
- Release notes
- Git commit history

---

## License

By contributing to this project, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

---

Thank you for contributing to the UCC-MCA Intelligence Platform! 🎉
