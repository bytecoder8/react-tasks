import React, { Fragment } from 'react'
import styles from './Modal.module.css'

export default class Modal extends React.Component {
    state = {
        isOpen: this.props.isOpen ? true : false,
    }

    openWindow = () => {
        this.setState({
            isOpen: true
        })
    }

    closeWindow = (event) => {
        this.setState({
            isOpen: false
        })
    }

    render() {
        return(
            <Fragment>
                <button className={styles.button} onClick={this.openWindow}>Open window</button>
                {this.state.isOpen && (
                    <div className={styles.modal} onClick={this.closeWindow}>
                        <div className={styles.body} onClick={(event) => event.stopPropagation()}>
                            {this.props.children}
                            <button className={styles['button-close']} onClick={this.closeWindow}>&times;</button>
                        </div>    
                    </div>
                )}
            </Fragment>
        )
    }
}
