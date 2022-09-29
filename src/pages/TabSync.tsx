import { IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { cloudDownloadOutline, folderOpenOutline } from 'ionicons/icons';

const TabSync: React.FC = () => {

  async function ExportData() {

  }

  async function ImportData() {
    
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Import / export data</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <div className="modal-container">

          <IonButton size="large" color="primary" onClick={() => ExportData()}><IonIcon icon={cloudDownloadOutline} /><IonLabel className="button-label"> Export as csv</IonLabel></IonButton>
          <IonButton size="large" color="primary" onClick={() => ImportData()}><IonIcon icon={folderOpenOutline} /><IonLabel className="button-label"> Import frum csv</IonLabel></IonButton>

        </div>


      </IonContent>
    </IonPage>
  );
};

export default TabSync;
