
//region Static Classes
/**
 * Retrieve Assets from Asset Packs
 *
 * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
 */
declare class Assets {

    /**
     * Returns an array of tables containing information about all loaded Asset Packs
     */
    public static GetAssetPacks(): ({Name: string, Path: string, Author: string, Version: string})[];

    /**
     * Returns an array of strings containing all Animation Assets Keys from an AssetPack
     *
     * @param asset_pack_path The Asset Pack path to get the assets
     */
    public static GetAnimations(asset_pack_path: string): AssetsArray;

    /**
     * Returns an array of strings containing all Map Asset Keys from an AssetPack
     *
     * @param asset_pack_path The Asset Pack path to get the assets
     */
    public static GetMaps(asset_pack_path: string): AssetsArray;

    /**
     * Returns an array of strings containing all Material Assets Keys from an AssetPack
     *
     * @param asset_pack_path The Asset Pack path to get the assets
     */
    public static GetMaterials(asset_pack_path: string): AssetsArray;

    /**
     * Returns an array of strings containing all Particle Assets Keys from an AssetPack
     *
     * @param asset_pack_path The Asset Pack path to get the assets
     */
    public static GetParticles(asset_pack_path: string): AssetsArray;

    /**
     * Returns an array of strings containing all Sound Assets Keys from an AssetPack
     *
     * @param asset_pack_path The Asset Pack path to get the assets
     */
    public static GetSounds(asset_pack_path: string): AssetsArray;

    /**
     * Returns an array of strings containing all Skeletal Mesh Asset Keys from an AssetPack
     *
     * @param asset_pack_path The Asset Pack path to get the assets
     */
    public static GetSkeletalMeshes(asset_pack_path: string): AssetsArray;

    /**
     * Returns an array of strings containing all Static Mesh Assets Keys from an AssetPack
     *
     * @param asset_pack_path The Asset Pack path to get the assets
     */
    public static GetStaticMeshes(asset_pack_path: string): AssetsArray;

    /**
     * Returns an array of strings containing all Other Assets Keys from an AssetPack
     *
     * @param asset_pack_path The Asset Pack path to get the assets
     */
    public static GetOthers(asset_pack_path: string): AssetsArray;
}

type AssetsArray = LuaTable<number, string>;

/**
 * Static Class present on Client side
 *
 * @remarks <i>Authority</i>: This can be accessed only on <b><u>Client</u></b>.
 */
declare class Client {

    /**
     * Calls a Level Blueprint custom event (which can be added when creating levels through Unreal Engine).
     * Parameters can be concatenated to event_name like 'MyEventName 123, "MyParameter2", 456'
     */
    public static CallLevelBlueprintEvent(event_name: string): void;

    /**
     * @param life_time Defaults to 5
     * @param thickness Defaults to 0
     */
    public static DrawDebugBox(location: Vector, extent: Vector, rotation: Rotator, color: Color, life_time?: number, thickness?: number): void;
}
//endregion

//region Utility Classes
/**
 * A color composed of components (R, G, B, A) with floating point precision.
 *
 * @remarks This structure is Open Sourced at <a href="https://github.com/nanos-world/nanos-world-lua-lib">this link</a>. Feel free to push merge requests and suggest changes!
 */
declare class Color {

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
     * Returns a random color from Color Palette
     */
    public static RandomPalette(): Color;

    /**
     * Returns a random color from all color scope
     */
    public static Random(): Color;

    /**
     * Returns the color from 0-255 range values
     */
    public static FromRGBA(r: number, g: number, b: number, a?: number): Color;

    /**
     * Returns a color from the CYMK format
     */
    public static FromCYMK(c: number, y: number, m: number, k: number): Color;

    /**
     * Returns a color from the HSV format
     */
    public static FromHSL(h: number, s: number, l: number): Color;

    /**
     * Returns a color from the HSLA format
     */
    public static FromHSV(h: number, s: number, v: number): Color;

    /**
     * Returns a color from the Hexadecimal format
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

/**
 * A table containing useful and aux Math functions.
 *
 * @remarks This structure is Open Sourced at <a href="https://github.com/nanos-world/nanos-world-lua-lib">this link</a>. Feel free to push merge requests and suggest changes!
 */
declare class NanosMath {

    /**
     * Rounds a number
     */
    public static Round(value: number): number;

    /**
     * Clamps a number
     */
    public static Clamp(value: number, min: number, max: number): number;

    /**
     * Clamps an angle to the range of [0, 360].
     */
    public static ClampAxis(value: number): number;

    /**
     * Clamps an angle to the range of [-180, 180].
     */
    public static NormalizeAxis(value: number): number;

    /**
     * Interpolate scalar from Current to Target
     */
    public static FInterpTo(current: number, target: number, delta_time: number, interp_speed: number): number;

    /**
     * Interpolate Rotator from Current to Target
     */
    public static RInterpTo(current: Rotator, target: Rotator, delta_time: number, interp_speed: number): Rotator;

    /**
     * Interpolate Rotator from Current to Target with a constant step
     */
    public static RInterpConstantTo(current: Rotator, target: Rotator, delta_time: number, interp_speed: number): Rotator;

    /**
     * Interpolate Vector from Current to Target
     */
    public static VInterpTo(current: Vector, target: Vector, delta_time: number, interp_speed: number): Vector;

    /**
     * Interpolate Vector from Current to Target with a constant step
     */
    public static VInterpConstantTo(current: Vector, target: Vector, delta_time: number, interp_speed: number): Vector;
}

/**
 * A table containing useful and aux functions.
 *
 * @remarks This structure is Open Sourced at <a href="https://github.com/nanos-world/nanos-world-lua-lib">this link</a>. Feel free to push merge requests and suggest changes!
 */
declare class NanosUtils {

    /**
     * Dumps a table into a readable text
     *
     * @param table Table to dump
     */
    public static Dump(table: LuaTable): string;

    /**
     * Benchmarks a function performance, outputs in the console the elapsed time
     *
     * @param name Benchmark name to output
     * @param amount Amount of times to loop
     * @param callback The function to call
     * @param args The arguments of the function to call
     */
    public static Benchmark(name: string, amount: number, callback: (...args: any[]) => void, ...args: any[]): void;
}

/**
 * Floating point Quaternion that can represent a rotation about an axis in 3-D space
 *
 * @remarks This structure is Open Sourced at <a href="https://github.com/nanos-world/nanos-world-lua-lib">this link</a>. Feel free to push merge requests and suggest changes!
 */
declare class Quat {

    /**
     * The quaternion's X-component
     */
    public X: number;
    /**
     * The quaternion's Y-component
     */
    public Y: number;
    /**
     * The quaternion's Z-component
     */
    public Z: number;
    /**
     * The quaternion's W-component
     */
    public W: number;

    public constructor(x: number, y: number, z: number, w: number);

    /**
     * In place normalize this Quaternion
     */
    public Normalize(): void;

    /**
     * Get the Rotator representation of this Quaternion
     */
    public Rotator(): Rotator;
}

declare const addQuat: LuaAddition<Quat, Quat, Quat>;
declare const subQuat: LuaSubtraction<Quat, Quat, Quat>;
declare const mulQuat: LuaMultiplication<Quat, Quat, Quat>;

/**
 * A container for rotation information. All rotation values are stored in degrees
 *
 * @remarks This structure is Open Sourced at <a href="https://github.com/nanos-world/nanos-world-lua-lib">this link</a>. Feel free to push merge requests and suggest changes!
 *
 * Rotators are internally and automatically compressed, which reduces it's size in the network up to 90%.
 * Their components are usually compressed into 1 byte each (with some exceptions which we need more precision).
 */
declare class Rotator {

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
     * 	Returns the vector rotated by the inverse of this rotator
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
     */
    public static Random(roll?: number): Rotator;
}

declare const addRotator: LuaAddition<Rotator, Rotator, Rotator>;
declare const subRotator: LuaSubtraction<Rotator, Rotator, Rotator>;
declare const mulRotator: LuaMultiplication<Rotator, Rotator, Rotator>;

/**
 * A vector composed of components (X, Y, Z) with floating point precision
 *
 * @remarks This structure is Open Sourced at <a href="https://github.com/nanos-world/nanos-world-lua-lib">this link</a>. Feel free to push merge requests and suggest changes!
 *
 * Vectors are internally and automatically compressed, which reduces it's size in the network up to 90%. Some cool details:
 * - Vectors parameters in Classes Methods are usually compressed with precision of 1 decimal place (with some exceptions which we need more precision).
 * - Vectors passed in Remote Events are compressed with precision of 2 decimal places. If you need more precision, we recommend passing them as raw number instead.
 */
declare class Vector {

    /**
     * X Coordinate
     */
    public X: number;
    /**
     * Y Coordinate
     */
    public Y: number;
    /**
     * Z Coordinate
     */
    public Z: number;

    public constructor(x: number, y: number, z: number);

    /**
     * Check against another vector for equality, within specified error limits
     */
    public Equals(other: Vector, tolerance?: number): boolean;

    /**
     * Distance between two points
     */
    public Distance(other: Vector): number;

    /**
     * Squared distance between two points
     */
    public DistanceSquared(other: Vector): number;

    /**
     * Calculates normalized version of vector without checking for zero length
     */
    public GetUnsafeNormal(): Vector;

    /**
     * Gets a normalized copy of the vector, checking it is safe to do so based on the length
     */
    public GetSafeNormal(): Vector;

    /**
     * Checks whether vector is near to zero within a specified tolerance
     */
    public IsNearlyZero(tolerance?: number): boolean;

    /**
     * Checks whether all components of the vector are exactly zero
     */
    public IsZero(): boolean;

    /**
     * Normalize this vector in-place if it is larger than a given tolerance. Leaves it unchanged if not
     */
    public Normalize(): boolean;

    /**
     * Get the length (magnitude) of this vector
     */
    public Size(): number;

    /**
     * Get the squared length of this vector
     */
    public SizeSquared(): number;

    /**
     * Returns the orientation corresponding to the direction in which the vector points
     */
    public Rotation(): Rotator;
}

declare const addVector: LuaAddition<Vector, Vector, Vector>;
declare const subVector: LuaSubtraction<Vector, Vector, Vector>;
declare const mulVector: LuaMultiplication<Vector, Vector, Vector>;
declare const divVector: LuaDivision<Vector, Vector, Vector>;
declare const powVector: LuaPower<Vector, Vector, Vector>;

/**
 * A Vector2D composed of components (X, Y) with floating point precision. Used mainly for HUD and Drawing on screen
 *
 * @remarks This structure is Open Sourced at <a href="https://github.com/nanos-world/nanos-world-lua-lib">this link</a>. Feel free to push merge requests and suggest changes!
 */
declare class Vector2D {

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

declare const addVector2D: LuaAddition<Vector, Vector, Vector>;
declare const subVector2D: LuaSubtraction<Vector, Vector, Vector>;
declare const mulVector2D: LuaMultiplication<Vector, Vector, Vector>;
declare const divVector2D: LuaDivision<Vector, Vector, Vector>;

//endregion

//region Enums
declare enum AimMode {
    None,
    ADS,
    ZoomedZoom,
    Zoomed,
    ZoomedFar
}

declare enum AnimationSlotType {
    FullBody,
    UpperBody,
}

declare enum AttachmentRule {
    KeepRelative,
    KeepWorld,
    SnapToTarget,
}

declare enum AttenuationType {
    Linear,
    Logarithmic,
    Inverse,
    LogReverse,
    NaturalSound
}

declare enum BlendMode {
    Opaque,
    Masked,
    Translucent,
    Additive,
    Modulate,
    AlphaComposite,
    AlphaHoldout
}

declare enum CameraMode {
    FPSTPS,
    FPSOnly,
    TPSOnly,
}

declare enum CollisionChannel {
    /**
     * WorldStatic Object Types
     */
    WorldStatic = 1 << 0,
    /**
     * WorldDynamic Object Types
     */
    WorldDynamic = 1 << 1,
    /**
     * Capsules (usually from Characters)
     */
    Pawn = 1 << 2,
    /**
     * Pickables and Props Meshes
     */
    PhysicsBody = 1 << 5,
    /**
     * Vehicles Meshes
     */
    Vehicle = 1 << 22,
    /**
     * Interactable Spheres, Damage Primitives (mainly internal use)
     */
    TracePrimitive = 1 << 16,
    /**
     * Character Mesh
     */
    Mesh = 1 << 17,
    /**
     * Foliag Meshes
     */
    Foliage = 1 << 20
}

declare enum ColisionType {
    /**
     * Blocks All
     */
    Normal,
    /**
     * 	Only Blocks Static objects
     */
    StaticOnly,
    /**
     * Doesn't Block anything
     */
    NoCollision,
    /**
     * Blocks everything but Pawns (Characters)
     */
    IgnoreOnlyPawn,
    /**
     * Automatically selects - usually will be Normal. On Props it will switch between Normal and IgnoreOnlyPawn depending on the Prop size
     */
    Auto
}

declare enum CursorType {
    None,
    Default,
    TextEditBeam,
    ResizeLeftRight,
    ResizeUpDown,
    ResizeSouthEast,
    ResizeSouthWest,
    CardinalCross,
    Crosshairs,
    Hand,
    GrabHand,
    GrabHandClosed,
    SlashedCircle,
    EyeDropper,
}

declare enum ConstraintMotion {
    Free,
    Limited,
    Locked
}

declare enum DamageType {
    Shot,
    Explosion,
    Punch,
    Fail,
    RunOverProp,
    RunOverVehicle,
    Unknown
}

declare enum DatabaseEngine {
    SQLite,
    MySQL,
    PostgreSQL,
}

declare enum DifferentialType {
    LimitedSlip_4W,
    LimitedSlip_FrontDrive,
    LimitedSlip_RearDrive,
    Open_4W,
    Open_FrontDrive,
    Open_RearDrive,
}

declare enum FallingMode {
    None,
    Jumping,
    Climbing,
    Vaulting,
    Falling,
    HighFalling,
    Parachuting,
    SkyDiving,
}

declare enum FontType {
    Roboto,
    GothicA1,
    PoiretOne,
    Oswald,
    RobotoMono,
    OpenSans,
}

declare enum GaitMode {
    None,
    Walking,
    Sprinting,
}

declare enum HighlightMode {
    Always,
    OnlyHidden,
    OnlyVisible,
}

declare enum HandlingMode {
    SingleHandedWeapon,
    DoubleHandedWeapon,
    SingleHandedMelee,
    DoubleHandedMelee,
    Throwable,
    Torch,
    Barrel,
    Box
}

declare enum InputEvent {
    Pressed,
    Released
}

declare enum LightProfile {
    None,
    Arrow_Star,
    Arrow_Up,
    Beam_01,
    Beam_02,
    Beam_03,
    Beam_04,
    Beam_05,
    Beam_06,
    Beam_07,
    Beam_08,
    Beam_LED_01,
    Beam_LED_02,
    Beam_LED_03,
    Beam_LED_04,
    Beam_LED_05,
    Beam_LED_06,
    Beam_LED_07,
    Bow,
    Capped_01,
    Capped_02,
    Shattered_01,
    Shattered_02,
    Shattered_03,
    Shattered_04,
    Shattered_05,
    SpotLight_01,
    SpotLight_02,
    SpotLight_03,
    SpotLight_04,
    Spreadout_01,
    Spreadout_02,
    Spreadout_03,
    Spreadout_04,
    Star_Bow,
    Star_Burst_01,
    Star_Burst_02,
    Star_Burst_03,
    Star_Burst_04,
    Star_Burst_05,
    Star_Burst_06,
    Star_Burst_07,
    Star_Burst_08,
    Star_X_01,
    Star_X_02,
    Wall_Boomerang,
    Wall_Inverted_V,
    Wall_Star_T,
    Wing_6,
    Wing_V_01,
    Wing_V_02,
}

declare enum LogType {
    Display,
    Warning,
    Error,
    Debug,
    Verbose,
    Scripting,
    ScriptingWarn,
    ScriptingError,
    Chat,
    WebUI,
    Success,
    Fatal,
}

declare enum LightType {
    Point,
    Spot,
    React
}

declare enum SoundType {
    SFX,
    Music,
}

declare enum SoundLoopMode {
    Default,
    Forever,
    Never,
}

declare enum StanceMod {
    None,
    Standing,
    Crouching,
    Proning,
}

declare enum SurfaceType {
    Default,
    Carpet,
    Concrete,
    Grass,
    Gravel,
    Ground,
    MetalLight,
    Plastic,
    Sand,
    Snow,
    Water,
    WoodLight,
    Flesh,
    MetalHeavy,
    WoodHeavy,
    Ice,
    Mud,
    Rock,
    Thump,
    Glass,
}

declare enum SwimmingMode {
    None,
    Surface,
    Underwater
}

declare enum TextRenderAlignCamera {
    Unaligned,
    AlignCameraRotation,
    FaceCamera,
}

declare enum TextRenderBevelType {
    Linear,
    HalfCircle,
    Convex,
    Concave,
    OneStep,
    TwoSteps,
    Engraved,
}

declare enum TextRenderHorizontalAlignment {
    Left,
    Center,
    Right,
}

declare enum TextRenderVerticalAlignment {
    Top,
    Center,
    Bottom,
    QuadTop,
}

declare enum TriggerType {
    Sphere,
    Box
}

declare enum ViewMode {
    FPS,
    TPS1,
    TPS2,
    TPS3,
    TopDown,
}

declare enum VOIPSetting {
    Local,
    Global,
    Muted
}

declare enum WeatherType {
    Clear,
    Rain,
    Cloudy,
    Thunderstorm,
}
//endregion
