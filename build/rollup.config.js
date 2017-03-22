import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import copy from './rollup-plugin-copy'

export default {
  entry: 'src/index.js',
  dest: 'dist/gallery.min.js',
  format: 'umd',
  moduleName: "Gallery",
  exports: 'default',
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    buble(),
    uglify(),
    copy({
      afterBundle: [{
        from: path.join(__dirname, '../dist/gallery.min.js'),
        to: path.join(__dirname, '../docs/gallery.min.js')
      }]
    })
  ]
}
