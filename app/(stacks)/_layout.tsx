import { Stack } from "expo-router";

const StackRoot = (): JSX.Element => {
  return <Stack screenOptions={{headerShown: false}} />
}

export default StackRoot;