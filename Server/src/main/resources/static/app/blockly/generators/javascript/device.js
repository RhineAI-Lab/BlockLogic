"use strict";
goog.provide("Blockly.JavaScript.device");
goog.require("Blockly.JavaScript");

Blockly.JavaScript["device_width"] = function (block) {
  var code = "device.width";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_height"] = function (block) {
  var code = "device.height";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript["device_build_id"] = function (block) {
  var code = "device.buildId";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["device_broad"] = function (block) {
  var code = "device.broad";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["device_brand"] = function (block) {
  var code = "device.brand";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["device_device"] = function (block) {
  var code = "device.device";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_model"] = function (block) {
  var code = "device.model";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_product"] = function (block) {
  var code = "device.product";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_bootloader"] = function (block) {
  var code = "device.bootloader";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_hardware"] = function (block) {
  var code = "device.hardware";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_fingerprint"] = function (block) {
  var code = "device.fingerprint";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_serial"] = function (block) {
  var code = "device.serial";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_sdk_int"] = function (block) {
  var code = "device.sdkInt";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_incremental"] = function (block) {
  var code = "device.incremental";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_release"] = function (block) {
  var code = "device.release";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_base_os"] = function (block) {
  var code = "device.baseOS";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_security_patch"] = function (block) {
  var code = "device.securityPatch";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_codename"] = function (block) {
  var code = "device.codename";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_get_imei"] = function (block) {
  var code = "device.getIMEI()";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_get_android_id"] = function (block) {
  var code = "device.getAndroidId()";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["device_get_mac_address"] = function (block) {
  var code = "device.getMacAddress()";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_get_brightness"] = function (block) {
  var code = "device.getBrightness()";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_get_brightness_mode"] = function (block) {
  var code = "device.getBrightnessMode()";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["device_set_brightness"] = function (block) {
  var value = Blockly.JavaScript.valueToCode(block, "BRIGHTNESS", Blockly.JavaScript.ORDER_MEMBER) || 60;
  var code = "setBrightness(" + value + ")";
  return code;
};
Blockly.JavaScript["device_set_brightness_mode"] = function (block) {
  var value = Blockly.JavaScript.valueToCode(block, "BRIGHTNESS_MODE", Blockly.JavaScript.ORDER_MEMBER) || 0;
  var code = "setBrightnessMode(" + value + ")";
  return code;
};
Blockly.JavaScript["device_get_music_volume"] = function (block) {
  var code = "device.getMusicVolume()";
  return code;
};
Blockly.JavaScript["device_get_notification_volume"] = function (block) {
  var code = "device.getNotificationVolume()";
  return code;
};
Blockly.JavaScript["device_get_alarm_volume"] = function (block) {
  var code = "device.getAlarmVolume()";
  return code;
};
Blockly.JavaScript["device_get_music_max_volume"] = function (block) {
  var code = "device.getMusicMaxVolume()";
  return code;
};
Blockly.JavaScript["get_notification_max_volume"] = function (block) {
  var code = "device.getNotificationMaxVolume()";
  return code;
};
Blockly.JavaScript["get_alarm_max_volume"] = function (block) {
  var code = "device.getAlarmMaxVolume()";
  return code;
};
Blockly.JavaScript["device_set_music_volume"] = function (block) {
  var value = Blockly.JavaScript.valueToCode(block, "VOLUME", Blockly.JavaScript.ORDER_MEMBER) || 0;
  var code = "setMusicVolume(" + value + ")";
  return code;
};
Blockly.JavaScript["device_set_notification_volume"] = function (block) {
  var value = Blockly.JavaScript.valueToCode(block, "VOLUME", Blockly.JavaScript.ORDER_MEMBER) || 0;
  var code = "setNotificationVolume(" + value + ")";
  return code;
};
Blockly.JavaScript["device_set_alarm_volume"] = function (block) {
  var value = Blockly.JavaScript.valueToCode(block, "VOLUME", Blockly.JavaScript.ORDER_MEMBER) || 0;
  var code = "setAlarmVolume(" + value + ")";
  return code;
};

Blockly.JavaScript["get_battery"] = function (block) {
  var code = "device.getBattery()";
  return code;
};

Blockly.JavaScript["is_charging"] = function (block) {
  var code = "device.isCharging()";
  return code;
};

Blockly.JavaScript["get_total_mem"] = function (block) {
  var code = "device.getTotalMem()";
  return code;
};
Blockly.JavaScript["get_avail_mem"] = function (block) {
  var code = "device.getAvailMem()";
  return code;
};

Blockly.JavaScript["is_screen_on"] = function (block) {
  var code = "device.isScreenOn()";
  return code;
};

Blockly.JavaScript["wake_up"] = function (block) {
  var code = "device.wakeUp()";
  return code;
};

Blockly.JavaScript["wake_up_if_needed"] = function (block) {
  var code = "device.wakeUpIfNeeded()";
  return code;
};

Blockly.JavaScript["keep_screen_on"] = function (block) {
  var value = Blockly.JavaScript.valueToCode(block, "TIMEOUT", Blockly.JavaScript.ORDER_MEMBER) || 0;
  var code = "keepScreenOn(" + value + ")";
  return code;
};

Blockly.JavaScript["keep_screen_dim"] = function (block) {
  var value = Blockly.JavaScript.valueToCode(block, "TIMEOUT", Blockly.JavaScript.ORDER_MEMBER) || 0;
  var code = "keepScreenDim(" + value + ")";
  return code;
};

Blockly.JavaScript["cancel_keeping_awake"] = function (block) {
  var code = "device.cancelKeepingAwake()";
  return code;
};

Blockly.JavaScript["vibrate"] = function (block) {
  var value = Blockly.JavaScript.valueToCode(block, "TIME", Blockly.JavaScript.ORDER_MEMBER) || 0;
  var code = "vibrate(" + value + ")";
  return code;
};

Blockly.JavaScript["cancel_vibration"] = function (block) {
  var code = "device.cancelVibration()";
  return code;
};
