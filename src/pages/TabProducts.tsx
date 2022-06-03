import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import ProfileContext from '../profilecontext';
import ProductsService from '../services/products';
import './TabProducts.css';

const TabProducts: React.FC = () => {

  const { profile, updateProfile } = useContext(ProfileContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erros, setErrors] = useState({});

  // buy button clic
  // statistics tab
  // prices tab
  useEffect(() => {
    setLoading(true);
    ProductsService.GetProducts(profile.token)
      .then(response => {
        setProducts(response.data.results);
        setLoading(false);
      })
      .catch(err => {
        let apiErrors = err.response.data;
        if (err.code === "ERR_NETWORK") {
          apiErrors = { Username: err.message };
        }

        setErrors(apiErrors);
        setLoading(false);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Products</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          {loading ? <IonSpinner name="circles" /> : ''}
        </div>

        {!loading ?
          <IonList>
            {products.map((p: any) => {
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
