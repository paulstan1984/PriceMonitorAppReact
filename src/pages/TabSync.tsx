import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const TabSync: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Import / export data</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <div className="container">
          <p>Export as csv</p>
          <p>Import from csv</p>
        </div>


      </IonContent>
    </IonPage>
  );
};

export default TabSync;
