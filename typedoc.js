module.exports = {
  inputFiles: ['./framework'],
  includeDeclarations: true,
  excludeExternals: false,
  mode: 'file',
  out: 'docs',
  exclude: ['**/!(types)/*.ts'],
};
