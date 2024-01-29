import { useRecoilValue } from "recoil";

import { appointmentsDateState } from "../state/atoms";

export default function dispDate() {
  const today = useRecoilValue(appointmentsDateState);
  const day = String(today.getDate()).padStart(2, '0')
  const monthIndex = today.getMonth();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day} ${monthNames[monthIndex]}`
}