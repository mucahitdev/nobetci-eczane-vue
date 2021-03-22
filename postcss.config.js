module.exports = {
  plugins: {
    'postcss-nested': {},
    'postcss-custom-media': {
      importFrom: [
        {
          customMedia: { '--t': '(min-width: 980px)' }
        },
        {
          customMedia: { '--d': '(min-width: 1270px)' }
        }
      ]
    }
  }
}
//npm i -D postcss-custom-media@7.0.0 postcss-nested@4.2.3