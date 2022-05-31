const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/components/signUp.html')
})

app.post('/', (req, res) => {
  const email = req.body.email
  const firstName = req.body.fName
  const lastName = req.body.lName
  
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data)

  const url = ' https://us11.api.mailchimp.com/3.0/lists/fb2891ddc6'

  const options = {
		method: 'POST',
		auth: 'rsiesener91:df15a835b6a7730c3f5e959cd2f26db3-us11',
	}

  const request = https.request(url, options, (response) => {
    response.on('data', (data) => {
      console.log(JSON.parse(data))
    })
  })
  request.write(jsonData)
  request.end()
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

//API Key
// df15a835b6a7730c3f5e959cd2f26db3 - us11

//List ID
// fb2891ddc6