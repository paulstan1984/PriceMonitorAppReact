import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useLiveQuery } from "dexie-react-hooks";
import { appDatabase } from '../services/database';
import { Price } from '../services/models/Price';
import { useState } from 'react';
import { cartOutline, exitOutline, trashOutline } from 'ionicons/icons';
import { Product } from '../services/models/Product';

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

  const [showBuyModal, setShowBuyModal] = useState(false);
  const [cProduct, setCProduct] = useState({} as Product);

  async function buyProduct(pname: string, store: boolean = false) {
   
    document.querySelector("ion-item-sliding")?.closeOpened();
    if (!store) {
      console.log(pname);
      let prod = await appDatabase.products.where('name').equals(pname).first() as Product;
      console.log(prod);
      setCProduct(prod);
      setShowBuyModal(true);
    }
    else {
      try {
        const id = await appDatabase.prices.add({
          product_id: cProduct.id,
          product_name: cProduct.name,
          amount: cProduct.lastPrice,
          created_at: new Date(),
          updated_at: new Date()
        } as Price);

        setMsg(`Product ${cProduct.name} successfully buyed.`);

      } catch (error) {
        setError(`Failed to buy ${cProduct.name}: ${error}`);
      }
      setShowBuyModal(false);
    }
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

        <IonModal isOpen={showBuyModal} swipeToClose={true} canDismiss={true}>
          <IonContent>
            <div className="modal-container">
              <h1>{cProduct.name}</h1>
              <IonInput className="price-input" type="number" value={cProduct.lastPrice} placeholder="Price" onIonChange={e => {
                try {
                  cProduct.lastPrice = parseInt(e.detail.value!)
                }
                catch (err) {
                  cProduct.lastPrice = 0;
                }

              }} />
            </div>
          </IonContent>
          <IonButton size="large" color="secondary" onClick={() => buyProduct(cProduct.name, true)}><IonIcon icon={cartOutline} /> Buy</IonButton>
          <IonButton size="large" onClick={() => setShowBuyModal(false)}><IonIcon icon={exitOutline} /> Close</IonButton>
        </IonModal>
        
        <IonList>
          {prices?.map((p: any) => {
            return <IonItemSliding key={p.id}>
              <IonItemOptions side="start">
                <IonItemOption color="danger" onClick={() => deletePrice(p)}><IonIcon size="large" icon={trashOutline}></IonIcon></IonItemOption>
              </IonItemOptions>

              <IonItem key={p.id} onClick={() => buyProduct(p.product_name, false)} className={'item-content day-' + (p.created_at.getDay() % 2)}>
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
