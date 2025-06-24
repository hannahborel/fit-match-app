import CardElement from '@/components/elements/CardElement';
import { useGetLeague } from '@/hooks/useGetLeague';
import React from 'react';
import { Text, View } from 'react-native';

const home = () => {


  const { data: LeagueData } = useGetLeague();



  console.log(JSON.stringify(LeagueData, null, 2));
  return (
 
      <View style={{ flex: 1 }}>
        <CardElement title={'YOUR LEAGUE STARTS IN'}>
          <View>
            <Text>card content</Text>
          </View>
        </CardElement>
      </View>

     
  
  );
};


export default home;
