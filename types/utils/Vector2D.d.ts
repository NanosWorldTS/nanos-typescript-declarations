/**
 * A Vector2D composed of components (X, Y) with floating point precision. Used mainly for HUD and Drawing on screen
 *
 * @remarks This structure is Open Sourced at <a href="https://github.com/nanos-world/nanos-world-lua-lib">this link</a>. Feel free to push merge requests and suggest changes!
 *
 * @customConstructor Vector2D
 */
export declare class Vector2D {

    /**
     * X Coordinate
     */
    public X: number;
    /**
     * Y Coordinate
     */
    public Y: number;

    public constructor(x: number, y: number);
}

declare const addVector2D: LuaAddition<Vector2D, Vector2D, Vector2D>;
declare const subVector2D: LuaSubtraction<Vector2D, Vector2D, Vector2D>;
declare const mulVector2D: LuaMultiplication<Vector2D, Vector2D, Vector2D>;
declare const divVector2D: LuaDivision<Vector2D, Vector2D, Vector2D>;
