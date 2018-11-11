export default {
    entry: 'dist/index.js',
    dest: 'dist/bundles/ng-typed.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'ng-typed',
    globals: {
      '@angular/core': 'ng.core',
    }
  }