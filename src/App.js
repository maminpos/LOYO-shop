import React from "react";
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer/Drawer";
import axios from "axios";
import Basket from "./components/Basket/Basket";

function App() {
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])

    const [passCardOverlay, setPassCardOverlay] = React.useState(false)
    const [openBasket, setOpenBasket] = React.useState(false)
    const [cardOpenDraw, setCardOpenDraw] = React.useState([])


    React.useEffect(() => {
        axios.get('https://64abf86a9edb4181202ee11f.mockapi.io/data')
            .then(res => {
                setItems(res.data)
            })
    }, [])

    const cardClick = (item) => {
        setCardOpenDraw(item)
    }


    const onAddToCart = (item) => {
        let boolValue = false
        cartItems.forEach((el) => {
            if (el.id === item.id) {
                boolValue = true
            }
        })
        if (!boolValue) {
            setCartItems((prev) => [...prev, item])
        }
    }

    const onDeleteCart = (item) => {
        setCartItems((prev) => [...prev.filter((el) => el.id !== item.id)])
    }

  return (
    <div className="wrapper clear">
      {openBasket && <Basket
          onDeleteCart={onDeleteCart}
          cartItems={cartItems}
          onCloseBasket={() => setOpenBasket(false)}
          onClickCloseBasket={() => setOpenBasket(false)}
      />}
      {passCardOverlay && <Drawer onAddToCart={onAddToCart} obj={cardOpenDraw} onClose={() => setPassCardOverlay(false)} items={setItems}/>}
      <header className='d-flex align-center justify-between'>
          <div className="leftHeader d-flex align-center">
              <img src="/img/logo.png" alt="logo"/>
              <p className='cu-p ml-10 fw-bold'>LOYO</p>
          </div>
          <div className="mainHeader d-flex">
              <ul className='d-flex'>
                  <li className="ml-40">
                      <a href="#Главная">Главная</a>
                  </li>
                  <li className="ml-40">
                      <a href="#Коллекция">Коллекция</a>
                  </li>
                  <li className="ml-40">
                      <a href="#Доставка">Доставка</a>
                  </li>
                  <li className="ml-40">
                      <a href="#Контакты">Контакты</a>
                  </li>
              </ul>
          </div>
          <div className="rightHeader d-flex ">
              <img
                  src="/img/searchIcon.png"
                  alt="search"
                  className="searchIcon ml-10"
              />
              <img
                  onClick={() => setOpenBasket(true)}
                  src="/img/basketIcon.png"
                  alt="basket"
                  className="basketIcon ml-10"
              />
              <img
                  src="/img/profileIcon.png"
                  alt="profile"
                  className="profileIcon ml-10"
              />
          </div>
      </header>
      <div className="content">
          <div className="filtrationSection mt-5 mr-10 d-flex align-center justify-between">
              <div className='d-flex justify-center align-center'>
                  <h1 className='ml-40'>Футболки</h1>
              </div>
              <div className='searchInput mr-50 pos-r'>
                  <select className='cu-p'>
                      <option value="Попуплярность">По популярности</option>
                      <option value="Возрастание">По возрастанию цены</option>
                      <option value="Убывание">По убыванию цены</option>
                  </select>
                  <img src="/img/arrowInSearchInput.png" alt="arrow"/>
              </div>
          </div>
          <main className='d-flex flex-wrap'>
          {
              items.map((obj) => (
                  <Card
                      key={obj.id}
                      title ={obj.title}
                      price = {obj.price}
                      imageUrl = {obj.imageUrl}
                      typeClothing = {obj.typeOfClothing}
                      tag = {obj.tag}
                      colorBtn = {obj.colorButton}
                      onClickImage={() => setPassCardOverlay(true)}
                      onClickLink={() => cardClick(obj)}
                  />
              ))
          }
          </main>
      </div>
    </div>
  );
}

export default App;
