import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import ProfileContext from '../profilecontext';
import { appDatabase } from '../services/database';
import './TabProducts.css';
import { useLiveQuery } from "dexie-react-hooks";
import { addCircleOutline } from 'ionicons/icons';
import { Product } from '../services/models/Product';

const TabProducts: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showAddProd, setShowAddProd] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const products = useLiveQuery(
    async () => {
      return appDatabase
        .products
        .where('name')
        .startsWithIgnoreCase(searchText)
        .toArray();
    },
    [searchText]
  );

  useEffect(() => {
    setShowAddProd(products?.length == 0);
  }, [products]);

  async function addProduct() {
    try {
      const id = await appDatabase.products.add({
        name: searchText,
        lastPrice: 0,
        avgPrice: 0,
        created_at: new Date(),
        updated_at: new Date()
      } as Product);

      setMsg(`Product ${searchText} successfully added. Got id ${id}`);
      setSearchText('');

    } catch (error) {
      setError(`Failed to add ${searchText}: ${error}`);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
          <IonButtons slot="end">
            {showAddProd ? <IonButton color="primary" onClick={addProduct}>
              <IonIcon icon={addCircleOutline} />
            </IonButton> : ''}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container">
          {loading ? <IonSpinner name="circles" /> : ''}
        </div>

        <p color="primary">{msg}</p>
        <p color="danger">{error}</p>

        {!loading ?
          <IonList>
            {products?.map((p: any) => {
              return <IonItem key={p.id}>
                <IonLabel>{p.name}</IonLabel>
              </IonItem>
            })}
          </IonList>
          : ''}
      </IonContent>
    </IonPage>
  )
};

export default TabProducts;
