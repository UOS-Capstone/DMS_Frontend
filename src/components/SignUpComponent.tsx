import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import Config from 'react-native-config';
import axios, {AxiosError} from 'axios';
import BirthComponent from './BirthComponent';
import GenderComponent from './genderComponent';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp({navigation}: SignUpScreenProps) {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState(0);
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [street, setStreet] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [memberImage, setMemberImage] = useState('');

  const onChangeUserId = useCallback((text:string) => {
    setUserId(text.trim());
  }, []);
  const onChangePassword = useCallback((text:string) => {
    setPassword(text.trim());
  }, []);
  const onChangeNickname = useCallback((text:string) => {
    setNickname(text.trim());
  }, []);
  const onChangeGender = useCallback((text:number) => {
    setGender(text);
  }, []);
  const onChangeBirth = useCallback((text:string) => {
    setBirth(text.trim());
  }, []);
  const onChangeEmail = useCallback((text:string) => {
    setEmail(text.trim());
  }, []);
  const onChangePhoneNo = useCallback((text:string)=> {
    setPhoneNo(text.trim());
  }, []);
  const onChangeZipcode = useCallback((text:string)=> {
    setZipcode(text.trim());
  }, []);
  const onChangeStreet = useCallback((text:string)=> {
    setStreet(text.trim());
  }, []);
  const onChangeAddressDetail = useCallback((text:string)=> {
    setAddressDetail(text.trim());
  }, []);
  const onChangeMemberImage = useCallback((text:string)=> {
    setMemberImage(text.trim());
  }, []);

  const [token, setToken] = useState('');
  const onSubmit = useCallback(async () => {
    const user = {
      userId : userId,
      password : password,
      nickname : nickname,
      gender : gender,
      birth : birth,
      email : email,
      phoneNo : phoneNo,
      zipcode : zipcode,
      street : street,
      addressDetail : addressDetail,
      memberImage : memberImage
    }
    if(loading){
      return
    }
    if (!userId || !userId.trim()) {
      return Alert.alert('??????', '???????????? ??????????????????.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('??????', '??????????????? ??????????????????.');
    }
    if (!nickname || !nickname.trim()) {
      return Alert.alert('??????', '????????? ??????????????????.');
    }
    if (!gender) {
        return Alert.alert('??????', '????????? ??????????????????.');
      }
    if (!birth || !birth.trim()) {
        return Alert.alert('??????', '??????????????? ??????????????????.');
    }
    if (!email || !email.trim()) {
        return Alert.alert('??????', '???????????? ??????????????????.');
    }
    if (!phoneNo || !phoneNo.trim()) {
        return Alert.alert('??????', '??????????????? ??????????????????.');
    }
    if (!zipcode || zipcode.trim()) {
        return Alert.alert('??????', '??????????????? ??????????????????.');
    }
    if (!street || !street.trim()) {
        return Alert.alert('??????', ' ?????????????????? ??????????????????.');
    }
    if (!addressDetail|| !addressDetail.trim()) {
        return Alert.alert('??????', '??????????????? ??????????????????.');
    }
    if (!memberImage || !memberImage.trim()) {
        return Alert.alert('??????', '????????? ??????????????????.');
    }

    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        userId,
      )
    ) {
      return Alert.alert('??????', '????????? ????????? ????????? ????????????.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '??????',
        '??????????????? ??????,??????,????????????($@^!%*#?&)??? ?????? ???????????? 8??? ?????? ?????????????????????.',
      );
    }
    try {
        setLoading(true);
        const response = await axios.post(`http://25.15.132.100:8080/member/Signup`, user)
        .then((response) => (response)=>{
          console.log(response.data);
          setToken(JSON.stringify(response.data));
          Alert.alert('??????', '???????????? ???????????????.');
          navigation.navigate('Login');
        })
        .catch((error)=>{
          console.log(error);
        })
      }finally{
        setLoading(false);}
  }, [loading, navigation, userId, password, nickname, gender, birth, email, phoneNo, zipcode, street, addressDetail, memberImage]);

  const canGoNext = userId && password && nickname && email && phoneNo && zipcode && street && addressDetail;
  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Text style={styles.text}>?????????</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeUserId}
          placeholder="?????????"
          placeholderTextColor="#666"
          value={userId}
          returnKeyType="next"
          clearButtonMode="while-editing"
          blurOnSubmit={false}
        />
      </View>
      <View style = {styles.wrapper}>
        <Text style = {styles.text}>????????????</Text>
        <TextInput
          style = {styles.textInput}
          onChangeText = {onChangePassword}
          placeholder = "????????????"
          placeholderTextColor = "#666"
          secureTextEntry = {true}
          value = {password}
          returnKeyType = "next"
          clearButtonMode = "while-editing"
          blurOnSubmit = {false}/>
      </View>
      <View style = {styles.wrapper}>
        <Text style = {styles.text}>??????</Text>
        <TextInput
          style = {styles.textInput}
          onChangeText = {onChangeNickname}
          placeholder = "??????"
          placeholderTextColor = "#666"
          value = {nickname}
          returnKeyType = "next"
          clearButtonMode = "while-editing"
          blurOnSubmit = {false}/>
      </View>
      <View style = {styles.wrapper}>
        <Text style = {styles.text}>??????</Text>
        <GenderComponent/>
      </View>
      <View style = {styles.wrapper}>
        <Text style = {styles.text}>????????????</Text>
        <BirthComponent/>
      </View>
      <View style = {styles.wrapper}>
        <Text style = {styles.text}>?????????</Text>
        <TextInput
          style = {styles.textInput}
          onChangeText = {onChangeEmail}
          placeholder= '?????????'
          placeholderTextColor = "#666"
          value = {email}
          returnKeyType = "next"
          clearButtonMode = "while-editing"
          blurOnSubmit = {false}/>
      </View>
      <View style = {styles.wrapper}>
        <Text style = {styles.text}>????????????</Text>
        <TextInput
          style = {styles.textInput}
          onChangeText = {onChangePhoneNo}
          placeholderTextColor = "#666"
          value = {phoneNo}
          returnKeyType = "next"
          clearButtonMode = "while-editing"
          blurOnSubmit = {false}
          keyboardType = "number-pad"/>
      </View>
      <View style = {styles.wrapper}>
        <Text style = {styles.text}>????????????</Text>
        <TextInput
          style = {styles.textInput}
          value = {zipcode}
          onChangeText = {onChangeZipcode}
          clearButtonMode = "while-editing"
          blurOnSubmit = {false}
          keyboardType = "number-pad"/>
      </View>
      <View style = {styles.wrapper}>
        <Text style = {styles.text}>????????????</Text>
        <TextInput
          style = {styles.textInput}
          onChangeText = {onChangeAddressDetail}
          placeholder = "????????????"
          placeholderTextColor = "#666"
          value = {addressDetail}
          clearButtonMode = "while-editing"
          blurOnSubmit = {false}/>
      </View>
      <View>
        
      </View>
      <View style = {styles.button}>
        <Pressable
          style = {canGoNext ? StyleSheet.compose(styles.signUpButton, styles.signUpButtonActive)
          : styles.signUpButton}
          disabled = {!canGoNext || loading}
          onPress = {onSubmit}>
         <Text style = {styles.signUpButtonText}>??????????????????</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    flexDirection : 'row',
  },
  textInput: {
    fontWeight : 'bold',
    fontSize : 12,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical : 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button : {
    alignItems : 'center',
  },
  signUpButton : {
    backgroundColor : 'gray',
    paddingHorizontal : 20,
    paddingVertical : 10,
    borderRadius : 5,
    marginBottom : 10,
  },
  signUpButtonActive:{
    backgroundColor : 'blue',
  },
  signUpButtonText:{
    color : 'white',
    fontSize : 16,
  },
});

export default SignUp;