import { extendTheme } from "@chakra-ui/react";
import type { ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'HeadingNowVariable', system-ui, sans-serif`,
    body: `'Inter', system-ui, sans-serif`,
  },
  styles: {
    global: () => ({
      "@font-face": {
        fontFamily: "HeadingNowVariable",
        src: `url('https://lobby.mom/awso/css/f/HeadingNowVariable.woff2') format('woff2')`,
        fontDisplay: "swap",
        fontWeight: "650",
      },
      body: {
        bg: "black",
        color: "white",
        overflowX: "hidden",
        fontFeatureSettings: "'liga' 1, 'calt' 1",
      },
      "*": {
        boxSizing: "border-box",
        WebkitUserDrag: "none",
        WebkitUserSelect: "none",
      },
      "*::before": {
        boxSizing: "border-box",
        WebkitUserDrag: "none",
        WebkitUserSelect: "none",
      },
      "*::after": {
        boxSizing: "border-box",
        WebkitUserDrag: "none",
        WebkitUserSelect: "none",
      },
      Link: {
        baseStyle: {
          textDecoration: "none",
          _hover: {
            textDecoration: "none", // Ensure it stays off on hover
          },
        },
      },
      ".no-underline": {
        textDecoration: "none !important",
      },
    }),
  },
  textStyles: {
    fortniteText: {
      color: "#fff",
      fontWeight: 650,
      lineHeight: "1.2",
      fontFamily: "HeadingNowVariable, sans-serif",
      fontVariationSettings: '"wdth" 650, "wght" 725',
      fontSize: "18px",
    },
    interText: {
      textTransform: "uppercase",
      fontWeight: 700,
      letterSpacing: "1.8px",
      fontSize: "11px",
      fontDisplay: "swap",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 650,
        borderRadius: "13px",
        lineHeight: 1.5,
        textTransform: "uppercase",
        fontFamily: "HeadingNowVariable, sans-serif",
        fontVariationSettings: '"wdth" 650, "wght" 725',
        outline: "0 solid transparent",
        outlineOffset: "10px",
        transition:
          "outline-color 0.15s ease-out, outline-offset 0.15s ease-out, outline-width 0.15s ease-out",
        _hover: {
          textDecoration: "none",
          outlineColor: "rgba(255, 255, 255, 0.8)",
          outlineOffset: "3px",
          outlineWidth: "3px",
        },
        _active: {
          transform: "scale(0.96)",
        },
        _disabled: {
          bg: "rgba(9, 11, 19, 0.38)",
          borderColor: "#1e2724",
          color: "rgba(255,255,255,0.5)",
          opacity: 1,
          cursor: "not-allowed",
          pointerEvents: "none",
          lineHeight: 1.8,
        },
      },
      variants: {
        primary: {
          bg: "#d3d2d8",
          borderColor: "#d3d2d8",
          color: "#100f17",
          fontSize: "16px",
          padding: "10px 16px 10px",
          _hover: {
            bg: "#fff",
            borderColor: "#fff",
            color: "#100f17",
          },
          _active: {
            bg: "#fff",
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: "lg",
        },
      },
    },
    Text: {
      baseStyle: {
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: 500,
      },
    },
  },
});

export default theme;
