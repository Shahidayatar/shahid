// from video no 239
class Product {
  // title = 'DEFAULT';
  // imageUrl;
  // description;
  // price;

  constructor(title, image, desc, price) {
    //Constructor is created by using the keyword "constructor" inside the class
    this.title = title; // this.titile refers to line 3
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}
class ElementAttribute{
  constructor(attrName,attrValue){
    this.name=attrName;
    this.value=attrValue;
  }
}
class Component{//Inheritance 

  constructor(renderHookID){
    this.hookID=renderHookID;  
  }
  CreateRootElement(tag,cssClasses,attributes){
    const rootElement=document.createElement(tag);
    if(cssClasses){
      rootElement.className=cssClasses
    }
    if(attributes && attributes.length>0) {
        for(const attr of attributes){
          rootElement.setAttributes(attr.name, attr.value);
        }
    }
    document.getElementById(this.hookID).append(rootElement);
    return rootElement;
  }
}
class ShoppingCart extends Component{// in javascript we can only inherit from one class
  items = [];
  set cartItems(value){
    this.items=value;
    this.totalOutput.innerHTML = `<h2> Total : \$${this.totalAmount.toFixed(2)} </h2>`;
  }

  get totalAmount() {
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
      const sum = this.items.reduce((prevValue,CurItem)=>{// reduce (array function)
        return prevValue+CurItem.price
    },0)
    return sum
  }
 
  constructor(renderHookID){
     super(renderHookID)// this will call the constructor of the parent class
  }

  addProduct(product){
    const updatedItems=[...this.items ]//spread operator
    updatedItems.push(product);
    this.cartItems=updatedItems;
    
  }

  render() {
    //const cartEl = document.createElement('section');
    const cartEl= this.CreateRootElement('section','cart');
    cartEl.innerHTML = `
    <h2>Total: \$${0}</h2>
      <button>Order Now!1</button>
    `;
    cartEl.className = 'cart'; //css style
    this.totalOutput=cartEl.querySelector('h2');
    //return cartEl;
  }
}
class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);  
  }

  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'product-item';
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector('button'); // to select the button
    addCartButton.addEventListener('click', this.addToCart.bind(this)); // bind is like mixing two functions
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind

    return prodEl;
  }
}

class ProductList {
  products = [
    new Product( // this is the way to call the class and its constructor
      'nike Shoes',
      'https://images.unsplash.com/photo-1578116922645-3976907a7671?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      'beutiful shoes',
      20
    ),
    new Product(
      'Jeans',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/jeans-2-1590000721.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*',
      'denim Jeans',
      29.99 
    ),
  ];
  constructor() {}
  render() {
   
    const prodlist = document.createElement('ul');
    prodlist.className = 'product-list'; // we have css class of this name check the file
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodlist.append(prodEl);
    }
   return prodlist;
  }
}
/*const productList = {
  products: [
    // this is a property

    
    {
      title: 'Shoes',
      imageUrl:
        'https://marks.scene7.com/is/image/marksp/290913_BQ3204-002_PROD_1_BLACK?bgColor=0,0,0,0&op_sharpen=1&resMode=sharp2&fmt=jpg&qlt=85,0&wid=460&hei=528',
      price: 19.99,
      description: 'Nike Shoes',
    },
    {
      title: 'Jeans',
      imageUrl:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/jeans-2-1590000721.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*',
      price: 29.99,
      description: 'denim Jeans',
    },
  ],
  render() {
    
  },
};// having a new approach so */

class Shop{
  render(){
    
    const renderHook = document.getElementById('app');

    this.cart = new ShoppingCart('app');
     this.cart.render()
    
    const productList = new ProductList();
    const prodListEl=productList.render();

    // renderHook.append(cartEl);
     renderHook.append(prodListEl)
  }
}

class App{
  static init(){// in static you dont have to create an object of this class
    const shop =new Shop();
    shop.render()
    this.cart= shop.cart;
   
  }

  static addProductToCart(product){
    this.cart.addProduct(product)
  }
}
App.init();
