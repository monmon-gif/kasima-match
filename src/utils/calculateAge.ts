/** 生年月日と基準日から満年齢を計算する。 */
export const calculateAge = (birthday: string, now = new Date()) => {
  const birthDate = new Date(`${birthday}T00:00:00`);
  let age = now.getFullYear() - birthDate.getFullYear();

  const isBeforeBirthday =
    now.getMonth() < birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() &&
      now.getDate() < birthDate.getDate());

  if (isBeforeBirthday) {
    age -= 1;
  }

  return age;
};
