# Contributing to ScrolLearn

Thank you for your interest in contributing to ScrolLearn! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork>`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Follow the setup in [SETUP.md](./SETUP.md)

## Development Workflow

### Backend Development

1. Create a new route in `backend/app/routes/`
2. Update models in `backend/app/models.py` if needed
3. Add schemas in `backend/app/schemas.py`
4. Include the router in `backend/app/main.py`
5. Test via `/docs` endpoint

### Frontend Web Development

1. Create components in `frontend-web/src/components/`
2. Update `frontend-web/src/App.jsx`
3. Use Tailwind CSS for styling
4. Test on desktop and mobile browsers

### Mobile Development

1. Create screens in `frontend-mobile/src/screens/`
2. Create components in `frontend-mobile/src/components/`
3. Update API calls in `frontend-mobile/src/utils/api.ts`
4. Test on iOS and Android

## Commit Messages

Follow conventional commits:

```
type(scope): description

feat(backend): add user authentication
fix(web): resolve card scrolling bug
docs(mobile): update setup instructions
```

Types: feat, fix, docs, style, refactor, test, chore

## Pull Request Process

1. Update documentation
2. Add tests if applicable
3. Ensure no breaking changes
4. Request review from maintainers
5. Address feedback promptly

## Testing

### Backend

```bash
cd backend
pytest
```

### Web Frontend

```bash
cd frontend-web
npm test
```

### Mobile

```bash
cd frontend-mobile
npm test
```

## Code Style

### Python (Backend)

- PEP 8 compliance
- Type hints recommended
- Docstrings for functions

### JavaScript/React (Web & Mobile)

- ESLint configuration
- Prettier formatting
- Clear variable names

## Documentation

- README.md files in each folder
- Inline code comments for complex logic
- Update SETUP.md for new dependencies
- Add examples for new features

## Issues

- Check if issue already exists
- Provide clear description
- Include steps to reproduce bugs
- Suggest solutions if possible

## Feature Requests

- Describe the feature
- Explain the use case
- Suggest implementation approach

## Areas for Contribution

- [ ] Authentication system
- [ ] User profiles
- [ ] Advanced search
- [ ] Export functionality
- [ ] Dark mode improvements
- [ ] Performance optimization
- [ ] Additional languages
- [ ] Tests and test coverage
- [ ] Documentation
- [ ] Bug fixes and improvements

## Questions?

Create an issue or discussion in the repository.

## License

By contributing, you agree your code will be licensed under MIT.

Thank you for contributing! 🎉
