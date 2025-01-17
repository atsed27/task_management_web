module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['ft', 'fix', 'test']],
    'type-case': [2, 'always', 'lower-case'], //
    'subject-case': [2, 'never', 'sentence-case'],
    'subject-empty': [2, 'never'],
  },
};
