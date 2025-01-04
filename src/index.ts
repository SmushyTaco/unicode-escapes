/**
 * Check if a character is ASCII.
 *
 * @param character - The character to check.
 * @returns True if the character is ASCII, false otherwise.
 */
const isASCII = (character: string): boolean =>
    (character.codePointAt(0) ?? 0) <= 127;

/**
 * Encode Unicode characters in a string to Unicode escapes.
 *
 * @param string - The string to be encoded.
 * @returns The encoded string.
 *
 * @example
 * ```
 * import { encodeUnicodeEscapes } from './unicode-escapes';
 *
 * console.log(encodeUnicodeEscapes('Hello, โลก'));
 * //=> 'Hello, \u{e42}\u{e25}\u{e01}'
 * ```
 */
export function encodeUnicodeEscapes(string: string): string {
    return [...string]
        .map((character) =>
            isASCII(character)
                ? character
                : `\\u{${(character.codePointAt(0) ?? 0).toString(16)}}`
        )
        .join('');
}

/**
 * Decode Unicode escapes in a string to Unicode characters.
 *
 * @param string - The string to be decoded.
 * @returns The decoded string.
 *
 * @example
 * ```
 * import { decodeUnicodeEscapes } from './unicode-escapes';
 *
 * console.log(decodeUnicodeEscapes('Hello, \u{e42}\u{e25}\u{e01}'));
 * //=> 'Hello, โลก'
 * ```
 */
export function decodeUnicodeEscapes(string: string): string {
    return string.replaceAll(
        /\\u{([\da-f]{1,6})}|\\u([\da-f]{4})/gi,
        (_, p1, p2) => String.fromCodePoint(Number.parseInt(p1 ?? p2, 16))
    );
}
