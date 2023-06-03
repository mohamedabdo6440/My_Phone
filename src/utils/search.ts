function getSeparator(word: string) {
    return word.toLowerCase() === 'grade' ? ' ' : '_'
}

export function sanitizeKeywords(keywords: string) {
    return keywords.split(" ").reduce(
        (prev: string, next: string) => prev + getSeparator(prev) + next
    )
}
