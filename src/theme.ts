import { createSystem, defaultConfig } from "@chakra-ui/react";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          900: { value: "#1e5631" },
          800: { value: "#2d7a42" },
          200: { value: "#a3d9b1" },
          50: { value: "#e6f7e6" },
        },
      },
    },
  },
});

export default system;