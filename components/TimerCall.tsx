import { timeFormater } from "@/utils/timeFormater";
import { useEffect, useState } from "react";
import { Text } from "react-native";

interface TimerCallProps {
  callActive: boolean;
}

const TimerCall = ({ callActive }: TimerCallProps): JSX.Element => {
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  useEffect(() => {
    if (callActive) {
      let timer = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [callActive]);

  return <Text>Time in call: {timeFormater(secondsElapsed)}</Text>;
};

export default TimerCall;
