# Shoppago Marketplace API

This API is for manage a fake marketplace called [Shoppago](https://shoppago-market.herokuapp.com/) The products provide for the API was getting by web scrapping, then were saved into my database, in other words, I created my resources for comsuming the API for the web application. The data was taken from alibaba.

## Getting started

Anyone can consume the API, just following the next HTTP request. All those request return a JSON file.

### Products:

- GET [https://shoppago-market.herokuapp.com/api/product/products](https://shoppago-market.herokuapp.com/api/product/products) : return the list (array) of all products in stock.
- GET [https://shoppago-market.herokuapp.com/api/products-category](https://shoppago-market.herokuapp.com/api/products-category) : return list (array) of products related with its category.
- GET [https://shoppago-market.herokuapp.com/api/product/search?words[]={word1}&words[]={word2}](https://shoppago-market.herokuapp.com/api/product/search?words[]=xbox&words[]=nintendo) : this receive a array of words via query string, then return all products that match.
- GET [https://shoppago-market.herokuapp.com/api/product/:id](https://shoppago-market.herokuapp.com/api/product/5d6decfaa3fdb3241c3ba103) : return a product detail if the you provide and id.
  Response of the GET request:

```
{
  "_id": "5d6dfea65a32800ec4f9a83b",
  "name": "Hot Selling High",
  "description": "Hot Selling High Speed Charging Dock Charging Station for Xbox One/One X/One S Controller",
  "price": "$4.99",
  "priceFormated": 4.99,
  "quantity": 100,
  "image": "https://sc02.alicdn.com/kf/HTB1yFizayDxK1Rjy1zcq6yGeXXaV/Hot-Selling-High-Speed-Charging-Dock-Charging.jpg_300x300.jpg",
  "createdAt": "2019-09-03T05:48:22.811Z",
  "updatedAt": "2019-09-03T05:48:22.811Z",
  "__v": 0
}
```

- POST [https://shoppago-market.herokuapp.com/api/product](https://shoppago-market.herokuapp.com/api/) : return add new product created. The body of request must be:

```
{
	name: String,
	description: String,
	price: String,
	priceFormated: Number,
	quantity: Number,
	image: String,
	category: String
}
```

_Note:_ Before create a product, category given have to be created first. Parameter _image_ is a url of the image o thumbnail os the product.

- PUT [https://shoppago-market.herokuapp.com/api/product/:id](https://shoppago-market.herokuapp.com/api/product/5d6decfaa3fdb3241c3ba103) : Update a product if an valid id is given, the return the product updated. POST and PUT request have the same body structure.
- DELETE [https://shoppago-market.herokuapp.com/api/product/:id](https://shoppago-market.herokuapp.com/api/product/:id5d6d067c08ea1e216463d268) : return the product delete.

### Categories

- GET [https://shoppago-market.herokuapp.com/api/category/:name](https://shoppago-market.herokuapp.com/api/category/gadgets) : return all products (array) related with the category given.
  Response of the GET request:

```
[
  {
    "_id": "5d6df45b261ed0226c95444d",
    "product": {
      "_id": "5d6df45a261ed0226c95444c",
      "name": "EasyPAG Wood Desktop",
      "description": "EasyPAG Wood Desktop Bookshelf Assembled Countertop Bookcase Adjustable Literature Display Rack",
      "price": "$8.20",
      "priceFormated": 8.2,
      "quantity": 100,
      "image": "https://sc01.alicdn.com/kf/HTB1LiVdeEuF3KVjSZK9q6zVtXXaJ/EasyPAG-Wood-Desktop-Bookshelf-Assembled-Countertop-Bookcase.jpg_300x300.jpg",
      "createdAt": "2019-09-03T05:04:26.387Z",
      "updatedAt": "2019-09-03T05:04:26.387Z"
    },
    "category": {
      "_id": "5d6de63d8dd9ed2298f98262",
      "name": "furniture",
      "createdAt": "2019-09-03T04:04:13.386Z",
      "updatedAt": "2019-09-03T04:04:13.386Z"
    },
    "createdAt": "2019-09-03T05:04:27.085Z",
    "updatedAt": "2019-09-03T05:04:27.085Z",
    "__v": 0
  }
]
```

- POST [https://shoppago-market.herokuapp.com/api/category](https://shoppago-market.herokuapp.com/api/category) : return a new category created. The body request must be:

```
{
	name: String
}
```

### Shopping

- GET [https://shoppago-market.herokuapp.com/api/shopping/cart/:id](https://shoppago-market.herokuapp.com/api/shopping/cart/5d6e37fd627d3029c0bae122) : return a shopping cart by its id.

```
{
  "products": [
    "5d6decfaa3fdb3241c3ba106"
  ],
  "_id": "5d6e37fd627d3029c0bae122",
  "createdAt": "2019-09-03T09:53:01.283Z",
  "updatedAt": "2019-09-03T09:53:01.283Z",
  "__v": 0
}
```

- POST [https://shoppago-market.herokuapp.com/api/shopping](https://shoppago-market.herokuapp.com/api/shopping) : creates and return a shopping cart.
- POST [https://shoppago-market.herokuapp.com/api/shopping/product](https://shoppago-market.herokuapp.com/api/shopping/product) : Add a product into a shopping cart. Body request:

```
{
	productId: ObjectId(),
	shoppingId: ObjectId()
}
```

- POST [https://shoppago-market.herokuapp.com/api/shopping/buy](https://shoppago-market.herokuapp.com/api/shopping/buy) : complete the purchase and send and email with details. Body request:

```
{
	cart: JSON Array (products),
	subtotal: Number,
	email: String
}
```

- DELETE [https://shoppago-market.herokuapp.com/api/shopping/product/shoppingId?productId={id}](https://shoppago-market.herokuapp.com/api/shoppingId) : delete a product from a shopping cart. The shopping cart id must be sent by url params and the product id by query string.

## Running the app

### Requirements

You must install [NodeJS](https://nodejs.org/en/). No need install MongoDB because the API use a DB on cloud.

### Installing

1. Download the repo like a zip or copy the web url, open your terminal and type _git clone url_of_this_repo_.
2. Get into the api folder
3. Use your terminal to run `npm i && npm start`, then you could see a log message _Connected to database, Server's working on port 8080_ (The port must be free for use).
4. If you want to run on development enviroment, you must to install _nodemon_ and run `npm run dev` (Optional).

## Technology

This API was build with:

- [Node JS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Express JS](https://expressjs.com/)
- [SendGrid API](https://sendgrid.com/). For sending email
- [React JS](https://reactjs.org/). The client application reside into Node App, when a request is invalid, you'll see a motivated message :'), but I explain you in this [repo](https://github.com/LuisFuenTech/shoppago-marketplace)

### Developed with ♥ by Luis Fuentes

- [Instagram](https://www.instagram.com/luisfuentech/)
- [Twitter](https://twitter.com/luisfuentech)
  _I hope for becoming be part of your family, Condor Labs. Let's fly together so high as we can!_
