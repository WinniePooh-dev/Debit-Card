import React, { Component, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import LayOut from "../hoc/layout";
import Notification from "../notification";

import "./styles.scss";

class SecondLink extends Component {
    render() {
        return (
            <div className={'second-link'}>
                <Form {...this.props.form}/>
            </div>
        )
    }
}

const Form = ({ accountNumber, paymentAmount, paymentInfo, card }) => {

    const [cardNumber, setCardNumber] = useState([]);
    const [code, setCode] = useState('');
    const [cardOwner, setCardOwner] = useState('');

    const [month, setMonth] = useState('01');
    const [year, setYear] = useState('2000');

    const [show, setShow] = useState(false);

    const [payment, setPayment] = useState({});

    const getCardNumber = (value, index) => {
        if (value.length === 4) {
            setCardNumber(array => [...array, { value, id: index }].sort((a,b) => a.id - b.id))
        }
    }
    
    const handleSubmit = event => {
        event.preventDefault();
        const number = cardNumber.map(({value}) => value).join('');
        const date = `${month}/${year}`;
        if(number.length === 16 && code.length === 3 && cardOwner.length >= 4) {
            setPayment({
                number,
                date,
                cardOwner,
                code
            })
            setShow(true);
        }
    }

    useEffect(() => {
        let timer;
        if(show) {
            timer = setTimeout(() => {
                setShow(false)
            }, 3000)
        }
        return () => clearTimeout(timer);
    }, [show])

    useEffect(() => {
        console.log(payment)
    }, [payment])

    return (
        <form onSubmit={handleSubmit}>
            <p>{`${paymentInfo}:`}</p>
            <div>
                <span>
                    {`${accountNumber.title}:`}<span>{accountNumber.value}</span>
                </span>
                <br/>
                <span>
                    {`${paymentAmount.title}:`}<span>{paymentAmount.value} &#8381;</span>
                </span>
            </div>
            <h2>{card.title}</h2>
            <div>
                <div>
                    <div className={'card-number'}>
                        <label htmlFor={'card-number'}>Номер карты</label>
                        {[...Array(4)].map((_, idx) => <RenderCardNumber key={idx} idx={idx} getCardNumber={getCardNumber}/>)}
                    </div>
                    <div className={'validity'}>
                        <label htmlFor={'validity'}>Срок действия</label>
                        <select name={'validity'} value={month} onChange={e => setMonth(e.target.value)}>
                            {Array.from({ length: 12 }).map((_, month) => {
                                month++
                                month = month < 10 ? `0${month}` : month
                                return <option key={month} value={String(month)}>{month}</option>
                            })}
                        </select>
                        <select name={'validity'} value={year} onChange={e => setYear(e.target.value)}>
                            {renderYears().map((year, key) => {
                                return <option key={key} value={String(year)}>{year}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <input required
                               className={cardOwner.length < 4 ? 'error' : ''}
                               value={cardOwner}
                               onChange={e => setCardOwner(e.target.value.replace(/[^A-Za-z]/ig, ''))}
                               placeholder={'Держатель карты'}/>
                    </div>
                </div>
                <div>
                    <div/>
                    <div>
                        <label htmlFor={'code'}>Код CVV2/CVC2</label>
                        <input required
                               maxLength={3}
                               name={'code'}
                               value={code}
                               className={code.length < 3 ? 'error' : ''}
                               onChange={e => setCode(e.target.value.replace(/\D/g, ''))}/>
                    </div>
                </div>
            </div>
            <button type={"submit"}>Оплатить</button>
            <Notification show={show}/>
        </form>
    )
}

class RenderCardNumber extends Component {
    
    state = {
        value: ''
    }

    handleChange = event => {
        this.setState({
            value: event.target.value.replace(/\D/g, '')
        });
    }

    componentDidUpdate(prevProps, PrevState) {
        if(this.state.value !== PrevState.value) {
            this.props.getCardNumber(this.state.value, this.props.idx)
        }
    }

    render() {
        return <input maxLength={4}
                      required
                      value={this.state.value}
                      className={this.state.value.length < 4 ? 'error' : ''}
                      onChange={this.handleChange}
                      name={'card-number'}/>
    }
}

const renderYears = () => {
    const years = [];
    for(let i = 1990; i <= 2020; i++) {
        years.push(i)
    }
    return years
}

export default compose(withRouter)(LayOut(SecondLink));