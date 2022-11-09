import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';

import {useQuery} from 'react-query';

import {getUserWalletAddressAndCoin} from '../../api/profile';
import {walletTabType} from '../../constants/types';
import Wallet from '../../components/Profile/Wallet/Wallet';
import WalletCategory from '../../components/Profile/Wallet/WalletCategory';
import CircleProfile from '../../components/Utils/CircleProfile';
import ModalWithButton from '../../components/Utils/ModalWithButton';
import LoadingSpinner from '../../components/Utils/LoadingSpinner';
import Colors from '../../constants/Colors';

const dummyGiveList = [
  {giveId: 0, busker: {buskerId: 2, nickname: '영훈'}, coin: 300},
  {giveId: 1, busker: {buskerId: 2, nickname: '유주'}, coin: 300},
  {giveId: 2, busker: {buskerId: 2, nickname: '윤혁'}, coin: 300},
  {giveId: 3, busker: {buskerId: 2, nickname: '주현'}, coin: 300},
  {giveId: 4, busker: {buskerId: 2, nickname: '혜령'}, coin: 300},
  {giveId: 5, busker: {buskerId: 2, nickname: '헤르메스'}, coin: 300},
  {giveId: 6, busker: {buskerId: 2, nickname: '나폴레옹'}, coin: 300},
  {giveId: 7, busker: {buskerId: 2, nickname: '춘식이'}, coin: 300},
  {giveId: 8, busker: {buskerId: 2, nickname: '라이언'}, coin: 300},
  {giveId: 9, busker: {buskerId: 2, nickname: '00아너무너무사랑해'}, coin: 300},
  {giveId: 10, busker: {buskerId: 2, nickname: '슈퍼노바'}, coin: 300},
  {giveId: 11, busker: {buskerId: 2, nickname: '무명가수1'}, coin: 300},
  {giveId: 12, busker: {buskerId: 2, nickname: '무명가수2'}, coin: 300},
  {giveId: 13, busker: {buskerId: 2, nickname: '무명가수3'}, coin: 300},
  {giveId: 14, busker: {buskerId: 2, nickname: '무명가수4'}, coin: 300},
  {giveId: 15, busker: {buskerId: 2, nickname: '슈퍼노바'}, coin: 300},
];

const dummyReceiveList = [
  {receiveId: 0, receive: {receiveId: 2, nickname: 'ㅠㅠ'}, coin: 300},
  {receiveId: 1, receive: {receiveId: 2, nickname: '유주'}, coin: 300},
  {receiveId: 2, receive: {receiveId: 2, nickname: '윤혁'}, coin: 300},
  {receiveId: 3, receive: {receiveId: 2, nickname: '주현'}, coin: 300},
  {receiveId: 4, receive: {receiveId: 2, nickname: '혜령'}, coin: 300},
  {receiveId: 5, receive: {receiveId: 2, nickname: '헤르메스'}, coin: 300},
  {receiveId: 6, receive: {receiveId: 2, nickname: '나폴레옹'}, coin: 300},
  {receiveId: 7, receive: {receiveId: 2, nickname: '춘식이'}, coin: 300},
  {receiveId: 8, receive: {receiveId: 2, nickname: '라이언'}, coin: 300},
  {
    receiveId: 9,
    receive: {receiveId: 2, nickname: '00아너무너무사랑해'},
    coin: 300,
  },
  {receiveId: 10, receive: {receiveId: 2, nickname: '슈퍼노바'}, coin: 300},
  {receiveId: 11, receive: {receiveId: 2, nickname: '무명가수1'}, coin: 300},
  {receiveId: 12, receive: {receiveId: 2, nickname: '무명가수2'}, coin: 300},
  {receiveId: 13, receive: {receiveId: 2, nickname: '무명가수3'}, coin: 300},
  {receiveId: 14, receive: {receiveId: 2, nickname: '무명가수4'}, coin: 300},
  {receiveId: 15, receive: {receiveId: 2, nickname: '슈퍼노바'}, coin: 300},
];

const dummyChargeList = [
  {chargeId: 0, chargeDate: '2022-10-24', coin: 4000},
  {chargeId: 1, chargeDate: '2022-10-25', coin: 3000},
  {chargeId: 2, chargeDate: '2022-10-26', coin: 300},
  {chargeId: 3, chargeDate: '2022-10-27', coin: 100},
  {chargeId: 4, chargeDate: '2022-10-28', coin: 2000},
  {chargeId: 5, chargeDate: '2022-10-29', coin: 300},
];

// supporter, busker
const WalletScreen = () => {
  const [walletTabMode, setWalletTabMode] = useState<walletTabType>('give');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [enteredCoin, setEnteredCoin] = useState<string>('');
  const [validationWarning, setValidationWarning] = useState<string>('');

  const userId = 1;
  const {
    data: walletData,
    isLoading,
    isError,
  } = useQuery('walletInfo', () => getUserWalletAddressAndCoin(userId));

  // TODO change type for listData
  let listData: any = dummyGiveList;
  if (walletTabMode === 'receive') {
    listData = dummyReceiveList;
  }
  if (walletTabMode === 'charge') {
    listData = dummyChargeList;
  }

  const Header = () => (
    <View>
      <Wallet
        setIsModalVisible={setIsModalVisible}
        coin={walletData?.coin || 0}
        address={walletData?.address || ''}
      />
      <WalletCategory
        walletTabMode={walletTabMode}
        setWalletTabMode={setWalletTabMode}
      />
    </View>
  );

  const Item = ({
    content,
    coin,
    imageURI,
  }: {
    content: string;
    coin: number;
    // TODO change imageURI type from boolean to string
    imageURI?: boolean;
  }) => (
    <Pressable style={styles.itemContainer}>
      <View style={styles.leftItem}>
        {imageURI && (
          <CircleProfile size="extraSmall" grade="normal" isGradient={true} />
        )}
        <Text style={[styles.text, imageURI && styles.content]}>{content}</Text>
      </View>
      <Text style={styles.text}>{coin}</Text>
    </Pressable>
  );

  const renderItem = ({item}: {item: any}) => {
    // TODO profile image
    let content = '';
    if (walletTabMode === 'give') {
      content = item.busker.nickname;
    }
    if (walletTabMode === 'receive') {
      content = item.receive.nickname;
    }
    if (walletTabMode === 'charge') {
      content = item.chargeDate;
    }
    return (
      <Item
        content={content}
        coin={item.coin}
        imageURI={walletTabMode !== 'charge'}
      />
    );
  };

  const enterCoinInputHandler = (text: string) => {
    const textLen = text.length;
    const numText = Number(text.trim());
    if (isNaN(numText)) {
      setEnteredCoin('0');
      setValidationWarning('충전할 금액을 숫자로 입력해 주세요.');
      return;
    }
    if (textLen > 1 && text[0] === '0') {
      setEnteredCoin(text.substring(1));
      setValidationWarning('리라는 0부터 100 사이로만 충전이 가능해요!');
      return;
    }
    if (textLen >= 3 && numText > 100) {
      setEnteredCoin('100');
      setValidationWarning('리라는 0부터 100 사이로만 충전이 가능해요!');
      return;
    }
    setValidationWarning('');
    setEnteredCoin(text.trim());
  };

  const coinInputCancleHandler = () => {
    setEnteredCoin('');
    setValidationWarning('');
    setIsModalVisible(false);
  };

  const chargeCoinHandler = () => {};

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingSpinner
          size="large"
          color={Colors.purple300}
          animating={isLoading}
        />
      ) : null}
      <ModalWithButton
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        leftText="취소하기"
        onLeftPress={() => coinInputCancleHandler()}
        rightText="충전하기"
        onRightPress={() => chargeCoinHandler()}>
        <View style={styles.coinInputContainer}>
          <TextInput
            style={styles.coinInput}
            value={enteredCoin}
            keyboardType="numeric"
            onChangeText={enterCoinInputHandler}
            defaultValue="0"
            maxLength={9}
          />
          {validationWarning ? (
            <Text style={[styles.text, styles.validationWarning]}>
              {validationWarning}
            </Text>
          ) : null}
        </View>
      </ModalWithButton>
      <FlatList
        data={listData}
        renderItem={renderItem}
        ListHeaderComponent={Header}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black500,
    marginBottom: '15%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: Colors.white300,
    borderBottomWidth: 1,
  },
  leftItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginLeft: 16,
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 18,
    color: Colors.gray300,
  },
  coinInputContainer: {
    width: '90%',
  },
  coinInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.pink300,
    color: 'white',
    fontSize: 20,
    textAlign: 'right',
  },
  validationWarning: {
    marginTop: 8,
    color: Colors.pink300,
    fontSize: 12,
    textAlign: 'right',
  },
});

export default WalletScreen;
