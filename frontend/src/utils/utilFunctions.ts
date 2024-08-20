export function formatEnum(enumString :string): string {
    return enumString.split('_').map((letter) => {
        return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
    }).join(enumString != "NON_FICTION" ? " " : "-");
}