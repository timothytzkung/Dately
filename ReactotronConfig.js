import Reactotron from "reactotron-react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: "Reactotron In Expo demo",
  })
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate|127.0.0.1/,
    },
    editor: false,
    errors: { veto: stackFrame => false },
    overlay: false,
  })
  .connect();

// Reactotron
//   .configure({host: "192.168.1.99:8081"}) // controls connection & communication settings
//   .useReactNative() // add all built-in react native plugins
//   .connect(); // let's connect!