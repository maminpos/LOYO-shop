import React from "react";
import "./index.modules.scss"
import PopupAddToCart from "../Popup/PopupToCart";
import {useState} from "react";

function Drawer({onClose, theme, obj, onAddToCart}) {

    const [buttonClicked, setButtonClicked] = useState(null);

    const [showPopup, setShowPopup] = React.useState(false)

    const [newObj, setNewObj] = useState(null);

    const handleButtonClick = (index) => {
        if (index === 1) {
            setNewObj({...obj, size: "S", id2: obj.id + '11111'})
        }
        if (index === 2) {
            setNewObj({...obj, size: "M", id2: obj.id + '22222'})
        }
        if (index === 3) {
            setNewObj({...obj, size: "L", id2: obj.id + '33333'})
        }
        if (index === 4) {
            setNewObj({...obj, size: "XL", id2: obj.id + '44444'})
        }
        if (index === 5) {
            setNewObj({...obj, size: "XXL", id2: obj.id + '55555'})
        }
        setButtonClicked(index)
    }

    const SizeCheck = () => {
        if (buttonClicked === null) {

        } else
        onAddToCart(newObj)
    }

    const onAddToCartPopup = () => {
        setShowPopup(true)
    }

    function Color(item) {
        if (item >= 5) {
            return '#5dc02c'
        }
        if (item > 1 && item < 5) {
            return '#ec7736'
        }
        if (item === 1) {
            return '#c02c2c'
        }
    }



    return(
        <div className={theme ? "dark-theme" : "light-theme"}>


        <div className='overlay'>
            <div className="backOverlay" onClick={onClose}></div>
            <div className="drawer">

                <div className="drawerHeader d-flex justify-end">
                    <img className='cu-p' onClick={onClose} src='/img/close.svg' alt=""/>
                </div>

                <div className="drawerContent d-flex">
                    <div className="slider justify-around">
                        <img src={obj.imageUrl} alt="картинка"/>
                    </div>

                    <div className="Content justify-center">
                        <h4 className='mb-5'>{obj.typeOfClothing + ' / ' + obj.title}</h4>
                        <span className='mb-20'>{obj.price} ₽</span>
                        <p style={{color: Color(obj.availability)}} className='Availability'>{obj.availability} в наличии</p>

                        <div className="size">
                            <button style={
                                {backgroundColor: buttonClicked === 1 ? '#252525' : '#f5f5f5',
                                    color: buttonClicked === 1 ?'white' : 'black'}
                            } onClick={() => handleButtonClick(1)} className='ml-10'>S</button>
                            <button style={
                                {backgroundColor: buttonClicked === 2 ? '#252525' : '#f5f5f5',
                                    color: buttonClicked === 2 ?'white' : 'black'}
                            } onClick={() => handleButtonClick(2)} className='ml-10'>M</button>
                            <button style={
                                {backgroundColor: buttonClicked === 3 ? '#252525' : '#f5f5f5',
                                    color: buttonClicked === 3 ?'white' : 'black'}
                            } onClick={() => handleButtonClick(3)} className='ml-10'>L</button>
                            <button style={
                                {backgroundColor: buttonClicked === 4 ? '#252525' : '#f5f5f5',
                                    color: buttonClicked === 4 ?'white' : 'black'}
                            } onClick={() => handleButtonClick(4)} className='ml-10'>XL</button>
                            <button style={
                                {backgroundColor: buttonClicked === 5 ? '#252525' : '#f5f5f5',
                                    color: buttonClicked === 5 ?'white' : 'black'}
                            } onClick={() => handleButtonClick(5)} className='ml-10'>XXL</button>
                        </div>

                        <div className="description">
                            <h4>Описание: </h4>
                            <span>Легкая унисекс футболка из качественного тонкого хлопка
                                с добавлением лайкры, который обеспечивает идеальную и
                                удобную посадку не только во время повседневных занятий, но и
                                во время занятий спортом и любого рода активности. <br/>
                                Срок производства от 10 дней!</span>
                        </div>

                        <div onClick={SizeCheck} className="buttonAddBasket mt-50">
                            <button style={buttonClicked ? {} : {backgroundColor: '#a2a2a2'}} onClick={onAddToCartPopup}>Добавить в корзину</button>
                        </div>
                        <div className='opacity-0' style={!buttonClicked ? {display: 'none'} : {opacity: '0.4'}}>
                            {showPopup && <PopupAddToCart/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
    )
}

export default Drawer