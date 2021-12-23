import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    textInverted: "white",
    primary: "#0366d6",
    appBar: "#24292e",
    appBarText: "#f1f4f6",
    repositoryItemSeparator: "#e1e5e8",
    errorColor: "#d73a4a",
    blue: "#0463d8"
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System"
    }),
  },
  fontWeights: {
    light: "300",
    normal: "400",
    bold: "700",
  },
};

export default theme;