import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {color: black}
    
    .cesium-viewer-animationContainer, .cesium-viewer-bottom, .cesium-viewer-timelineContainer {
    display: none;
    }
`;

export default GlobalStyle;
