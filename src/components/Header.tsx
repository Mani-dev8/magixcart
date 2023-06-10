import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import {
  SvgComponentCart,
  SvgComponentElectronics,
  SvgComponentFilterSlider,
  SvgComponentJewelry,
  SvgComponentMensClothing,
  SvgComponentRightArrow,
  SvgComponentSearch,
  SvgComponentWomensClothing,
} from '../assets/Icons';
import {useNavigation} from '@react-navigation/native';

type Props = {
  count: number;
  handleFilter: (category: string) => void;
  handleSearchItem:(text:string)=>void;
};

const Header = ({handleFilter, count,handleSearchItem}: Props) => {
  const navigation = useNavigation();
  const [searchBar, setSearchBar] = useState(false);

  const handleFilterClick = async (category: string) => {
    handleFilter(category);
  };
  const categories = [
    {
      id: 0,
      name: 'Electronics',
      icon: <SvgComponentElectronics class="w-6 h-6 fill-zinc-700  " />,
    },
    {
      id: 1,
      name: 'Jewelery',
      icon: <SvgComponentJewelry class="w-6 h-6 fill-zinc-700 " />,
    },
    {
      id: 2,
      name: "Men's clothing",
      icon: <SvgComponentMensClothing class="w-6 h-6 fill-zinc-700" />,
    },
    {
      id: 3,
      name: "Women's clothing",
      icon: <SvgComponentWomensClothing class="w-6 h-6 fill-zinc-700" />,
    },
  ];
  const [filter, setFilter] = useState(false);
  const handleSearch = async (text: string) => {
    console.log('text', text)
    handleSearchItem(text)
    
  };
  return (
    <View className="relative z-10">
      <View className="p-2 py-3.5 border-b flex-row justify-between border-red-500 bg-white shadow-xl  shadow-black">
        <TouchableOpacity
          activeOpacity={0.7}
          className="ml-2 "
          onPress={() => {
            setFilter(!filter);
            setSearchBar(false);
          }}>
          <SvgComponentFilterSlider
            class={`h-5 w-5  ${filter ? 'fill-red-600' : 'fill-zinc-700'}`}
          />
        </TouchableOpacity>
        <Image
          source={require('../assets/magixcart_logo.png')}
          className="w-40 h-[22px]"
          resizeMode="contain"
        />
        <View className="flex-row gap-x-8">
          <TouchableOpacity
            className=""
            onPress={() => {
              setSearchBar(!searchBar);
              setFilter(false);
            }}>
            <SvgComponentSearch
              class={`h-6 w-6  fill-none ${
                searchBar ? 'stroke-red-600' : 'stroke-zinc-700'
              } stroke-[1.5]`}
            />
          </TouchableOpacity>
          <View className="relative">
            <TouchableOpacity
              onPress={() => count > 0 && navigation.navigate('CartStack')}
              activeOpacity={0.7}>
              <SvgComponentCart class={'w-6 h-6 stroke-red-500 fill-red-600'} />
              <Text className="absolute -top-1.5 -left-1.5 text-xs  bg-red-500 aspect-square text-white h-[17] text-center rounded-full">
                {count}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {searchBar ? (
        <View className="p-1  transition-all relative w-full justify-center">
          <TextInput
            onChangeText={text => handleSearch(text)}
            placeholder="search for product...."
            className="border-[1.5px] bg-white text-red-500 relative pl-2 pr-10 text-lg rounded-md border-red-500"
            cursorColor={'red'}></TextInput>
          <TouchableOpacity className="absolute right-5">
            <SvgComponentRightArrow class="stroke-red-500 w-5 h-5 stroke-[0.8px]" />
          </TouchableOpacity>
        </View>
      ) : (
        ''
      )}
      {filter && (
        <View className="relative w-full">
          <View className="w-[60vw] z-20 absolute h-[100vh] bg-white py-5 px-2">
            <Text className="text-lg text-zinc-800 border-b border-b-zinc-300 py-1 mb-2">
              Categories
            </Text>
            <View className="pl-3">
              {categories.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleFilterClick(item.name)}
                  className="flex-row gap-x-3 py-1 items-center">
                  {item.icon}
                  <Text className="py-1 text-black text-base">{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View className="w-[100vw]  absolute h-[100vh] bg-[#0000002b] "></View>
        </View>
      )}
    </View>
  );
};

export default Header;
