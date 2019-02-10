import React, { Component } from 'react';
import Modal from 'react-modal';
import { withCookies } from 'react-cookie';
import moment from 'moment';
import firebase from '../../../firebaseConfig';
import './notification.css';
Modal.setAppElement('body')

class NotificationPopup extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.closeModal = this.closeModal.bind(this);
        this.sendToken = this.sendToken.bind(this);
        this.signUpForPushNotifications = this.signUpForPushNotifications.bind(this);
    }

    closeModal() {
        this.setState({modalIsOpen: false});
        const { cookies } = this.props;
        cookies.set('updatesNotificationAsked', true, { path: '/', expires: moment().add(30, 'days').toDate() });
    }

    sendToken(token, sendNotification) {
        fetch('/subscribe', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                token,
                sendNotification
            })
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
        })
    }

    async signUpForPushNotifications() {
        this.setState({modalIsOpen: false});
        try {
            const messaging = firebase.app().messaging();
            await messaging.requestPermission();
            const token = await messaging.getToken();
            console.log('Got token', token);
            this.sendToken(token, true);
        } catch (error) {
            console.error(error);
        }
    }

    componentDidMount(){
        setTimeout(() => {
            const messaging = firebase.app().messaging();
            messaging.getToken().then((currentToken) => {
                if (currentToken) {
                    this.sendToken(currentToken, false);
                } else {
                    const { cookies } = this.props;
                    if (!cookies.get('updatesNotificationAsked')) {
                        this.setState({modalIsOpen: true})
                    }
                }
            }).catch(function(err) {
                console.log('An error occurred while retrieving token. ', err);
            });
        }, 40000)
    }


    render() {
        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : 'calc( -50% + 30px)',
                marginLeft            : '0px',
                transform             : 'translate(-50%, -50%)'
            }
        };

        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >

                    <div>
                        നിങ്ങൾ ഇൻഫോക്ളിനിക്ക് വായന ആസ്വദിക്കുന്നുവെന്ന് തോന്നുന്നു. ഒരു പുതിയ ലേഖനം പ്രസിദ്ധീകരിക്കുമ്പോൾ നിങ്ങൾക്ക് അറിയിപ്പ് ലഭിക്കാൻ താൽപ്പര്യമുണ്ടോ?
                    </div>
                    <button
                        onClick={this.closeModal}
                        className='btn notif-button close'
                    >
                        ഇല്ല, എനിക്ക് ആരോഗ്യസംബന്ധിയായ അപ്ഡേറ്റുകൾ ആവശ്യമില്ല
                    </button>
                    <button
                        className='btn notif-button'
                        onClick={this.signUpForPushNotifications}
                    >
                        തീർച്ചയായും. എന്നെ ഉൾപ്പെടുത്തുക!
                    </button>
                </Modal>
            </div>
        );
    };
}

export default withCookies(NotificationPopup);