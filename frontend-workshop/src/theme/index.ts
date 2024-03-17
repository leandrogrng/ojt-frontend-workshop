import { extendTheme } from "@chakra-ui/react";
import { config } from "./config";
import { styles } from "./styles";

export const theme = extendTheme({
  config,
  styles,
});

export default theme;
