import { Action } from 'history';
import React, { useState, useEffect, useMemo, useRef, useReducer } from 'react';
import DigitButton from '../DigitButton';
import OperationButton from '../OperationButton';
import "../styles.css"

export const ACTIONS = {
    ADD_DIGIT: "add-digit",
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'
}

// function reducer(state, action)
function reducer(state, {type, payload}) {
    switch(type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) return {
                ...state, 
                currentOperand: payload.digit,
                overwrite: false,
            }
            if (payload.digit === "0" && state.currentOperand === "0") return state
            if (payload.digit === "." && state.currentOperand.includes(".")) return state
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`,
            }
        case ACTIONS.CLEAR:
            return {}
        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand == null && state.previousOperand == null ) return state
            if (state.previousOperand == null) return {
                ...state,
                operation: payload.operation,
                previousOperand: state.currentOperand,
                currentOperand: null,
            }
            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                }
            }
            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null
            }
        case ACTIONS.EVALUATE:
            if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
                return state
            }
            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state),
                resultsOperand: true
            }
        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite && state.resultsOperand == false) return {
                ...state,
                overwrite: false,
                currentOperand:null
            }
            if (state.currentOperand == null && state.resultsOperand == false) return state
            if (state.currentOperand.length === 1 && state.resultsOperand == false) return {...state, currentOperand: null}
            

            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }

    }
}


function evaluate({ currentOperand, previousOperand, operation}) {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return ""
    let computation = ""
    switch(operation) {
        case "+":
            computation = prev + current
            break
        case "-":
            computation = prev - current
            break
        case "*":
            computation = prev * current
            break
        case "÷":
            computation = prev / current
            break

    }

    return computation.toString()

}

// formatting numbers
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
})
function formatOperand(operand) {
    if (operand == null) return
    const [integer, decimal] = operand.split('.')
    if (decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

// main function
export default function Calculator() {
    // const [state, dispatch] = useReducer(reducer, {})
    const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(
        reducer, 
        {}
    )

    // dispatch({type:ACTIONS.ADD_DIGIT, payload: {digit: 1}})

    return (
        <>
            <h1>Welcome to Calculator!</h1>
            <div className="calculator-grid">
                <div className="output">
                    <div className="previous-operand">
                        {formatOperand(previousOperand)} {operation}
                    </div>
                    <div className="current-operand">{formatOperand(currentOperand)}</div>
                </div>
    
                <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>Azummiiiiiii</button>
                <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
                <OperationButton dispatch={dispatch} operation="÷" />

                <DigitButton dispatch={dispatch} digit="1" />
                <DigitButton dispatch={dispatch} digit="2" />
                <DigitButton dispatch={dispatch} digit="3" />
                <OperationButton dispatch={dispatch} operation="*" />

                <DigitButton dispatch={dispatch} digit="4" />
                <DigitButton dispatch={dispatch} digit="5" />
                <DigitButton dispatch={dispatch} digit="6" />
                <OperationButton dispatch={dispatch} operation="+" />

                <DigitButton dispatch={dispatch} digit="7" />
                <DigitButton dispatch={dispatch} digit="8" />
                <DigitButton dispatch={dispatch} digit="9" />
                <OperationButton dispatch={dispatch} operation="-" />

                <DigitButton dispatch={dispatch} digit="." />
                <DigitButton dispatch={dispatch} digit="0" />
                <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
            </div>
        </>
    )
}