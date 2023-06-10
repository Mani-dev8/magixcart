import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {SvgComponentCloseEye, SvgComponentOpenEye} from '../assets/Icons';
import Toast from '../components/Toast';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {};

const Login = (props: Props) => {
  const navigation = useNavigation();
  const refPassword = useRef(null);

  const [credentials, setCredentials] = useState({userName: '', password: ''});

  const [showPassword, setShowPassword] = useState(false);

  const [toast, setToast] = useState(false);
  const handleLoginSubmit = async() => {
    // setToast(false)
    if (
      credentials.userName === 'kevinryan' &&
      credentials.password === 'kev02937@'
    ) {
      //@ts-ignore
      navigation.navigate('Home');
      await AsyncStorage.setItem('user', JSON.stringify(credentials));
    } else {
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
  };

  return (
    <View className="p-3  px-6 flex-1 bg-[#3e0303]">
      <Text className="text-white border-b-white uppercase font-[300] self-center text-2xl border-b  pt-5 absolute ">
        Sign In
      </Text>
      <View className="m-auto px-5 border border-red-300 pt-10 pb-10 rounded-xl bg-white">
        <View className="items-center  flex-row pb-5">
          <Image
            source={require('../assets/magixcart_logo.png')}
            className="m-auto h-8 my-2"
            resizeMode="contain"
          />
        </View>
        <View className="gap-y-5">
          <View className="gap-y-2">
            <Text className="text-red-500 text-lg">User Name</Text>
            <TextInput
              value={credentials.userName}
              onChangeText={text => {
                return setCredentials({...credentials, userName: text});
              }}
              cursorColor={'red'}
              className="border-[1.5px] rounded border-zinc-300 focus:border-red-500 py-2 text-base text-black"></TextInput>
          </View>
          <View className="gap-y-2  ">
            <Text className="text-red-500 text-lg">Password</Text>
            <View className="relative justify-center">
              <TextInput
                cursorColor={'red'}
                secureTextEntry={showPassword ? false : true}
                ref={refPassword}
                value={credentials.password}
                onChangeText={text =>
                  setCredentials({...credentials, password: text})
                }
                className="border-[1.5px] rounded pr-10  border-zinc-300 focus:border-red-500 py-2 text-base text-black"></TextInput>
              <TouchableOpacity
                className="absolute right-2 z-50 w-5 h-5 "
                onPress={() => setShowPassword(!showPassword)}>
                {showPassword === true ? (
                  <SvgComponentOpenEye class="w-5 h-5" />
                ) : (
                  <SvgComponentCloseEye class="w-5 h-5" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleLoginSubmit}
          className="py-3 items-center bg-red-500 w-48 self-center rounded-lg mt-10">
          <Text className="uppercase text-lg text-white ">Sign in</Text>
        </TouchableOpacity>
        <Text selectable={true} className="text-red-400 pt-10 ">
          {`Note: use this credentials for demo purpose \nuser name :`}{' '}
          <Text className="text-red-800 text-base" selectable={true}>
            kevinryan
          </Text>
          {`\npassword: `}
          <Text className="text-red-800 text-base" selectable={true}>
            kev02937@
          </Text>
        </Text>
      </View>
      {toast && (
        <Toast
          time={2000}
          text="Please enter the same demo credentials given at the bottom of the screen"
          textColor="text-red-700"
          bgColor="bg-red-50"
        />
      )}
    </View>
  );
};

export default Login;
