import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FileSaver from 'file-saver';
import { cloudDownloadOutline, folderOpenOutline, moonOutline } from 'ionicons/icons';
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

  async function OnImportFileSelected(e: any) {

    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];

      // setting up the reader
      var reader = new FileReader();

      // here we tell the reader what to do when it's done reading...
      reader.onload = async (readerEvent) => {
        var content = readerEvent.target?.result; // this is the content!
        setFileContent(content as string);

        if (file.name.toLowerCase().indexOf('price') !== -1) {
          await appDatabase.prices.clear();

          (Helpers.LoadFromCsv<Price>(content as string) as Price[])
            .map(p => {
              p.created_at = new Date(p.created_at);
              p.updated_at = new Date(p.updated_at);
              p.amount = parseInt(p.amount as unknown as string, 10);
              return p;
            })
            .forEach(async (p) => {
              let np: any = {};
              Object.assign(np, p);
              delete np.id;

              await appDatabase.prices.add(np);
            });
        }

        if (file.name.toLowerCase().indexOf('products') !== -1) {
          await appDatabase.products.clear();

          (Helpers.LoadFromCsv<Product>(content as string) as Product[])
            .map(p => {
              p.created_at = new Date(p.created_at);
              p.updated_at = new Date(p.updated_at);
              return p;
            })
            .forEach(async (p) => {
              let np: any = {};
              Object.assign(np, p);
              delete np.id;

              await appDatabase.products.add(np);
            });
        }
      }

      try {
        reader.readAsText(file, 'UTF-8');
      }
      catch (err) { }
    }
  }
  //#endregion

  async function ToggleTheme() {
    document.body.classList.toggle('dark');
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
          <IonButton size="large" color="primary" onClick={() => OpenFileSelector()}><IonIcon icon={folderOpenOutline} /><IonLabel className="button-label"> Import from csv</IonLabel></IonButton>

          <input id="fileSelector" type="file" multiple className="hidden" onChange={(e) => OnImportFileSelected(e)} />

        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabSync;
