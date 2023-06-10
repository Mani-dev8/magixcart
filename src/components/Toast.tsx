import {View, Text} from 'react-native';
import React, {useState} from 'react';

type Props = {
  bgColor: string;
  textColor: string;
  text: string;
  time: number;
};

const Toast = ({bgColor, text, textColor, time}: Props) => {
 

        return <View
        className={`w-[98vw] absolute ml-[1vw]  top-5 right-[1vw] z-50 flex-row items-center justify-between m-auto self-center p-2.5 ${bgColor} z-20 rounded-lg border border-red-300 shadow-lg shadow-red-800`}>
        <Text className={`${textColor} m-auto font-bold text-lg`}>*</Text>
        <Text className={`${textColor} text-base w-[90%]`}>{text}</Text>
      </View>
 
   
  
};

export default Toast;
