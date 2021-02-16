import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

const getCameraRollPermission = async () => {
  if (Constants.platform!.ios) {
    const { status } = await ImagePicker.getCameraPermissionsAsync()
    if (status !== "granted") {
      alert('画像を選択する為にはカメラロールの許可が必要です。')
    }
  }
}

export const pickImage = async () => {
  await getCameraRollPermission()
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false
  })
  if (!result.cancelled) {
      return result.uri
  }
}