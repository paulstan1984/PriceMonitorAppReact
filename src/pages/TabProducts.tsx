import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AppConfigs } from '../config';
import ProfileContext from '../profilecontext';
import './TabProducts.css';

const TabProducts: React.FC = () => {

  const { profile, updateProfile } = useContext(ProfileContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erros, setErrors] = useState({});

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': profile.token
  }

  // how to call a function every time I enter in a tab
  // display the returned products 
  // buy button clic
  // statistics tab
  // remove prices tab
  useEffect(() => {
    setLoading(true);
    axios.post(AppConfigs.ApiURL + AppConfigs.ProductsRoute, {
      page: "1",
      order_by: "id",
      order_by_dir: "DESC"
    }, {
      headers: headers
    })
      .then(response => {
        console.log(response.data.results);
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

          <strong>Products</strong>
        </div>
      </IonContent>
    </IonPage>
  )
};

export default TabProducts;
