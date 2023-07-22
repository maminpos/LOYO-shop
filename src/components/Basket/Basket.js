import React from "react";
import style from './index.modules.scss'

function Basket({onCloseBasket, onClickCloseBasket,onDeleteCart, cartItems = []}) {

    const [sumItems, setSumItems] = React.useState(1)

    return(
        <div>
            <div className='overlay'>
                <div onClick={onCloseBasket} className="basketBackOverlay"></div>
                <div className='basketDrawing'>
                    <div className="basketHeader d-flex justify-between align-center">
                        <h4>Корзина</h4>
                        <img width={30} onClick={onClickCloseBasket} src="/img/close.svg" alt="close_basket" className="basketClose"/>
                    </div>

                    <div className="basketContent">
                        {cartItems.map((item) => (
                                <div className='cart d-flex'>
                                    <div className='justify-around'>
                                        <img className='imageUrl' src={item.imageUrl} alt="lol"/>
                                    </div>
                                    <div className='d-flex justify-between'>
                                        <div className='cartContent justify-around'>
                                            <h4>{item.typeOfClothing + ' / ' + item.title}</h4>
                                            <span>Размер: {item.size}</span>
                                            <span className='mt-5'>{item.price}₽</span>
                                            <p>{'Количество: ' + sumItems}</p>
                                            <span>{'Сумма: ' + item.price * sumItems + '₽'}</span>
                                            <div className="clicker d-flex align-start mt-35">
                                                <button  onClick={() => setSumItems(sumItems - 1)} className='buttonMinus mr-20 cu-p'>
                                                    <img className='align-center d-flex' src="/img/minus.png" alt="minus"/>
                                                </button>
                                                <button onClick={() => setSumItems(sumItems + 1)} className='buttonPlus cu-p'>
                                                    <img className='align-center d-flex' src="/img/plus.png" alt="plus"/>
                                                </button>
                                            </div>
                                        </div>

                                        <div className='deleteCart justify-end'>
                                            <button onClick={() => onDeleteCart(item)}>
                                                <img src="/img/close.svg" alt="delete cart"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="basketFooter">
                        <div className="decor d-flex justify-between align-center">
                            <div className="code d-flex justify-between align-center">
                                <input placeholder='Промокод' type="text" className="promocode"/>
                                <button className="enterPromocode cu-p">Применить промокод</button>
                                <button className="order cu-p">Оформить заказ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Basket;
