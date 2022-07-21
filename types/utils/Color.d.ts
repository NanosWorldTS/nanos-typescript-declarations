/**
 * A color composed of components (R, G, B, A) with floating point precision.
 *
 * @remarks This structure is Open Sourced at <a href="https://github.com/nanos-world/nanos-world-lua-lib">this link</a>. Feel free to push merge requests and suggest changes!
 *
 * @customConstructor Color
 */
export declare class Color {

    /**
     * Red color percentage (0-1)
     */
    public R: number;
    /**
     * Green color percentage (0-1)
     */
    public G: number;
    /**
     * Blue color percentage (0-1)
     */
    public B: number;
    /**
     * Alpha transparency percentage (0-1)
     */
    public A: number;

    public constructor(r: number, g: number, b: number, a?: number);

    /**
     * Gets the Hexadecimal representation of this Color
     */
    public ToHEX(): string;

    /**
     * Returns a random color from Color Palette
     *
     * @noSelf
     */
    public static RandomPalette(): Color;

    /**
     * Returns a random color from all color scope
     *
     * @noSelf
     */
    public static Random(): Color;

    /**
     * Returns the color from 0-255 range values
     *
     * @noSelf
     */
    public static FromRGBA(r: number, g: number, b: number, a?: number): Color;

    /**
     * Returns a color from the CYMK format
     *
     * @noSelf
     */
    public static FromCYMK(c: number, y: number, m: number, k: number): Color;

    /**
     * Returns a color from the HSV format
     *
     * @noSelf
     */
    public static FromHSL(h: number, s: number, l: number): Color;

    /**
     * Returns a color from the HSLA format
     *
     * @noSelf
     */
    public static FromHSV(h: number, s: number, v: number): Color;

    /**
     * Returns a color from the Hexadecimal format
     *
     * @noSelf
     */
    public static FromHEX(hex: string): Color;

    public static readonly WHITE: Color;
    public static readonly BLACK: Color;
    public static readonly TRANSPARENT: Color;
    public static readonly RED: Color;
    public static readonly GREEN: Color;
    public static readonly BLUE: Color;
    public static readonly YELLOW: Color;
    public static readonly CYAN: Color;
    public static readonly MAGENTA: Color;
    public static readonly ORANGE: Color;
    public static readonly CHARTREUSE: Color;
    public static readonly AQUAMARINE: Color;
    public static readonly AZURE: Color;
    public static readonly VIOLETT: Color;
    public static readonly ROSE: Color;
}
