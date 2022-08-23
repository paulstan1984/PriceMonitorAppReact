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
  Chart,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import StatisticsService from '../services/statistics';
import { useEffect, useRef, useState } from 'react';

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

const TabStatistics: React.FC = () => {

  let dailyChart = useRef(null);
  let monthlyChart = useRef(null);
  let detailsChart = useRef(null);

  const dailyOptions = { ...displayOptions, ... { plugins: { title: { text: 'Daily expenses' } } } }
  const monthlyOptions = { ...displayOptions, ... { plugins: { title: { text: 'Monthly expenses' } } } };
  const detailOptions = { ...displayOptions, ... { plugins: { title: { text: 'Detailed expenses' } } } };

  const [dailyData, setDailyData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: '',
        data: [] as number[],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  });

  const [monthlyData, setMonthlyData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: '',
        data: [] as number[],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  });

  const [detailedData, setDetailedData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: '',
        data: [] as number[],
        backgroundColor: [] as string[]
      },
    ],
  });

  useEffect(() => {

    StatisticsService.GetDailyStats().then(data => {
      dailyData.labels = [] as string[];
      dailyData.datasets[0].data = [] as number[];

      data.forEach(e => {
        dailyData.labels.push(e.key);
        dailyData.datasets[0].data.push(e.amount);
      });

      setDailyData(dailyData);
      let chart = (dailyChart?.current as unknown as Chart);
      if (chart !== null) {
        chart.data.labels = dailyData.labels;
        chart.data.datasets = dailyData.datasets;
        chart.update();
      }
    });

    StatisticsService.GetMonthlyStats().then(data => {
      monthlyData.labels = [] as string[];
      monthlyData.datasets[0].data = [] as number[];

      data.forEach(e => {
        monthlyData.labels.push(e.key);
        monthlyData.datasets[0].data.push(e.amount);
      })

      setMonthlyData(monthlyData);
      let chart = (monthlyChart?.current as unknown as Chart);
      if (chart !== null) {
        chart.data.labels = monthlyData.labels;
        chart.data.datasets = monthlyData.datasets;
        chart.update();
      }
    });

    StatisticsService.GetDetails('2022-08').then(data => {
      detailedData.labels = [] as string[];
      detailedData.datasets[0].data = [] as number[];
      detailedData.datasets[0].backgroundColor = [] as string[];

      data.forEach((e, i) => {
        detailedData.labels.push(e.key);
        detailedData.datasets[0].data.push(e.amount);
        detailedData.datasets[0].backgroundColor.push(basicColors[i % basicColors.length]);
      })

      setDetailedData(detailedData);
      let chart = (detailsChart?.current as unknown as Chart);
      if (chart !== null) {
        chart.data.labels = detailedData.labels;
        chart.data.datasets = detailedData.datasets;
        chart.update();
      }
    });
  })

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

        <Bar ref={dailyChart} options={dailyOptions} data={dailyData} />
        <Bar ref={monthlyChart} options={monthlyOptions} data={monthlyData} />
        <Doughnut ref={detailsChart} options={detailOptions} data={detailedData} />
      </IonContent>
    </IonPage>
  );
};

export default TabStatistics;
