/* eslint-disable max-len */
import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const typography = {
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`
  }
};

// CUSTOM STYLES START HERE

const customFonts = {
  /* 
  "Nunito"
  "Quicksand"
  "Big Shoulders Display"
  "Baloo Thambi 2"
  "Sansita Swashed"
  "PT Sans Caption"
  "Caveat"
  "Caveat Brush"
  */
  //   fPrimary: ``,
  //   fSecondary: ``,
  //   fBigHeading: `"Sansita Swashed"`,
  //   fHeading: `"Caveat"`,
  //   fText: `"Nunito"`,
  //   fQuote: `"Nunito"`,
  //   fIngredients: `"Nunito"`,
  //   fMono: ``
};
const customStyles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode("gray.50", "gray.900")(props),
      color: mode("gray.800", "whiteAlpha.900")(props),
      minHeight: "100dvh"
    },
    "*:focus, *[data-focus]": {},
    "*:focus-visible, *[data-focus-visible]": {}
  })
};

const themeExtensions = {
  semanticTokens: {},
  direction: {},
  // foundations start
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
    "3xl": "120em",
    "4xl": "150em",
    "5xl": "180em"
  },
  zIndices: {},
  radii: {},
  blur: {},
  colors: {},
  // typography start
  letterSpacings: {},
  lineHeights: {},
  fontWeights: {},
  fonts: {
    title: typography.fonts.heading,
    heading: typography.fonts.heading,
    quote: typography.fonts.body,
    body: typography.fonts.body,
    ingredients: typography.fonts.heading,
    mono: typography.fonts.mono
  },
  fontSizes: {},
  // typography end
  sizes: {},
  shadows: {},
  space: {},
  borders: {},
  transition: {},
  // foundations end
  components: {
    Heading: {
      variants: {}
    },
    Button: {
      baseStyle: {}
    }
  },
  styles: customStyles,
  config: {},
  layerStyles: {},
  textStyles: {}
};

const customTheme = extendTheme(
  themeExtensions,
  withDefaultColorScheme({
    colorScheme: "pink"
  })
);

export { customTheme };
