import { Route } from 'react-router-dom';
import {
  IonApp,
  setupIonicReact,
  useIonRouter
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { LoginComponent } from './components/loginComponent';
import MainTabs from './components/MainTabs';
import React, { useState } from 'react';
import ProfileContext, { Profile } from './profilecontext';

setupIonicReact();

const TOKEN = 'token';

const App: React.FC = () => {

  //set the default isLoggedIn state to the value from the local storage
  const token = localStorage.getItem(TOKEN);
  const [profile, setProfile] = useState({ token: token != undefined ? token : '' });
  const [isLoggedIn, setIsLoggedIn] = useState(token != undefined);
  const router = useIonRouter();

  const updateProfile = (profile: Profile) => {

    //store the profile in local storage
    localStorage.setItem(TOKEN, profile.token);

    setProfile(profile);
    setIsLoggedIn(profile.token.length > 0);
  }

  const logout = () => {
    localStorage.removeItem(TOKEN);
    setProfile({ token: '' });
    setIsLoggedIn(false);
    router.push('/login');
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, logout }}>
      <IonApp>
        <IonReactRouter>
          <Route path="/login" component={isLoggedIn ? MainTabs : LoginComponent} exact={true} />
          <Route path="/" component={isLoggedIn ? MainTabs : LoginComponent} />
        </IonReactRouter>
      </IonApp>
    </ProfileContext.Provider>
  )
};

export default App;
