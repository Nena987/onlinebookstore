import { useEffect, useState } from "react";

export const toStandardTime = (time) => {
  return time.toFormat("y-MM-dd");
};

export const useValidatePassword = (password) => {
  const [counter, setCounter] = useState(0);
  let conditions = 0;
  let k1 = 0;
  let k2 = 0;
  let k3 = 0;
  let k4 = 0;
  let repeat = true;
  const intepunction = "!()-.?[]_~;:@#$%^&*+=";

  for (let i = 0; i < password.length; i++) {
    if (password[i] >= "A" && password[i] <= "Z") k1++;
    if (password[i] >= "a" && password[i] <= "z") k2++;
    if (password[i] >= "0" && password[i] <= "9") k3++;
    if (intepunction.includes(password[i])) k4++;
  }
  if (k1 > 1) conditions++;
  if (k2 > 1) conditions++;
  if (k3 > 0) conditions++;
  if (k4 > 0) conditions++;
  if (password.length >= 12) conditions++;

  for (let i = 0; i < password.length; i++) {
    let k5 = 0;
    for (let j = i; j < password.length; j++) {
      if (password[i] === password[j]) k5++;
    }
    if (k5 > password.length / 4) {
      repeat = false;
      break;
    }
  }
  if (repeat && password.length > 0) conditions++;

  useEffect(() => {
    setCounter(conditions);
  }, [conditions]);

  return [counter];
};
