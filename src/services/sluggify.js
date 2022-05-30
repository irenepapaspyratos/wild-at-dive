export default function sluggify(string) {
	return string.toLowerCase().replace(' ', '-');
}
