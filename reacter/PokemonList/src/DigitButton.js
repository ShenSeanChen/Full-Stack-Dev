import {ACTIONS} from "./pages/Calculator.js"

export default function DigitButton({dispatch, digit}) {
    return (
        <button 
            onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})}
        >
            {digit}
        </button>
        )
}