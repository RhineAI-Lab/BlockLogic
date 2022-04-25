import { Python } from './_common';

Python['temp_connect'] = function (block: any) {
  const str1 = Python.valueToCode(block, 'STR1', Python.ORDER_ATOMIC);
  const str2 = Python.valueToCode(block, 'STR2', Python.ORDER_ATOMIC);
  return [`${str1} + ${str2}`, 0];
};

Python['temp_expon'] = function (block: any) {
  const num1 = Python.valueToCode(block, 'NUM1', Python.ORDER_ATOMIC);
  const num2 = Python.valueToCode(block, 'NUM2', Python.ORDER_ATOMIC);
  return [`${num1} ** ${num2}`, 0];
};