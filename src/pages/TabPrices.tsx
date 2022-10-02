import { IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useLiveQuery } from "dexie-react-hooks";
import { appDatabase } from '../services/database';
import { Price } from '../services/models/Price';
import { useState } from 'react';
import { trashOutline } from 'ionicons/icons';

const TabPrices: React.FC = () => {

  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  let pTimeout: NodeJS.Timeout;

  const prices = useLiveQuery(
    async () => {

      if (pTimeout) {
        clearTimeout(pTimeout);
      }
      pTimeout = setTimeout(() => { setMsg(''); setError(''); }, 2000);

      let date = new Date();
      date.setDate(date.getDate() - 50);
      return appDatabase
        .prices
        .orderBy('created_at')
        .reverse()
        .toArray();
    },
    []
  );

  //delete price handler
  async function deletePrice(p: Price) {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await appDatabase.prices.delete(p.id);

        setMsg(`Price successfully deleted.`);
      } catch (error) {
        setError(`Failed to delete the price: ${error}`);
      }
    }
  }

  async function syncPrices() {
    window.alert('Sync prices to the server.');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Prices</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        {msg ? <p color="primary" className="msg">{msg}</p> : ''}
        {error ? <p color="danger" className="msg">{error}</p> : ''}

        <IonList>
          {prices?.map((p: any) => {
            return <IonItemSliding key={p.id}>
              <IonItemOptions side="start">
                <IonItemOption color="danger" onClick={() => deletePrice(p)}><IonIcon size="large" icon={trashOutline}></IonIcon></IonItemOption>
              </IonItemOptions>

              <IonItem key={p.id} className={'item-content day-' + (p.created_at.getDay() % 2)}>
                <IonLabel>
                  {p.product_name}
                  <br />
                  <small>{p.created_at.toLocaleString()}</small>
                </IonLabel>

                <IonLabel slot="end">{p.amount} Lei</IonLabel>
              </IonItem>
            </IonItemSliding>
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TabPrices;
