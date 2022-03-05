import React, { useState } from 'react'
import { connect } from 'react-redux'

function Ball(props) {

    const [qty, setQty] = useState(1);
    // console.log(props.ballz)
    console.log('ball rendered');

    return (
        <div>
            <h1>Balls: {props.ballz}</h1>
            <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
            <button onClick={() => props.buyBall(qty)}>Buy ball</button>
            <button onClick={props.sellBall}>Sell ball</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        ballz: state.ball.balls
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        buyBall: (qty) => dispatch({
            type: 'BUY_BALL',
            payload: qty
        }),
        sellBall: () => dispatch({
            type: 'SELL_BALL'
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ball)