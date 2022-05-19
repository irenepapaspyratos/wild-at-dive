import PropTypes from 'prop-types';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import GlobalStyle from '../src/components/ui/basics/GlobalStyle';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<GlobalStyle />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;

MyApp.propTypes = {
	Component: PropTypes.any,
	pageProps: PropTypes.any,
};
