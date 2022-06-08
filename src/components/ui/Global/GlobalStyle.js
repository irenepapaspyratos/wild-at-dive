import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: var(--color-primary-light)
    }

    :root {
    --color-primary-dark: #000a16;
    --color-primary-light: #e3efff;
      }

html {
    background-color: var(--color-primary-dark);
}
    body {
        max-width: 800px;
        margin: 0 auto;
        background-color: var(--color-primary-dark);
        font-family: 'Quicksand', sans-serif;
        font-weight: 300;
        box-sizing: border-box;
        
    }

    h1 {
        text-align: center;
        font-family: 'Alegreya Sans SC', sans-serif;
        margin-bottom: 1rem;
        font-size: 1.8rem;
    }

    h2, h3, h4, h5 {
        text-align: center;
    }

    .cesium-viewer-animationContainer, .cesium-viewer-bottom, .cesium-viewer-timelineContainer, .cesium-viewer-fullscreenContainer {
    display: none !important;
    }

    .cesium-infoBox {
        font-family: 'Quicksand', sans-serif;

        background: rgba(20, 40, 62, 0.84);
        border-color: var(--color-primary-dark);
    }
    .cesium-infoBox-title {
        color: var(--color-primary-light);
        background: rgba(20, 40, 62, 0.84);
    }

    .cesium-infoBox-description {
        background: rgba(20, 40, 62, 0.84);
    }

.cesium-button {
    background: rgba(20, 40, 62, 0.84);
    border-color: var(--color-primary-dark);
    color: var(--color-primary-light);
    fill: var(--color-primary-light);
}
 
.cesium-viewer-geocoderContainer  {
    background-color: rgba(20, 40, 62, 0.84);
    border-color: var(--color-primary-dark);
}

.cesium-geocoder-input {
    background-color: rgba(20, 40, 62, 0.84);
    border: solid, 1px, var(--color-primary-dark);
}

.cesium-geocoder-searchButton {
    background-color: rgba(20, 40, 62, 0.84);
    border: solid, 1px, var(--color-primary-dark);
}

.cesium-geocoder-searchButton:focus {
    border-color: yellow;
}

.cesium-svgPath-svg {
    color:  rgba(20, 40, 62, 0.84);
}

.cesium-baseLayerPicker-dropDown {
    background-color: rgba(20, 40, 62, 0.84);
    border: solid, 1px, var(--color-primary-dark);
}

.cesium-baseLayerPicker-choices{
    border: solid, 1px, var(--color-primary-dark);
}

.cesium-navigation-help-instructions {
    background-color: rgba(20, 40, 62, 0.84);
    border: solid, 1px, var(--color-primary-dark);
}

.cesium-navigation-button {
    background-color: rgba(20, 40, 62, 0.84);
    border: solid, 1px, var(--color-primary-dark);
}

    summary::marker {
        color: transparent;
    }

    a {
        color: var(--color-primary-light);
        margin: 1rem;
        text-decoration: none;
        line-height: 2rem;
    }

    fieldset {
        margin: 1rem;
        font-weight: bolder;
        display: flex;
        flex-direction: column;
        padding: 1rem 1rem;
        columns: 2;
        margin: 0 auto 2rem auto;
        border-radius: 2.5px;
        line-height: 1.8;
        max-width: 75vw;
    }

    .dropUp{
        width: 3rem;
        height: auto;
        position: absolute;
        bottom: 5rem;
        padding-top: 1rem;
        left: calc(50% - 1rem);
    }

    ul {
        list-style: none;
        padding-top: 1rem;
    }

    p {
        line-height: 1.8;
    }

    input[type='checkbox'] { 
        margin-right: 0.7rem;

    }




    



`;

export default GlobalStyle;
