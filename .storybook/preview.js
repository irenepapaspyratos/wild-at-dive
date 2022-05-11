import GlobalStyle from "../src/components/ui/basics/GlobalStyle"

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