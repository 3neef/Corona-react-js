import React, {useState, useEffect} from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Charts.module.css';

const Charts = ({ data:{confirmed, recovered, deaths}, country}) =>{
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
            
        fetchAPI();
    
    }, []);

    const lineChart = (
        dailyData.length
        ?(
            <Line 
            data={{
                labels: dailyData.map(({date})=>date),
                datasets: [{
                    data: dailyData.map(({ confirmed })=>confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths })=>deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: ' rgba(255,0,0,0.5) ',
                    fill: true,
                }],
            }}
        
        />
        ) : null
    );
    
       const barChart = (
            confirmed 
            ?(
                <Bar
                  data={{
                      labels: ['Infected', 'Recovered','Deaths'],
                      datasets: [{
                          label: ['People'],
                          backgroundColor: [
                              'rgba(253, 215, 1, 0.884)',
                              'rgb(52, 255, 11)',
                              'rgba(255, 0, 0, 0.884)',
                          ],
                          data: [confirmed.value, (confirmed.value - deaths.value)/4, deaths.value],
                      }]

                  }}

                  options={{
                      legend: {display:false},
                      title: {display:true, text:`Current state in ${country}`},

                  }}
                
                />
            ) : null
       );     

    return(
        <div className={styles.container}>
            {country ? barChart : lineChart}


        </div>
    )
}

export default Charts;