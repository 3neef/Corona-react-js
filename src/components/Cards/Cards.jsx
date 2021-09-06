import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';
    const Cards = ({ data: {confirmed, recovered, deaths, lastUpdate}}) =>{ 
      if (!confirmed){
          return ' ohhh shit ...'
      }

    return(
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color="textsecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h5">
                            <CountUp 
                             start={0}
                             end = { confirmed.value }
                             duration ={3.5}
                             separator =","
                            />
                        </Typography>
                        <Typography color="textsecondary">{ new Date(lastUpdate).toDateString() }</Typography>
                        <Typography variant="body2">Number of active cases of COVID-19</Typography>
                    </CardContent>

                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textsecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5">
                             <CountUp 
                             start={0}
                             end = { (confirmed.value - deaths.value)/10 }
                             duration ={2.5}
                             separator =","
                            /></Typography>
                        <Typography color="textsecondary">{ new Date(lastUpdate).toDateString() }</Typography>
                        <Typography variant="body2">Number of cases recovered from COVID-19</Typography>
                    </CardContent>

                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textsecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5"> 
                           <CountUp 
                             start={0}
                             end = { deaths.value }
                             duration ={1.5}
                             separator =","
                            /></Typography>
                        <Typography color="textsecondary">{ new Date(lastUpdate).toDateString() }</Typography>
                        <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
                    </CardContent>

                </Grid>
            </Grid>

        </div>
    )
}

export default Cards;