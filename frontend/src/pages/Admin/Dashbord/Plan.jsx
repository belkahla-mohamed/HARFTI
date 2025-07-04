import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// Préparer les données pour le graphique
const PolarAreaChart = () => {
  const [message, setMessage] = useState('');
  const [services, setServices] = useState([]); 
  useEffect(() => {
  axios.get('http://localhost:3001/services')
    .then((res) => {
        if (res.data.status === "success") {
            setServices(res.data.services);
            setMessage(res.data.message);
        } else {
            setMessage(res.data.message);
        }
    })
    .catch((err) => console.log(err));
  }, []);

  
const data = {
  labels: services.slice(1, 5).map(service => service.title), // Utiliser les titres comme labels
  datasets: [
    {
      label: 'Services',
      data: services.slice(1, 5).map(service => service.description.length), // Utiliser la longueur de la description comme données
      backgroundColor: [
        'rgba(0, 136, 254, 0.5)',
        'rgba(0, 196, 159, 0.5)',
        'rgba(255, 128, 66, 0.5)',
        'rgba(255, 187, 40, 0.5)',
        'rgba(175, 25, 255, 0.5)',
      ],
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function(context) {
          const service = services[context.dataIndex];
          return `${service.title}: ${service.description}`; // Afficher le titre et la description dans l'infobulle
        }
      }
    },
  },
};

  return (
    <div className=' py-7 px-2'>
      <h2 className='w-full text-center text-lg'>Polar Area Chart - Services Data</h2>
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default PolarAreaChart;