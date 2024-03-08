import { mode } from "@chakra-ui/theme-tools";

export const styles = {
  global: (props) => ({
    "html, body": {
      bg: mode(`gray.200`, `gray.800`)(props),
      h: "full",
      w: "full",
      //fontFamily: 'Archivo ExtraBold',
      "div#root": {
        bg: "transparent",
        w: "inherit",
        h: "inherit",
        minH: "100%",
        minW: "100vw",
        p: [2, 2, 8],
        //fontFamily: 'Archivo ExtraBold'
      },
    },
  }),
};

export default styles;
