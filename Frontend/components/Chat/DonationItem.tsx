import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DonationInfo} from '../../constants/types';
import ProfilePhoto from '../Utils/ProfilePhoto';
import CircleGradient from '../Utils/CircleGradient';
import ModalWidthButtom from '../Utils/ModalWithButton';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'white',
    // padding: '5%',
    // borderRadius: 15,
    margin: 5,
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
    fontSize: 12,
    marginHorizontal: 10,
    color: 'white',
  },
  textRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradientStyle: {
    width: 'auto',
    height: 'auto',
    borderRadius: 25,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  modalText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  modalContainer: {
    width: '80%',
  },
  modalProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coinText: {
    marginLeft: -6,
    fontFamily: 'DancingScript-Bold',
    fontSize: 12,
    color: 'white',
  },
});

interface Props {
  donation: DonationInfo;
}

const DonationItem = ({donation}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <CircleGradient
          grade="normal"
          size="medium"
          customStyle={styles.gradientStyle}>
          <View style={styles.container}>
            <ProfilePhoto
              size="extraSmall"
              grade="normal"
              isGradient={true}
              imageURI={donation.supporterImage_url}
              profileUserId={donation.supporterId}
            />
            <View>
              <Text style={styles.text}>{donation.supporterNickname}</Text>
              <View style={styles.textRowContainer}>
                <Text style={styles.text}>{donation.coin}</Text>
                <Text style={styles.coinText}>L</Text>
              </View>
            </View>
          </View>
        </CircleGradient>
      </TouchableOpacity>
      <ModalWidthButtom
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        leftText="??????"
        onLeftPress={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalProfileContainer}>
            <View style={styles.container}>
              <ProfilePhoto
                size="extraSmall"
                grade="normal"
                isGradient={true}
                imageURI={donation.supporterImage_url}
                profileUserId={donation.supporterId}
              />
              <Text style={styles.text}>{donation.supporterNickname}</Text>
            </View>
            <View style={styles.textRowContainer}>
              <Text style={styles.text}>{donation.coin}</Text>
              <Text style={styles.coinText}>L</Text>
            </View>
          </View>
          <Text style={styles.modalText}>{donation.content}</Text>
        </View>
      </ModalWidthButtom>
    </View>
  );
};

export default DonationItem;
