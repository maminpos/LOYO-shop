import React from "react";

function Card(props) {
    return(
        <div className="card mb-20">
            <img className='cu-p' onClick={() => {props.onClickLink(); props.onClickImage();}}
                 src={props.imageUrl} alt=""/><br/>
            <button style={{backgroundColor: props.colorBtn}} className='mb-5'>
                <a className='buttonTitleCard' href="src/components/Card/Card#Naruto">{props.tag}</a>
            </button>
            <h4 className='mt-5 mb-5'>{props.typeClothing + ' / ' + props.title}</h4>
            <span className='mt-5 mb-5'>{props.price} ₽</span>
        </div>
    )
}

export default Card