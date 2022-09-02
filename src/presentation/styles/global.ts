import { globalCss } from "@stitches/react";
import { createStitches } from "@stitches/react";

export const GlobaStyles = globalCss({
  "*": {
    boxSizing: "border-box",
    margin: "0",
    padding: 0,
  },

  body: {
    fontSize: "62.5%",
    fontFamily: "sans-serif",
    background: "linear-gradient(#00edcb, #0091e2)",
    height: "100vh",
  },
});

export const { getCssText } = createStitches();
