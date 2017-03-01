let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')

//Moteur de template
app.set('view engine', 'ejs')

//Middelware
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'nothingspecial',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } //no https
}))

//Routes
app.get('/', (request, response) => {
  if(request.session.error){
    response.locals.error = request.session.error
    request.session.error = undefined

  }
  response.render("pages/index.ejs")
})

app.post('/', (request, response) => {
  if (request.body.message === undefined || request.body.message === ''){
    request.session.error = "Vous n'avez pas entré de message ! ";
    response.redirect('/')
  }
})

app.listen(8080)
