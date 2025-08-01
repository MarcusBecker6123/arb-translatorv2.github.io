export function extractPlaceholders(text) {
    const regex = /{(.*?)}/g;
    let i = 0;
    const replacements = {};
    const newText = text.replace(regex, (match) => {
        const placeholder = `___PH_${i++}__`;
        replacements[placeholder] = match;
        return placeholder;
    });
    return { newText, replacements };
}
export function restorePlaceholders(text, replacements) {
    let result = text;
    for (const [key, original] of Object.entries(replacements)) {
        result = result.replace(key, original);
    }
    return result;
}
