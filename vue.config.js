const path = require("path")

module.exports={
  devServer: {
      proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  chainWebpack:config=>{
    config.resolve.alias
      .set('components',path.resolve(__dirname,"./src/components"))
      .set('utils',path.resolve(__dirname,"./src/utils"))

  }
}