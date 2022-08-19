import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useContext } from 'react';
import ProfileContext from '../profilecontext';
import './TabPrices.css';

const TabLogout: React.FC = () => {

    const { logout } = useContext(ProfileContext);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Logout</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Logout</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="exit-msg">
                    <div className="exit-msg-text">
                        <strong>Are you sure to quit?</strong>
                    </div>
                    <IonButton color="primary" type="submit" onClick={logout}>Yes</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default TabLogout;
