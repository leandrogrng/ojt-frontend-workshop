import { mode } from "@chakra-ui/theme-tools";

export const styles = {
  global: (props) => ({
    "html, body": {
      bg: mode(`grey.200`, `gray.800`)(props),
      h: "full",
      w: "full",

      "div#root": {
        bg: "transparent",
        w: "full",
        h: "full",
        minH: "100%",
        minW: "100%",
      },
    },
  }),
};

export default styles;
