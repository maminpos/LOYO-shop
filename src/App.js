import React from "react";
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer/Drawer";
import axios from "axios";
import Basket from "./components/Basket/Basket";
import Skeleton from "./components/Skeleton/Skeleton";

function App() {
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])

    //поиск
    const [searchValue, setSearchValue] = React.useState('')
    const [searchView, setSearchView] = React.useState(false)

    const [passCardOverlay, setPassCardOverlay] = React.useState(false)
    const [openBasket, setOpenBasket] = React.useState(false)
    const [cardOpenDraw, setCardOpenDraw] = React.useState([])

    //skeleton
    const [loading, setLoading] = React.useState(true)

    //theme
    const [theme, setTheme] = React.useState(false)


    React.useEffect(() => {
        setLoading(true)

        async function Load() {
            const item = await axios.get('https://64abf86a9edb4181202ee11f.mockapi.io/data')
            const cart = await axios.get('https://64abf86a9edb4181202ee11f.mockapi.io/cart')

            setItems(item.data)
            setCartItems(cart.data)
            setLoading(false)
        }

        Load();
    }, [])

    const cardClick = (item) => {
        setCardOpenDraw(item)
    }


    const onAddToCart = (item) => {
        let boolValue = false
        cartItems.forEach((el) => {
            if (el.id2 === item.id2) {
                boolValue = true
            }
        })
        if (!boolValue) {
            setCartItems((prev) => [...prev, item])
            axios.post('https://64abf86a9edb4181202ee11f.mockapi.io/cart', item)
                .then(() => {
                    axios.get('https://64abf86a9edb4181202ee11f.mockapi.io/cart')
                        .then(res => {
                            setCartItems(res.data)
                        })
                })
        }
    }

    const onDeleteCart = (item) => {
        setCartItems((prev) => [...prev.filter((el) => el.id2 !== item.id2)])
        try{
            axios.delete(`https://64abf86a9edb4181202ee11f.mockapi.io/cart/${item.id}`)
        } catch (e){
            console.log(e)
        }
    }

    const onHandleSearchValue = (event) => {
        setSearchValue(event.target.value)
    }

  return (
  <div className={theme ? "dark-theme" : "light-theme"}>
    <div className="wrapper clear">
      {openBasket && <Basket
          onDeleteCart={onDeleteCart}
          theme={theme}
          cartItems={cartItems}
          onCloseBasket={() => setOpenBasket(false)}
          onClickCloseBasket={() => setOpenBasket(false)}
      />}
      {passCardOverlay && <Drawer
          onAddToCart={onAddToCart}
          theme={theme}
          obj={cardOpenDraw}
          onClose={() => setPassCardOverlay(false)}
          items={setItems}/>}
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
              <div className="searchBlock" style={searchView ? {opacity: 1} : {display: 'none'}}>
                  <input
                      className=''
                      maxLength={20}
                      type="text"
                      placeholder='Поиск...'
                      onChange={onHandleSearchValue}
                  />
                  <div onClick={() => setSearchValue('')}>
                      <img onClick={() => setSearchView(false)}
                           className='pos-a cu-p' src="/img/close.svg" alt="close"/>
                  </div>
              </div>
              <img
                  onClick={() => setSearchView(true)}
                  style={searchValue ? {opacity: 0, pointerEvents: 'none'} : {}}
                  src="/img/searchIcon.png"
                  alt="search"
                  className="searchIcon ml-10 cu-p"
              />
              <img
                  style={searchValue ? {opacity: 0, pointerEvents: 'none'} : {}}
                  onClick={() => setOpenBasket(true)}
                  src="/img/basketIcon.png"
                  alt="basket"
                  className="basketIcon ml-10 cu-p"
              />
              <img
                  style={searchValue ? {opacity: 0, pointerEvents: 'none'} : {}}
                  src="/img/profileIcon.png"
                  alt="profile"
                  className="profileIcon ml-10 cu-p"
              />
              <img
                  style={searchValue
                      ? {opacity: 0, pointerEvents: 'none'}
                      : {backgroundColor: '#e7e9eb', padding: '10px'}}
                  src={theme ? "/img/moon.png" : "/img/sun.png"}
                  alt="profile"
                  onClick={() => setTheme(!theme)}
                  className="profileIcon ml-10 cu-p"
              />
          </div>
      </header>
      <div className="content">
          <div className="filtrationSection mt-5 d-flex align-center justify-between">
              <div className='d-flex justify-center align-center'>
                  <h1 className='ml-40'>Футболки</h1>
              </div>
              <div className='searchList pos-r'>
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

              loading
                  ? [...Array(10)].map((obj) => <Skeleton/>)
                  : items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                  item.tag.toLowerCase().includes(searchValue.toLowerCase())).map((obj) => (
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
  </div>
  );
}

export default App;
