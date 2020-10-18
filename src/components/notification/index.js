import React, { Fragment } from 'react';
import Portal from '../hoc/portal';

import './styles.scss';

export default function Notification({ show }) {
    return (
        <Fragment>
            { show &&
                <Portal>
                    <div className={'success-notify'}>Платеж прошёл успешно!</div>
                </Portal> 
            }
        </Fragment>
    )
}