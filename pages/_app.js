import PropTypes from 'prop-types';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import GlobalStyle from '../src/components/ui/Global/GlobalStyle';
import Layout from '../src/components/Layout/Layout';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<GlobalStyle />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

export default MyApp;

MyApp.propTypes = {
	Component: PropTypes.any,
	pageProps: PropTypes.any,
};
