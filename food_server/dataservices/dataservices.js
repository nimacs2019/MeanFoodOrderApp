// import db
const db = require('./db')

// imoport jwt token
const jwt = require('jsonwebtoken')

// login definition
const login = (username, password) => {
    return db.User.findOne({
        username,
        password
    }).then((result) => {
        console.log(result);
        if (result) {
            const token = jwt.sign({
                currentUsername: username
            }, "skey0025")

            // send to client
            return {
                message: "login successful",
                status: true,
                statusCode: 200,
                username: result.username,
                token,
                currentUsername: username
            }
        }
        else {
            return {
                message: "Invalid username or password",
                status: false,
                statusCode: 404
            }
        }
    })
}


// register Function
const register = (username, password, email, mob) => {
    // 1. search username in db if yes
    // 2. if yes response- already exist
    // 3. new user data stored


    return db.User.findOne({
        username
    }).then((result) => {
        if (result) {
            return {
                message: "Already Exisit",
                status: false,
                statusCode: 404
            }
        }
        else {
            let newUser = new db.User({
                username,
                password,
                email,
                mob,
                cartdetails: [

                ]
            })
            newUser.save()
            return {
                message: "Registered Successfully",
                status: true,
                statusCode: 200
            }
        }
    })
}

const booktable = (req, username, mob, email, noOfPersons, foodItem, date) => {
    console.log("username in token :" + req.currentUsername);
    return db.User.findOne({
        username
    }).then((result) => {
        if (username != req.currentUsername) {
            return {
                message: "Permission denied",
                status: false,
                statusCode: 404
            }
        }
        console.log(result);
        if (result) {
            let newTable = new db.Booktable(
                {
                    username,
                    mob,
                    email,
                    noOfPersons,
                    foodItem,
                    date
                }

            )
            newTable.save()
            return {
                message: "table booked",
                status: true,
                statusCode: 200
            }
        }
        else {
            return {
                message: "invalid",
                status: false,
                statusCode: 404

            }
        }
    })

}

// add to cart
// const addtocart = (product) => {

//     const newItem = new db.Cart(
//         {
//             id: product.id,
//             name: product.name,
//             price: product.price,
//             description: product.description,
//             photoghaph: product.photoghaph,
//             rating: {
//                 rate: product.rate,
//                 count: product.count
//             }

//         }
//     )
//     newItem.save()
//     return {
//         status: true,
//         statusCode: 200,
//         message: 'added to cart',
//         products: result



//     }

// }


// // get carted items
// const getCartItem = () => {
//     return db.Cart.find().then((result) => {
//         if (result) {
//             return {
//                 status: true,
//                 statusCode: 200,
//                 cartItems: result

//             }
//         }
//         else {
//             return {
//                 status: false,
//                 statusCode: 404,
//                 message: 'invalid'
//             }

//         }
//     })
// }



// to get all details in foodlist
const getAll = () => {
    return db.Foodlist.find().then((result) => {
        console.log(result);
        if (result) {
            return {
                status: true,
                statusCode: 200,
                products: result
            }
        }
        else {
            return {
                status: false,
                statusCode: 404,
                message: 'invalid'
            }

        }
    })

}


// to get booked table details
const bookedTableDetails = (username) => {

    return db.Booktable.find({
        username

    }).then((result) => {
        if (result) {

            return {
                status: true,
                statusCode: 200,
                tableBooked: result
            }
        }
        else {
            return {
                status: false,
                statusCode: 404,
                message: 'invalid'
            }

        }
    })
}

// delete
const deleteAccount = (username) => {
    return db.User.deleteOne({
        username
    }).then((result) => {
        if (result) {
            return {
                status: true,
                statusCode: 200,
                message: ` Deleted Account Successfully.....`

            }
        }
        else {
            return {
                status: false,
                statusCode: 404,
                message: 'Invalid Username'
            }

        }
    })
}

const changePassword = (username,password)=>{
    let newPassword =""
    return db.User.findOne({
        username,password
    }).then((result)=>{
        console.log(result)
        if(result)
        {
            result.password=newPassword
            return{
                message :'password changed',
                status:true,
                statusCode:200
            }
        }
        else
        {
            return{
                message:'invalid Password',
                status:false,
                statusCode:404
            }
        }
    })
}









module.exports =
{
    getAll,
    login,
    register,
    booktable,
    bookedTableDetails,
    // addtocart,
    // getCartItem,
    deleteAccount,
    changePassword
}