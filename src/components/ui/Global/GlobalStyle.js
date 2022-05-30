import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        color: black
    }
    
    .cesium-viewer-animationContainer, .cesium-viewer-bottom, .cesium-viewer-timelineContainer, .cesium-viewer-fullscreenContainer {
    display: none !important;
    }

    .cesium-infoBox-title {
        color: white;
    }

    a {
        color: blue;
        font-weight: bold;
        font-size: x-large;
        margin: 1rem;
    }
`;

export default GlobalStyle;
