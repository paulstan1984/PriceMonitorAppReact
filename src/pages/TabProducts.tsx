import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonSearchbar, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
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
  const [showEditModal, setshowEditModal] = useState(false);
  const [cProduct, setCProduct] = useState({} as Product);

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

  async function editProduct(p: Product) {

    setCProduct(p);
    setshowEditModal(true);
  }

  async function deleteProduct(p: Product) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await appDatabase.products.delete(p.id);

        setMsg(`Product successfully deleted.`);
        setSearchText('');

      } catch (error) {
        setError(`Failed to delete the product: ${error}`);
      }
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

        {!loading ?
          <div>
            <p color="primary">{msg}</p>
            <p color="danger">{error}</p>

            <IonModal isOpen={showEditModal} swipeToClose={true} canDismiss={true}>
              <IonContent>{cProduct.name}</IonContent>
              <IonButton onClick={()=>setshowEditModal(false)}>Close</IonButton>
            </IonModal>

            <IonList>
              {products?.map((p: any) => {
                return <IonItemSliding>
                  <IonItemOptions side="start">
                    <IonItemOption onClick={() => editProduct(p)}>Edit</IonItemOption>
                    <IonItemOption color="danger" onClick={() => deleteProduct(p)}>Delete</IonItemOption>
                  </IonItemOptions>

                  <IonItem key={p.id}>
                    <IonLabel>{p.name}</IonLabel>
                  </IonItem>
                </IonItemSliding>
              })}
            </IonList>
          </div>
          : ''}
      </IonContent>
    </IonPage>
  )
};

export default TabProducts;
