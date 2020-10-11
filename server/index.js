require('dotenv').config()
const ngrok = require('ngrok');
const app = require('./app');
const port = process.env.PORT || 8080
async function establishConnection(){
  console.log(process.env.NODE_ENV)
  if(process.env.NODE_ENV === 'development'){
    const url = await ngrok.connect(port);
    process.env.MY_URL = url;
  }
  console.log(process.env.MY_URL);
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}
establishConnection(); 

// setInterval(checkActions, 10000)


