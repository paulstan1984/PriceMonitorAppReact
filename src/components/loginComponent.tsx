import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonFooter, IonText } from '@ionic/react';
import './loginComponent.css';

export const LoginComponent: React.FC = () => {

    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    const year = new Date().getFullYear();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login to Price Monitor App</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="container">
                    <IonList>
                        <IonItem>
                            <IonInput value={username} placeholder="Username" onIonChange={e => setUsername(e.detail.value!)}></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonInput type="password" value={password} placeholder="Password" onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                        </IonItem>

                        <IonButton color="primary">Login</IonButton>
                    </IonList>
                </div>
            </IonContent>
            <IonFooter>
                <IonLabel className="footer">&copy; Paul Stan 2021-{year}</IonLabel>
            </IonFooter>
        </IonPage>
    );
};