import { sanitizeKeywords } from '@/utils/search'

const data = [
    ["", ""],
    ["apple", "apple"],
    ["apple red", "apple_red"],
    ["grade c", "grade c"],
]

test.each(data)("sanitize `%s` to `%s`", (keywords, sanitized) => {
    expect(sanitizeKeywords(keywords)).toEqual(sanitized)
})
