import fs from 'fs'

export default function copy(opts = {}) {
  return {
    name: 'copy',

    onwrite() {
      opts.afterBundle.forEach(pair => {
        const from = pair.from
        const to = pair.to

        fs.createReadStream(from).pipe(fs.createWriteStream(to))
      })
    }
  }
}
