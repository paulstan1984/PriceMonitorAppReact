import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonSearchbar, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { appDatabase } from '../services/database';
import './TabProducts.css';
import { useLiveQuery } from "dexie-react-hooks";
import { addCircleOutline, carOutline, cartOutline, createOutline, exitOutline, trashOutline } from 'ionicons/icons';
import { Product } from '../services/models/Product';
import { Price } from '../services/models/Price';

const TabProducts: React.FC = () => {

  const [searchText, setSearchText] = useState('');
  const [showAddProd, setShowAddProd] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [showEditModal, setshowEditModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [cProduct, setCProduct] = useState({} as Product);
  let pTimeout: NodeJS.Timeout;

  //products
  const products = useLiveQuery(
    async () => {

      if (pTimeout) {
        clearTimeout(pTimeout);
      }
      pTimeout = setTimeout(() => { setMsg(''); setError(''); }, 2000);

      return appDatabase
        .products
        .where('name')
        .startsWithIgnoreCase(searchText)
        .toArray();
    },
    [searchText]
  );

  //where there is no product show the add product button
  useEffect(() => {
    setShowAddProd(products?.length == 0);
  }, [products]);

  //add button handler
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

  //open the edit product modal
  async function editProduct(p: Product) {

    document.querySelector("ion-item-sliding")?.closeOpened();
    setCProduct(p);
    setshowEditModal(true);
  }

  async function buyProduct(p: Product, store: boolean = false) {

    document.querySelector("ion-item-sliding")?.closeOpened();
    if (!store) {
      setCProduct(p);
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

        await appDatabase.products.update(cProduct.id, p);

        setMsg(`Product ${cProduct.name} successfully buyed.`);
        setSearchText('');

      } catch (error) {
        setError(`Failed to buy ${cProduct.name}: ${error}`);
      }
      setShowBuyModal(false);
    }
  }

  //edit product handler
  async function saveProduct(p: Product) {
    try {
      await appDatabase.products.update(p.id, p);

      setMsg(`Product ${searchText} successfully updated.`);
      setSearchText('');
      setshowEditModal(false);
    } catch (error) {
      setError(`Failed update the product: ${error}`);
    }
  }

  //delete product handler
  async function deleteProduct(p: Product) {
    document.querySelector("ion-item-sliding")?.closeOpened();
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

  async function syncProducts() {
    window.alert('Sync products to the server.');
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
        {msg ? <p color="primary" className="msg">{msg}</p> : ''}
        {error ? <p color="danger" className="msg">{error}</p> : ''}

        <IonModal isOpen={showEditModal} swipeToClose={true} canDismiss={true}>
          <IonContent>
            <div className="modal-container">
              <h1>Edit Product</h1>
              <IonInput className="price-input" value={cProduct.name} placeholder="Product Name" onIonChange={e => cProduct.name = e.detail.value!} />
            </div>
          </IonContent>
          <IonButton size="large" color="secondary" onClick={() => saveProduct(cProduct)}><IonIcon icon={createOutline} /> Save</IonButton>
          <IonButton size="large" onClick={() => setshowEditModal(false)}><IonIcon icon={exitOutline} /> Close</IonButton>
        </IonModal>

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
          <IonButton size="large" color="secondary" onClick={() => buyProduct(cProduct, true)}><IonIcon icon={cartOutline} /> Buy</IonButton>
          <IonButton size="large" onClick={() => setShowBuyModal(false)}><IonIcon icon={exitOutline} /> Close</IonButton>
        </IonModal>

        <IonList>
          {products?.map((p: any) => {
            return <IonItemSliding key={p.id}>
              <IonItemOptions side="start">
                <IonItemOption onClick={() => editProduct(p)}> <IonIcon size="large" icon={createOutline}></IonIcon></IonItemOption>
                <IonItemOption color="danger" onClick={() => deleteProduct(p)}> <IonIcon size="large" icon={trashOutline}></IonIcon></IonItemOption>
              </IonItemOptions>

              <IonItem key={p.id} onClick={() => buyProduct(p, false)}>
                <IonLabel>{p.name}</IonLabel>

                <IonButton size="large" color="primary" onClick={() => buyProduct(p, false)} fill="clear">
                  <IonIcon icon={cartOutline}></IonIcon>
                </IonButton>
              </IonItem>
            </IonItemSliding>
          })}
        </IonList>
      </IonContent>
    </IonPage>
  )
};

export default TabProducts;
