import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';

type Props = {};

const Checkout = (props: Props) => {
  return (
    <View className="p-4  flex-1">
      <Text className="text-zinc-900 font-[500] text-xl tracking-wide ">
        Shipping Details
      </Text>
      <View className="gap-y-3 pt-2 ">
        <View className="gap-y-2">
          <Text className="text-zinc-500 text-lg">Full name</Text>
          <TextInput
            cursorColor={'red'}
            keyboardType="default"
            className="border-[1.5px] rounded border-zinc-300 focus:border-red-500 py-2 text-base text-black"></TextInput>
        </View>
        <View className="gap-y-2">
          <Text className="text-zinc-500 text-lg">Address</Text>
          <TextInput
            cursorColor={'red'}
            keyboardType="default"
            className="border-[1.5px] rounded border-zinc-300 focus:border-red-500 py-2 text-base text-black"></TextInput>
        </View>
        <View className="gap-y-2">
          <Text className="text-zinc-500 text-lg">Pincode</Text>
          <TextInput
            cursorColor={'red'}
            keyboardType="email-address"
            className="border-[1.5px] rounded border-zinc-300 focus:border-red-500 py-2 text-base text-black"></TextInput>
        </View>
        <View className="gap-y-2 mb-2">
          <Text className="text-zinc-500 text-lg">Phone</Text>
          <TextInput
            cursorColor={'red'}
            keyboardType="numeric"
            className="border-[1.5px] rounded border-zinc-300 focus:border-red-500 py-2 text-base text-black"></TextInput>
        </View>

      </View>
      <TouchableOpacity className="w-full py-3 bg-red-500 self-center mt-20  rounded-lg border-red-300 border-2">
        <Text className="text-white text-xl self-center "> Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checkout;
