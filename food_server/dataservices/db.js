// import mongoose
const mongoose = require('mongoose')

// set up connection string mongoose
mongoose.connect('mongodb://localhost:27017/FoodOrder', () => {
    console.log("mongodb connected !!!!!!!!!!!");
})


const foodlistsSchema = new mongoose.Schema(
    {
        id: Number,
        name: String,
        price: Number,
        description: String,
        photoghaph: String,
        rating: {
            rate: Number,
            count: Number
        }
    }
);

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        email: String,
        mob: String,
        cartdetails: [

        ]
    }
);

const cartSchema = new mongoose.Schema(
    {
        id: Number,
        name: String,
        price: Number,
        description: String,
        photoghaph: String,
        rating: {
            rate: Number,
            count: Number
        }
    }
);

const bookTableSchema = new mongoose.Schema(
    {
        username: String,
        mob: String,
        email: String,
        noOfPersons: String,
        foodItem:String,
        date: String

    }
);

const Foodlist = mongoose.model('foodlists', foodlistsSchema);
const User = mongoose.model('users', userSchema);
const Booktable = mongoose.model('booktables', bookTableSchema);
const Cart = mongoose.model('carts', cartSchema);

module.exports =
{
    Foodlist,
    User,
    Booktable,
    Cart
}