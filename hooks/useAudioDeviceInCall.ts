import { voice } from "@/utils/voice";
import { AudioDevice } from "@twilio/voice-react-native-sdk";
import { useEffect, useState } from "react";

const useAudioDeviceInCall = () => {
  const [currentAudioDevices, setCurrentAudioDevices] = useState<AudioDevice []>([]);
  const [audioDeviceTypeSelected, setAudioDeviceTypeSelected] = useState<AudioDevice.Type>(AudioDevice.Type.Earpiece);

  useEffect(() => {
    const initializeAudioDevice = async () => {
      const { audioDevices } = await voice.getAudioDevices();
      setCurrentAudioDevices(audioDevices);
      await setAudioDevice(AudioDevice.Type.Earpiece);
    };

    initializeAudioDevice();
  }, []);

  const toggleAudioDevice = async () => {
    const newDeviceType =
      audioDeviceTypeSelected === AudioDevice.Type.Earpiece
        ? AudioDevice.Type.Speaker
        : AudioDevice.Type.Earpiece;
    await setAudioDevice(newDeviceType);
  };

  const setAudioDevice = async (type: AudioDevice.Type) => {
    let audioDevice = currentAudioDevices.find(
      (device) => device.type === type
    );

    await audioDevice?.select();
    setAudioDeviceTypeSelected(type);
  };

  return {
    audioDeviceTypeSelected,
    toggleAudioDevice
  }
}

export default useAudioDeviceInCall;