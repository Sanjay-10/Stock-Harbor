export const colorTokens = {
  grey: {
    0: "#FFFFFF", // Primary color (white)
    10: "#F6F7F9", // Light grey (from #246, #247, #249)
    50: "#B2BCC8", // Supporting greyish blue (#178, #188, #200)
    100: "#C4CED8", // Another grey shade based on the image palette
    200: "#A3AEBB", // Greyish blue (supporting)
    300: "#01423A", // Accent color (dark teal #1, #50, #57)
    400: "#858585", // Default grey for text
    500: "#666666", // Slightly darker grey
    600: "#4D4D4D", // Dark grey
    700: "#333333", // Darker grey
    800: "#1A1A1A", // Very dark grey
    900: "#0A0A0A", // Black
    1000: "#000000", // Deepest black
  },
  primary: {
    50: "#F6F7F9", // Light grey (secondary)
    100: "#B2BCC8", // Light greyish blue (secondary)
    200: "#01423A", // Accent color (dark teal)
    300: "#66E6FC", // To retain some design consistency, light blue for highlights
    400: "#33DDFB", // Retaining this as a highlight blue
    500: "#00D5FA", // Retain as the main blue shade
    600: "#00A0BC", // Slightly darker blue
    700: "#01423A", // Dark teal for emphasis
    800: "#001519", // Very dark blue-green for contrast
    900: "#001519", // Same for consistency
  },
};

// MUI Theme Settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }
        : {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }),
    },

    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
