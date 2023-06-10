import {
  View,
  Text,
  FlatList,
  Image,
  Appearance,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SvgComponentLogin} from '../assets/Icons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
type Props = {
  data?: object;
};

const Home = ({data}: Props) => {
  // console.log("🚀 ~ file: Home.tsx:10 ~ Home ~ data   ~~~  :", data)
  const navigation = useNavigation();
  const [userLoginNotify, setUserLoginNotify] = useState<boolean>(true);
  const [cartCount, setCartCount] = useState(0);
  const [product, setProduct] = useState();
  const [allProduct, setAllProduct] = useState<any>();
  const [theme, setTheme] = useState();
  const handleCartCountAppLaunch = async () => {
    let count = 0;
    const dataCart = await AsyncStorage.getItem('cart');
    dataCart !== null &&
      JSON.parse(dataCart).map(item => {
        count += item.quantity;
      });
    setCartCount(count);
  };

  //Login check
  const handleLoginCheck = async () => {
    const user = await AsyncStorage.getItem('user');
    user !== null && setUserLoginNotify(false);
  };

  const handleFilterProduct = async (category: string) => {
    console.log('first', category);
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${category.toLowerCase()}`,
    );
    const result = await response.json();
    setProduct(result);
  };
  type Data = {
    id: number;
    image: string;
    price: number;
    title: string;
    quantity: number;
  };
  const handleCount = (data: Data[]) => {
    console.log('data ==========================', data);
    let count = 0;
    data.map(item => {
      count += item.quantity;
    });
    setCartCount(count);
  };
  const handleSearchItem = (text: string) => {
    let searchData = [];
    let resultCount = 0;
    console.log('text.length', text.length);
    if (text.length === 0) {
      setProduct(allProduct);
    } else {
      if (allProduct.length > 0) {
        allProduct.map(item => {
          const allTitleSplitChar = item.title.toLowerCase().split('');
          const allTextSplitChar = text.toLowerCase().split('');
          const result = allTextSplitChar.some(char =>
            allTitleSplitChar.includes(char),
          );
          if (result) {
            resultCount += 1;
            console.log(item);
            searchData.push(item);
          }
        });
        if (resultCount === 0) {
          setProduct(allProduct);
        }
        setProduct(searchData);
      } else {
        setProduct(allProduct);
      }
    }
  };
  const fetchProduct = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const product = await response.json();
    setProduct(product);
    setAllProduct(product);
  };
  useFocusEffect(
    React.useCallback(() => {
      handleLoginCheck();
      fetchProduct();
      handleCartCountAppLaunch();
    }, []),
  );

  return (
    <View className="flex-1">
      <Header
        handleFilter={handleFilterProduct}
        handleSearchItem={handleSearchItem}
        count={cartCount}
      />
      {userLoginNotify && (
        <View className="flex-row items-center justify-between  mx-2 mt-3 mb-1 bg-red-50 shadow-md shadow-red-900 p-2.5 rounded border-red-200 border">
          <Text className="text-zinc-800 text-sm ">
            Please Sign in to add Product into cart
          </Text>
          <TouchableOpacity
            //@ts-ignore
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
            className="flex-row items-center gap-x-2 px-2 py-2 rounded bg-red-500">
            <Text className="text-white text-base font-[500]">Login</Text>
            <SvgComponentLogin class="fill-white w-5 h-5  mr-2 " />
          </TouchableOpacity>
        </View>
      )}
      {product && (
        <FlatList
          data={product}
          numColumns={2}
          renderItem={({item}) => (
            <Card
              image={item.image}
              title={item.title}
              price={item.price}
              id={item.id}
              handleCartCount={handleCount}
            />
          )}
        />
      )}
    </View>
  );
};

export default Home;
