import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const Cart = (props: Props) => {
  const navigation = useNavigation();

  const [data, setData] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);

  const handleData = async () => {
    const cartData = await AsyncStorage.getItem('cart');
    cartData !== null && setData(JSON.parse(cartData));
    let totalPrice = 0;
    cartData !== null &&
      JSON.parse(cartData).map(item => {
        totalPrice += item.quantity * item.price;
        console.log('totalPrice', totalPrice)
      });
      setTotal(parseFloat(totalPrice.toFixed(2)))
      
      
  };
  useEffect(() => {
    handleData();
  }, []);

  return (
    <View className="flex-1 w-full py-4">
      <Text
        className="text-zinc-800 font-semibold text-lg pl-4 pt-2 pb-3"
        numberOfLines={2}>
        Products :
      </Text>
      {data.length > 0 && (
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <View className="flex-row   mx-4 my-1  border-red-300 h-[13vh] border  p-2 rounded-xl">
                <Image
                  source={{uri: item.image}}
                  resizeMode="contain"
                  className="w-auto h-[100%] aspect-square"
                />
                <View className="w-[65vw] gap-y-1 ">
                  <Text className="text-zinc-800 " numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text
                    className="text-zinc-800 font-semibold "
                    numberOfLines={2}>
                    $ {item.price}
                  </Text>
                  <Text className="text-zinc-800 " numberOfLines={2}>
                    Qty: {item.quantity}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}
      <View className="gap-y-2 pb-2 mb-2 border-b border-b-red-300 mx-4">
        <View className="flex-row items-baseline justify-between ">
          <Text className="text-zinc-500 text-lg font-[500]">Total</Text>
          <Text className="text-zinc-800 text-lg pt-1 font-bold tracking-widest ">
            $ {Math.floor(total)}
            <Text className="text-zinc-800 text-sm">
              .{(total - Math.floor(total)).toFixed(2).split('.')[1]}
            </Text>
          </Text>
        </View>
        <View className="flex-row items-baseline justify-between ">
          <Text className="text-zinc-500 text-lg font-[500]">Tax</Text>
          <Text className="text-zinc-800 text-base pt-1 font-bold tracking-widest ">
            $ {Math.floor(total * 0.18)}
            <Text className="text-zinc-800 text-xs">
              .
              {
                (total * 0.18 - Math.floor(total * 0.18))
                  .toFixed(2)
                  .split('.')[1]
              }
            </Text>
          </Text>
        </View>
      </View>
      <View className="flex-row items-baseline justify-between px-4 pb-4">
        <Text className="text-zinc-500 text-lg font-[500]">Grand Total</Text>
        <Text className="text-red-500 text-2xl pt-2 font-bold tracking-widest ">
          $ {Math.floor(total) + Math.floor(total * 0.18)}
          <Text className="text-red-500 text-base">
            .
            {
              (
                total -
                Math.floor(total) +
                total * 0.18 -
                Math.floor(total * 0.18)
              )
                .toFixed(2)
                .split('.')[1]
            }
          </Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Checkout')}
        activeOpacity={0.7}
        className="item-center justify-center  flex-row px-2 py-3.5 rounded-lg bg-red-500 mx-4">
        <Text className="text-xl font-[500] tracking-widest uppercase text-white">
          Checkout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;
