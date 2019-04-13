import React from 'react';

import './counter.scss';

const Counter = ({ value, onIncrement, onDecrement }) => (
    <div id="counter-app">
        <div id="display-container" className="container">
            <p id="display">{value}</p>
        </div>
        <div id="buttons-container" className="container">
            <button id="increment-button" className="button" onClick={onIncrement}>
                <i className="fa fa-plus" />
            </button>
            <button id="decrement-button" className="button" onClick={onDecrement}>
                <i className="fa fa-minus" />
            </button>
        </div>
    </div>
);

export default Counter;
