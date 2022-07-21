import {Vector} from "./Vector";
import {Quat} from "./Quat";

/**
 * A container for rotation information. All rotation values are stored in degrees
 *
 * @remarks This structure is Open Sourced at <a href="https://github.com/nanos-world/nanos-world-lua-lib">this link</a>. Feel free to push merge requests and suggest changes!
 *
 * Rotators are internally and automatically compressed, which reduces it's size in the network up to 90%.
 * Their components are usually compressed into 1 byte each (with some exceptions which we need more precision).
 *
 * @customConstructor Rotator
 */
export declare class Rotator {

    /**
     * Rotation around the right axis (around Y axis), Looking up and down (0=Straight Ahead, +Up, -Down)
     */
    public Pitch: number;
    /**
     * Rotation around the up axis (around Z axis), Running in circles 0=East, +North, -South
     */
    public Yaw: number;
    /**
     * Rotation around the forward axis (around X axis), Tilting your head, 0=Straight, +Clockwise, -CCW
     */
    public Roll: number;

    public constructor(pitch: number, yaw: number, roll: number);

    /**
     * Get the forward (X) unit direction vector from this component, in world space
     */
    public GetForwardVector(): Vector;

    /**
     * Get the right (Y) unit direction vector from this component, in world space
     */
    public GetRightVector(): Vector;

    /**
     * Get the up (Z) unit direction vector from this component, in world space
     */
    public GetUpVector(): Vector;

    /**
     * Rotate a vector rotated by this rotator
     */
    public RotateVector(vector: Vector): Vector;

    /**
     * In-place normalize, removes all winding and creates the “shortest route” rotation
     */
    public Normalize(): void;

    /**
     *    Returns the vector rotated by the inverse of this rotator
     */
    public UnrotateVector(vector: Vector): Vector;

    /**
     * Get Rotation as a quaternion
     */
    public Quaternion(): Quat;

    /**
     * Returns a new Rotator normalized
     */
    public GetNormalized(): Rotator;

    /**
     * Checks whether rotator is near to zero within a specified tolerance
     */
    public IsNearlyZero(tolerance?: number): boolean;

    /**
     * Checks whether all components of the rotator are exactly zero
     */
    public IsZero(): boolean;

    /**
     * Generates a random rotation, with optional random roll
     *
     * @noSelf
     */
    public static Random(roll?: number): Rotator;
}

declare const addRotator: LuaAddition<Rotator, Rotator, Rotator>;
declare const subRotator: LuaSubtraction<Rotator, Rotator, Rotator>;
declare const mulRotator: LuaMultiplication<Rotator, Rotator, Rotator>;
