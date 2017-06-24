// Rollup plugins
import babel from 'rollup-plugin-babel';

export default {
  entry: 'main.js',
  dest: 'bundle.min.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  treeshake: false
};
