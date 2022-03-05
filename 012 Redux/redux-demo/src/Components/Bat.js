import React, { useState } from 'react'
import { connect } from 'react-redux'

function Bat(props) {

    // const [bat, setBat] = useState(20);
    // console.log(props.batz)
    console.log('bat rendered');

    return (
        <div>
            <h1>Bats: {props.batz}</h1>
            <button onClick={props.buyBat}>Buy bat</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        batz: state.bat.bats
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        buyBat: () => dispatch({
            type: 'BUY_BAT'
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bat)