import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FileSaver from 'file-saver';
import { cloudDownloadOutline, folderOpenOutline } from 'ionicons/icons';
import { appDatabase } from '../services/database';
import { Helpers } from '../services/helpers';

const TabSync: React.FC = () => {

  async function ExportData(entity: string) {

    var entities: any[] = [];
    
    switch(entity){
      case 'products':
        entities = await appDatabase.products.toArray();
        break;
      
      case 'prices':
        entities = await appDatabase.prices.toArray();
        break;
    }
   
    var csvContent = Helpers.ConvertToCSV(entities);

    var file = new File([csvContent], entity + ".csv", { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(file);
  }

  async function ImportData() {

  }

  function onFileChange(e: any){
    console.log(e);
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

          <IonButton size="large" color="primary" onClick={() => ExportData('products')}><IonIcon icon={cloudDownloadOutline} /><IonLabel className="button-label"> Export producs as csv</IonLabel></IonButton>
          <IonButton size="large" color="primary" onClick={() => ExportData('prices')}><IonIcon icon={cloudDownloadOutline} /><IonLabel className="button-label"> Export prices as csv</IonLabel></IonButton>

          <IonButton size="large" color="primary" onClick={() => ImportData()}><IonIcon icon={folderOpenOutline} /><IonLabel className="button-label"> Import frum csv</IonLabel></IonButton>

          <IonInput onChange={(ev) =>onFileChange(ev)}/>
        </div>


      </IonContent>
    </IonPage>
  );
};

export default TabSync;
