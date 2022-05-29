export default function RenderIf({ children, isTrue }) {
	return isTrue ? children : null;
}
