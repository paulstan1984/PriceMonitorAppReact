import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './TabStatistics.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


export const dailyOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    title: {
      display: true,
      text: 'Daily expenses',
    },
  },
};

export const monthlyOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    title: {
      display: true,
      text: 'Monthly expenses',
    },
  },
};

export const detailOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    title: {
      display: true,
      text: 'Detailed expenses',
    },
  },
};

const days = ['2022-08-01', '2022-08-02', '2022-08-03', '2022-08-04', '2022-08-05'];
const months = ['2022-08', '2022-07', '2022-06', '2022-05', '2022-04'];

export const dailyData = {
  labels: days,
  datasets: [
    {
      label: '',
      data: [10, 20, 60, 20, 100],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

export const monthlyData = {
  labels: months,
  datasets: [
    {
      label: '',
      data: [10, 20, 60, 20, 100],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

export const detailedData = {
  labels: ['Paine', 'Intretinere', 'Gaz', 'Electrica', 'Sport', 'Carti'],
  datasets: [
    {
      label: 'Price',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const TabStatistics: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Statistics</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Statistics</IonTitle>
          </IonToolbar>
        </IonHeader>

        <Bar options={dailyOptions} data={dailyData} />
        <Bar options={monthlyOptions} data={monthlyData} />
        <Doughnut options={detailOptions} data={detailedData} />
      </IonContent>
    </IonPage>
  );
};

export default TabStatistics;
