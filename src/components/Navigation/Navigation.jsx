import Link from 'next/link';
import NavigationStyle from '../ui/Navigation/Navigation.styled';

export default function Navigation() {
	return (
		<NavigationStyle>
			<Link href="/">Home</Link>
			<Link href="/list">Lists</Link>
		</NavigationStyle>
	);
}
