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
import StatisticsService from '../services/statistics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const displayOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    title: {
      display: true,
      text: ''
    },
  }
}

const basicColors = [
'rgba(255, 99, 132, 0.2)',
'rgba(54, 162, 235, 0.2)',
'rgba(255, 206, 86, 0.2)',
'rgba(75, 192, 192, 0.2)',
'rgba(153, 102, 255, 0.2)',
]

let dailyOptions = JSON.parse(JSON.stringify(displayOptions));
dailyOptions.plugins.title.text = 'Daily expenses';

let monthlyOptions = JSON.parse(JSON.stringify(displayOptions));
monthlyOptions.plugins.title.text = 'Monthly expenses';

let detailOptions = JSON.parse(JSON.stringify(displayOptions));
detailOptions.plugins.title.text = 'Detailed expenses';

const dailyData = {
  labels: [] as string[],
  datasets: [
    {
      label: '',
      data: [] as number[],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};
StatisticsService.GetDailyStats().then(data => {
  data.forEach(e => {
    dailyData.labels.push(e.key);
    dailyData.datasets[0].data.push(e.amount);
  })
});

const monthlyData = {
  labels: [] as string[],
  datasets: [
    {
      label: '',
      data: [] as number[],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};
StatisticsService.GetMonthlyStats().then(data => {
  data.forEach(e => {
    monthlyData.labels.push(e.key);
    monthlyData.datasets[0].data.push(e.amount);
  })
});

const detailedData = {
  labels: [] as string[],
  datasets: [
    {
      label: '',
      data: [] as number[],
      backgroundColor: [] as string[]
    },
  ],
};
StatisticsService.GetDetails('2022-08').then(data => {
  data.forEach((e, i) => {
    detailedData.labels.push(e.key);
    detailedData.datasets[0].data.push(e.amount);
    detailedData.datasets[0].backgroundColor.push(basicColors[i % basicColors.length]);
  })
});

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
