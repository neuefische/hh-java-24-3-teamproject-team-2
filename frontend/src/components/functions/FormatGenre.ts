
export function formatGenre(genre :string): string {
    return genre.split('_').map((letter) => {
        return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
    }).join(genre != "NON_FICTION" ? " " : "-");
}