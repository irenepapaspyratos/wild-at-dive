import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {color: black}
    
    .cesium-viewer-animationContainer, .cesium-viewer-bottom, .cesium-viewer-timelineContainer {
    display: none;
    }

    .cesium-infoBox-title {
        color: white;
    }
`;

export default GlobalStyle;
