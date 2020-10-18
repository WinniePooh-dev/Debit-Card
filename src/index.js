import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import FirstLink from './components/first-link';
import SecondLink from './components/second-link';
import ThirdLink from './components/third-link';
import Account from './components/account';
import LogOut from './components/log-out';

import "./styles.scss";

const data = ({
    header: {
        title: "Заголовок страницы",
        text: "В отличие от пылевого и ионного хвостов, направление поступает \n в лимногляциальный часовой угол"
    },
    label: "Chulakov",
    menu: [
        {
            title: "Первая ссылка",
            link: "/first-link"
        },
        {
            title: "Вторая ссылка",
            link: "/second-link"
        },
        {
            title: "Третья ссылка",
            link: "/third-link"
        },
        {
            title: "Личный кабинет",
            link: "/account"
        },
        {
            title: "Выйти",
            link: "/log-out"
        }
    ],
    form: {
        paymentInfo: "Информация об оплате",
        accountNumber: {
            title: "Номер счета",
            value: 87123658716587
        },
        paymentAmount: {
            title: "Сумма платежа",
            value: Math.ceil(Math.random() * 1000)
        },
        card: {
            title: "Данные банковской карты",
            number: "Номер карты",
            validity: "Срок действия",
            code: "Код CVV2/CVC3"
        },
    },
    footer: "Исходя из астатической системы координат Булгакова, соединение стабильно. Краевая часть артезианского бассейна,\n" +
             "которая в настоящее время находится ниже уровня моря, ослабляет систематический уход. Лисичка традиционно трансформирует \n" +
             "прецессионный годовой параллакс. \n \n" +
             "Выклинивания абсолютно аккумулирует твердый радиотелескоп Максвелла. \n \n" +
             "Алмаз слагает горст. Делювий длительно колеблет лазерный подвижный объект. \n \n" +
             "Устойчивость, например, параллельна. Аргумент перилегия определяет боксит. Проекция вертикально дает \n" +
             "уходящий диабаз. Если пренебречь малыми величинами, то видно, что угол крена покрывает вибрирующий волчок, что обусловленно \n" +
             "не только первичными неровностями эрозионно-тектонического рельефа поверхности кристаллических пород, но и проявлениями \n" +
             "долее поздней блоковой тектоники. Засветка неба заставляет иначе взглянуть на то, что такое волчок."
});

const App = () => {
    
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Redirect to={"/second-link"}/>
                </Route>
                <Route exact path={"/first-link"}>
                    <FirstLink {...data}/>
                </Route>
                <Route exact path={"/second-link"} render={() => {
                    return <SecondLink {...data}/>
                }}/>
                <Route exact path={"/third-link"}>
                    <ThirdLink {...data}/>
                </Route>
                <Route exact path={"/account"}>
                    <Account {...data}/>
                </Route>
                <Route exact path={"/log-out"} render={() => {
                    return <LogOut {...data}/>
                }}/>
            </Switch>
        </Router>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
