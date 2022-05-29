import GlobalStyle from "../src/components/ui/Global/GlobalStyle"

export const decorators = [
  (Story) => {
    return (
      <>
     <GlobalStyle />
        <Story />
      </>
    );
  },
];