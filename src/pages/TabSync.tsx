import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FileSaver from 'file-saver';
import { cloudDownloadOutline, folderOpenOutline } from 'ionicons/icons';
import { useState } from 'react';
import { appDatabase } from '../services/database';
import { Helpers } from '../services/helpers';

const TabSync: React.FC = () => {

  const [fileContent, setFileContent] = useState('');

  async function ExportData(entity: string) {

    var entities: any[] = [];

    switch (entity) {
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
    const input = document.getElementById('fileSelector') as HTMLInputElement;
    input?.click();
  }

  function selectImportFile(e: any) {
    console.log(e);

    // getting a hold of the file reference
    var file = e.target.files[0];

    // setting up the reader
    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    // here we tell the reader what to do when it's done reading...
    reader.onload = readerEvent => {
      var content = readerEvent.target?.result; // this is the content!
      setFileContent(content as string);
      console.log(content);
    }
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

          <input id="fileSelector" type="file" className="hidden" onChange={(e) => selectImportFile(e)} />
        </div>


        <div>{fileContent}</div>
      </IonContent>
    </IonPage>
  );
};

export default TabSync;
