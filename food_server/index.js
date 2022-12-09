// import express 
const express = require('express')

// import cors
const cors = require('cors')

// Create a server app using express
const app = express()

// State origin
app.use(cors(
    {
        origin: 'http://localhost:4200'
    }
))

// set up a path number for server app
app.listen(3000, () => {
    console.log(("server Started succesffully..."));

})

// imoport jwt token
const jwt = require('jsonwebtoken')

// Application specific middleware
const appMiddleware = (req, res, next) => {
    console.log('Application specific middleware');
    next()
}

// to use the middleware in entire application
app.use(appMiddleware)

// import data services
const dataservices = require('./dataservices/dataservices')

// to change into json format
app.use(express.json())

// token verification middleware
const jwtMiddleware = (req, res, next) => {

    // to get token from request header in access token
    const token = req.headers['access-token']

    // verify the token using jsonwebtoken
    try {
        const data = jwt.verify(token, "skey0025")
        console.log(data);
        req.currentUsername = data.currentUsername
        next()
    }
    catch
    {
        res.status(422).json({
            status:false,
            message : 'please log in '
        })
    }
    
}

// login
app.post('/login', (req, res) => {
    console.log(req.body);
    dataservices.login(req.body.username, req.body.password).then((result) => {
        res.status(result.statusCode).json(result)
    })
})

// register
app.post('/register', (req, res) => {
    console.log(req.body);
    dataservices.register(req.body.username, req.body.password, req.body.email, req.body.mob).then((result) => {
        res.status(result.statusCode).json(result)
    })
})


// to book table
app.post('/bookTable', jwtMiddleware, (req, res) => {
    console.log(req.body);
    dataservices.booktable(req, req.body.username, req.body.mob, req.body.email, req.body.noOfPersons,req.body.foodItem, req.body.date).then((result) => {
        res.status(result.statusCode).json(result)
        // res.send('not valid')

    })
})

// to get booked table details
app.get('/booked-table-details/:username',jwtMiddleware, (req, res) => {
    dataservices.bookedTableDetails(req.params.username).then((result) => {
        console.log(result);
        res.status(result.statusCode).json(result)
    })
}
)

// to post cart items
// app.post('/cart-items/:id',jwtMiddleware, (req, res) => {
//     dataservices.addtocart(req.params.id).then((result) => {
//         console.log(result);
//         res.status(result.statusCode).json(result)
//     })
// })

// // to get cart item details
// app.get('/all-cart-items/:id',jwtMiddleware, (req, res) => {
//     dataservices.bookedTableDetails(req.params.id).then((result) => {
//         console.log(result);
//         res.status(result.statusCode).json(result)
//     })
// }
// )


// to get all product
app.get('/getall-foodLists', (req, res) => {
    dataservices.getAll().then((result) => {
        console.log(result);
        res.status(result.statusCode).json(result)
    })
}
)

// to delete Account
app.delete('/delete-account/:username', jwtMiddleware,(req, res) => {
    dataservices.deleteAccount(req.params.username).then((result) => {
        console.log(result);
        res.status(result.statusCode).json(result)
    })
}
)


app.post('/change-password', (req, res) => {
    dataservices.changePassword(req.username,req.password).then((result) => {
        console.log(result);
        res.status(result.statusCode).json(result)
    })
}
)
