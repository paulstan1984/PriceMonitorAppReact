import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FileSaver from 'file-saver';
import { cloudDownloadOutline, folderOpenOutline } from 'ionicons/icons';
import { useState } from 'react';
import { appDatabase } from '../services/database';
import { Helpers } from '../services/helpers';
import { Price } from '../services/models/Price';
import { Product } from '../services/models/Product';

const TabSync: React.FC = () => {

  const [fileContent, setFileContent] = useState('');

  //#region Export 
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
  //#endregion

  //#region Import
  async function OpenFileSelector() {
    const fileSelector = document.getElementById('fileSelector') as HTMLInputElement;
    fileSelector?.click();
  }

  function OnImportFileSelected(e: any) {

    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];

      // setting up the reader
      var reader = new FileReader();

      // here we tell the reader what to do when it's done reading...
      reader.onload = readerEvent => {
        var content = readerEvent.target?.result; // this is the content!
        setFileContent(content as string);

        console.log(file.name);
        if(file.name.toLowerCase().indexOf('price') !== -1) {
          let prices = Helpers.LoadFromCsv<Price>(content as string);
          console.log('Prices', prices);
        }
        
        if(file.name.toLowerCase().indexOf('products') !== -1) {
          let products = Helpers.LoadFromCsv<Product>(content as string);
          console.log('Products', products);
        }

        console.log(content);
      }

      try {
        reader.readAsText(file, 'UTF-8');
      }
      catch (err) { }
    }
  }
  //#endregion

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
          <IonButton size="large" color="primary" onClick={() => OpenFileSelector()}><IonIcon icon={folderOpenOutline} /><IonLabel className="button-label"> Import from csv</IonLabel></IonButton>

          <input id="fileSelector" type="file" multiple className="hidden" onChange={(e) => OnImportFileSelected(e)} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabSync;
