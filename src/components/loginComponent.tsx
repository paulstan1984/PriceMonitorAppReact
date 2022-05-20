import React, { useState, useEffect, useContext } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonFooter, IonText } from '@ionic/react';
import './loginComponent.css';
import { AppConfigs } from '../config';
import axios from 'axios';
import PrifileContext from '../profilecontext';

export const LoginComponent: React.FC = () => {

    const [loginRequest, setLoginRequest] = useState({ Username: '', Password: '' });
    const [errors, setErrors] = useState({ Username: '', Password: '' });
    const [submitted, setSubmitted] = useState(false);
    const { profile, updateProfile } = useContext(PrifileContext);
    const year = new Date().getFullYear();

    //when errors or submitted flag are updated try to submit the request to the api
    useEffect(() => {
        if (submitted && !errors.Username && !errors.Password) {

            //call api
            axios.post(AppConfigs.ApiURL + AppConfigs.LoginRoute, loginRequest)
                .then(response => {
                    updateProfile(response.data);
                })
                .catch(err => {
                    setSubmitted(false);
                    setErrors(err.response.data);
                });
        }
    }, [errors]);

    const handleLogin = (e: any) => {
        e.preventDefault();

        //validate the form
        const errors = { Username: '', Password: '' };
        if (!loginRequest.Username) {
            errors.Username = 'Username is required!';
        }

        if (!loginRequest.Password) {
            errors.Password = 'Password is required!';
        }

        setErrors(errors);
        setSubmitted(true);
    }

    const updateRequest = (name: string, value: string) => {
        //update the request
        setLoginRequest({ ...loginRequest, [name]: value })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login to Price Monitor App</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="container">
                    <form onSubmit={handleLogin}>
                        <IonList>
                            <IonItem>
                                <IonLabel color="danger" position="stacked">{errors.Username}</IonLabel>
                                <IonInput value={loginRequest.Username} placeholder="Username" name="username" onIonChange={e => updateRequest('Username', e.detail.value!)}></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel color="danger" position="stacked">{errors.Password}</IonLabel>
                                <IonInput type="password" value={loginRequest.Password} placeholder="Password" name="password" onIonChange={e => updateRequest('Password', e.detail.value!)}></IonInput>
                            </IonItem>

                            <IonButton color="primary" type="submit">Login</IonButton>
                        </IonList>
                    </form>
                </div>
            </IonContent>
            <IonFooter>
                <IonLabel className="footer">&copy; Paul Stan 2021-{year}</IonLabel>
            </IonFooter>
        </IonPage>
    );
};