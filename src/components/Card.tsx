import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from './Toast';
type Data = {
  id: number;
  image: string;
  price: number;
  title: string;
  quantity: number;
};
type Props = {
  image: string;
  title: string;
  price: number;
  id: number;
  handleCartCount: (objects: Data[]) => void;
};

const Card = ({image, title, price, id, handleCartCount}: Props) => {
  const [toast, setToast] = useState(false);
  
  const handleCart = async (data: {
    id: number;
    image: string;
    price: number;
    title: string;
    quantity: number;
  }) => {
    try {
      // await AsyncStorage.removeItem('cart');
      const cartAsync = await AsyncStorage.getItem('cart');
      console.log('cartAsync', cartAsync);
      const userData = await AsyncStorage.getItem('user');
      console.log("🚀 ~ file: Card.tsx:35 ~ Card ~ data   ~~~  :", userData)

      if (userData !== null) {
        if (cartAsync === null) {
          const cartItem = [data];
          console.log(
            '🚀 ~ file: Card.tsx:21 ~ Card ~ cartItem   ~~~  :',
            cartItem,
          );
          await AsyncStorage.setItem('cart', JSON.stringify(cartItem));

          handleCartCount(cartItem);
        } else {
          console.log('cartAsync', cartAsync);
          const cartItem = JSON.parse(cartAsync);
          const dataFilter = cartItem.filter(item => item.id === data.id);
          let dataList;
          if (dataFilter.length) {
            cartItem.map((item, index) => {
              if (item.id === data.id) {
                const updateItem = [...cartItem];
                updateItem[index].quantity += 1;
                dataList = updateItem;
              }
            });
            console.log(
              '🚀 ~ file: Card.tsx:42 ~ Card ~ dataList   ~~~  :',
              dataList,
            );
            await AsyncStorage.setItem('cart', JSON.stringify(dataList));
            handleCartCount(dataList);
          } else {
            console.log('[...cartItem, data]', [...cartItem, data]);
            await AsyncStorage.setItem(
              'cart',
              JSON.stringify([...cartItem, data]),
            );
            handleCartCount([...cartItem, data]);
          }
          const data2 = await AsyncStorage.getItem('cart');
        }
      } else {
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
    } catch (error) {
      console.log('error=============================', error);
    }
    // await AsyncStorage.removeItem('cart');
  };
  return (
    <>
      <View className="w-[45%] rounded bg-white  my-2 mx-auto p-2">
        <Image
          source={{uri: image}}
          resizeMode="contain"
          className="w-full h-56"
        />
        <View className="ml-0.5 py-2 gap-y-0.5">
          <Text className=" text-sm text-zinc-600" numberOfLines={1}>
            {title}
          </Text>
          <Text className="font-semibold text-black text-sm" numberOfLines={1}>
            $ {price}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleCart({image, title, price, quantity: 1, id});
          }}
          className="py-2.5 items-center bg-red-500 rounded ">
          <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
            ADD TO CART
          </Text>
        </TouchableOpacity>
      </View>
      {toast && (
        <Toast
          text="Please Login to add Product in cart"
          textColor="text-red-700"
          bgColor="bg-red-50"
          time={2000}
        />
      )}
    </>
  );
};

export default Card;
