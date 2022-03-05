import { JavaScript } from './_common';

JavaScript['device_width'] = function (_block: any) {
  const code = 'device.width';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_height'] = function (_block: any) {
  const code = 'device.height';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_build_id'] = function (_block: any) {
  const code = 'device.buildId';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['device_broad'] = function (_block: any) {
  const code = 'device.broad';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['device_brand'] = function (_block: any) {
  const code = 'device.brand';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['device_device'] = function (_block: any) {
  const code = 'device.device';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_model'] = function (_block: any) {
  const code = 'device.model';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_product'] = function (_block: any) {
  const code = 'device.product';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_bootloader'] = function (_block: any) {
  const code = 'device.bootloader';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_hardware'] = function (_block: any) {
  const code = 'device.hardware';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_fingerprint'] = function (_block: any) {
  const code = 'device.fingerprint';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_serial'] = function (_block: any) {
  const code = 'device.serial';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_sdk_int'] = function (_block: any) {
  const code = 'device.sdkInt';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_incremental'] = function (_block: any) {
  const code = 'device.incremental';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_release'] = function (_block: any) {
  const code = 'device.release';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_base_os'] = function (_block: any) {
  const code = 'device.baseOS';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_security_patch'] = function (_block: any) {
  const code = 'device.securityPatch';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_codename'] = function (_block: any) {
  const code = 'device.codename';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_get_imei'] = function (_block: any) {
  const code = 'device.getIMEI()';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_get_android_id'] = function (_block: any) {
  const code = 'device.getAndroidId()';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['device_get_mac_address'] = function (_block: any) {
  const code = 'device.getMacAddress()';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_get_brightness'] = function (_block: any) {
  const code = 'device.getBrightness()';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_get_brightness_mode'] = function (_block: any) {
  const code = 'device.getBrightnessMode()';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['device_set_brightness'] = function (block: any) {
  const value =
    JavaScript.valueToCode(block, 'BRIGHTNESS', JavaScript.ORDER_MEMBER) || 60;
  const code = 'setBrightness(' + value + ')';
  return code;
};
JavaScript['device_set_brightness_mode'] = function (block: any) {
  const value =
    JavaScript.valueToCode(block, 'BRIGHTNESS_MODE', JavaScript.ORDER_MEMBER) ||
    0;
  const code = 'setBrightnessMode(' + value + ')';
  return code;
};
JavaScript['device_get_music_volume'] = function (_block: any) {
  const code = 'device.getMusicVolume()';
  return code;
};
JavaScript['device_get_notification_volume'] = function (_block: any) {
  const code = 'device.getNotificationVolume()';
  return code;
};
JavaScript['device_get_alarm_volume'] = function (_block: any) {
  const code = 'device.getAlarmVolume()';
  return code;
};
JavaScript['device_get_music_max_volume'] = function (_block: any) {
  const code = 'device.getMusicMaxVolume()';
  return code;
};
JavaScript['get_notification_max_volume'] = function (_block: any) {
  const code = 'device.getNotificationMaxVolume()';
  return code;
};
JavaScript['get_alarm_max_volume'] = function (_block: any) {
  const code = 'device.getAlarmMaxVolume()';
  return code;
};
JavaScript['device_set_music_volume'] = function (block: any) {
  const value =
    JavaScript.valueToCode(block, 'VOLUME', JavaScript.ORDER_MEMBER) || 0;
  const code = 'setMusicVolume(' + value + ')';
  return code;
};
JavaScript['device_set_notification_volume'] = function (block: any) {
  const value =
    JavaScript.valueToCode(block, 'VOLUME', JavaScript.ORDER_MEMBER) || 0;
  const code = 'setNotificationVolume(' + value + ')';
  return code;
};
JavaScript['device_set_alarm_volume'] = function (block: any) {
  const value =
    JavaScript.valueToCode(block, 'VOLUME', JavaScript.ORDER_MEMBER) || 0;
  const code = 'setAlarmVolume(' + value + ')';
  return code;
};

JavaScript['get_battery'] = function (_block: any) {
  const code = 'device.getBattery()';
  return code;
};

JavaScript['is_charging'] = function (_block: any) {
  const code = 'device.isCharging()';
  return code;
};

JavaScript['get_total_mem'] = function (_block: any) {
  const code = 'device.getTotalMem()';
  return code;
};
JavaScript['get_avail_mem'] = function (_block: any) {
  const code = 'device.getAvailMem()';
  return code;
};

JavaScript['is_screen_on'] = function (_block: any) {
  const code = 'device.isScreenOn()';
  return code;
};

JavaScript['wake_up'] = function (_block: any) {
  const code = 'device.wakeUp()';
  return code;
};

JavaScript['wake_up_if_needed'] = function (_block: any) {
  const code = 'device.wakeUpIfNeeded()';
  return code;
};

JavaScript['keep_screen_on'] = function (block: any) {
  const value =
    JavaScript.valueToCode(block, 'TIMEOUT', JavaScript.ORDER_MEMBER) || 0;
  const code = 'keepScreenOn(' + value + ')';
  return code;
};

JavaScript['keep_screen_dim'] = function (block: any) {
  const value =
    JavaScript.valueToCode(block, 'TIMEOUT', JavaScript.ORDER_MEMBER) || 0;
  const code = 'keepScreenDim(' + value + ')';
  return code;
};

JavaScript['cancel_keeping_awake'] = function (_block: any) {
  const code = 'device.cancelKeepingAwake()';
  return code;
};

JavaScript['vibrate'] = function (block: any) {
  const value =
    JavaScript.valueToCode(block, 'TIME', JavaScript.ORDER_MEMBER) || 0;
  const code = 'vibrate(' + value + ')';
  return code;
};

JavaScript['cancel_vibration'] = function (_block: any) {
  const code = 'device.cancelVibration()';
  return code;
};
