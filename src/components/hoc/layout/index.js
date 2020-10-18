import React from "react";
import { NavLink } from "react-router-dom";

import "./styles.scss";

export default function LayOut(View) {
    return class extends View {
        render() {
            const { header, footer, menu, label } = this.props;
            return (
                <main>
                    <div className={'layout'}>
                        <div>
                            <div>
                                <p><span>{label.toUpperCase()}</span>RU</p>
                                <div>
                                    {menu && menu.map(({ title, link }, idx) => {
                                        return <NavLink key={idx} to={link} activeClassName={'active'}>{title}</NavLink>
                                    })}
                                </div>
                            </div>
                            <div>
                                <Header title={header.title}
                                        text={header.text}/>
                                {super.render()}
                                <Footer content={footer}/>
                            </div>
                        </div>
                    </div>
                </main>
            )
        }
    }
}

function Header({ title, text }) {
    return (
        <header>
            <h1>{title}</h1>
            <div>{text}</div>
        </header>
    )
}

function Footer({ content }) {
    return <footer>{content}</footer>
}