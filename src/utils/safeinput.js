/* eslint-disable prettier/prettier */
// Функция обезопасить ввод данных

export function safeInputText(str) {
  return str.replaceAll("&", "").replaceAll("<", "").replaceAll(">", "").replaceAll('"', "");
}
