import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { Route, Redirect } from "react-router";
import TabPrices from "../pages/TabPrices";
import TabProducts from "../pages/TabProducts";
import TabStatistics from "../pages/TabStatistics";
import { statsChartOutline, pricetagsOutline, addCircleOutline, documentTextOutline } from 'ionicons/icons';
import TabSync from "../pages/TabSync";

const MainTabs: React.FC = () => {

    const onTabsDidChange = (e: CustomEvent) => {
        // console.log(e.detail.tab)
    }

    return (
        <IonTabs onIonTabsDidChange={onTabsDidChange}>
            <IonRouterOutlet>
                <Route exact path="/products">
                    <TabProducts />
                </Route>
                <Route exact path="/statistics">
                    <TabStatistics />
                </Route>
                <Route exact path="/prices">
                    <TabPrices />
                </Route>
                <Route exact path="/sync">
                    <TabSync />
                </Route>
                <Route>
                    <Redirect to="/products" />
                </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="products" href="/products">
                    <IonIcon icon={addCircleOutline} />
                    <IonLabel>Products</IonLabel>
                </IonTabButton>
                <IonTabButton tab="statistics" href="/statistics">
                    <IonIcon icon={statsChartOutline} />
                    <IonLabel>Statistuics</IonLabel>
                </IonTabButton>
                <IonTabButton tab="prices" href="/prices">
                    <IonIcon icon={pricetagsOutline} />
                    <IonLabel>Prices</IonLabel>
                </IonTabButton>
                <IonTabButton tab="sync" href="/sync">
                    <IonIcon icon={documentTextOutline} />
                    <IonLabel>Sync</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default MainTabs;