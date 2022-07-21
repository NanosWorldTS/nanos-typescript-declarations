export declare enum AimMode {
    None,
    ADS,
    ZoomedZoom,
    Zoomed,
    ZoomedFar
}

export declare enum AnimationSlotType {
    FullBody,
    UpperBody,
}

export declare enum AttachmentRule {
    KeepRelative,
    KeepWorld,
    SnapToTarget,
}

export declare enum AttenuationFunction {
    Linear,
    Logarithmic,
    Inverse,
    LogReverse,
    NaturalSound
}

export declare enum BlendMode {
    Opaque,
    Masked,
    Translucent,
    Additive,
    Modulate,
    AlphaComposite,
    AlphaHoldout
}

export declare enum CameraMode {
    FPSTPS,
    FPSOnly,
    TPSOnly,
}

export declare enum CollisionChannel {
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

export declare enum CollisionType {
    /**
     * Blocks All
     */
    Normal,
    /**
     *    Only Blocks Static objects
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

export declare enum CursorType {
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

export declare enum ConstraintMotion {
    Free,
    Limited,
    Locked
}

export declare enum DamageType {
    Shot,
    Explosion,
    Punch,
    Fail,
    RunOverProp,
    RunOverVehicle,
    Unknown
}

export declare enum DatabaseEngine {
    SQLite,
    MySQL,
    PostgreSQL,
}

export declare enum DifferentialType {
    LimitedSlip_4W,
    LimitedSlip_FrontDrive,
    LimitedSlip_RearDrive,
    Open_4W,
    Open_FrontDrive,
    Open_RearDrive,
}

export declare enum FallingMode {
    None,
    Jumping,
    Climbing,
    Vaulting,
    Falling,
    HighFalling,
    Parachuting,
    SkyDiving,
}

export declare enum FontType {
    Roboto,
    GothicA1,
    PoiretOne,
    Oswald,
    RobotoMono,
    OpenSans,
}

export declare enum GaitMode {
    None,
    Walking,
    Sprinting,
}

export declare enum HighlightMode {
    /**
     * will always be visible, even behind walls
     */
    Always,
    /**
     * will only be visible if behind a wall
     */
    OnlyHidden,
    /**
     * will only be visible if not behind a wall
     */
    OnlyVisible,
}

export declare enum HandlingMode {
    SingleHandedWeapon,
    DoubleHandedWeapon,
    SingleHandedMelee,
    DoubleHandedMelee,
    Throwable,
    Torch,
    Barrel,
    Box
}

export declare enum InputEvent {
    Pressed,
    Released
}

export declare enum LightProfile {
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

export declare enum LogType {
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

export declare enum LightType {
    Point,
    Spot,
    React
}

export declare enum SoundType {
    SFX,
    Music,
}

export declare enum SoundLoopMode {
    Default,
    Forever,
    Never,
}

export declare enum StanceMode {
    None,
    Standing,
    Crouching,
    Proning,
}

export declare enum SurfaceType {
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

export declare enum SwimmingMode {
    None,
    Surface,
    Underwater
}

export declare enum TextRenderAlignCamera {
    Unaligned,
    AlignCameraRotation,
    FaceCamera,
}

export declare enum TextRenderBevelType {
    Linear,
    HalfCircle,
    Convex,
    Concave,
    OneStep,
    TwoSteps,
    Engraved,
}

export declare enum TextRenderHorizontalAlignment {
    Left,
    Center,
    Right,
}

export declare enum TextRenderVerticalAlignment {
    Top,
    Center,
    Bottom,
    QuadTop,
}

export declare enum TriggerType {
    Sphere,
    Box
}

export declare enum ViewMode {
    FPS,
    TPS1,
    TPS2,
    TPS3,
    TopDown,
}

export declare enum VOIPSetting {
    Local,
    Global,
    Muted
}

export declare enum WeatherType {
    Clear,
    Rain,
    Cloudy,
    Thunderstorm,
}

export declare enum Keys {
    F1 = "F1",
    F2 = "F2",
    F3 = "F3",
    F4 = "F4",
    F5 = "F5",
    F6 = "F6",
    F7 = "F7",
    F8 = "F8",
    F9 = "F9",
    F10 = "F10",
    F11 = "F11",
    F12 = "F12",
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    G = "G",
    H = "H",
    I = "I",
    J = "J",
    K = "K",
    L = "L",
    M = "M",
    N = "N",
    O = "O",
    P = "P",
    Q = "Q",
    R = "R",
    S = "S",
    T = "T",
    U = "U",
    V = "V",
    W = "W",
    X = "X",
    Y = "Y",
    Z = "Z",
    Escape = "Escape",
    Tab = "Tab",
    /**
     * Key: ~
     */
    Tilde = "Tilde",
    ScrollLock = "ScrollLock",
    Pause = "Pause",
    One = "One",
    Two = "Two",
    Three = "Three",
    Four = "Four",
    Five = "Five",
    Six = "Six",
    Seven = "Seven",
    Eight = "Eight",
    Nine = "Nine",
    Zero = "Zero",
    /**
     * Key: _
     */
    Underscore = "Underscore",
    /**
     * Key: =
     */
    Equals = "=",
    /**
     * Key: \
     */
    Backslash = "Backslash",
    /**
     * Key: [
     */
    LeftBracket = "LeftBracket",
    /**
     * Key: ]
     */
    RightBracket = "RightBracket",
    Enter = "Enter",
    CapsLock = "CapsLock",
    /**
     * Key: ;
     */
    Semicolon = "Semicolon",
    /**
     * Key: ‘
     */
    Quote = "Quote",
    LeftShift = "LeftShift",
    /**
     * Key: ,
     */
    Comma = "Comma",
    /**
     * Key: .
     */
    Period = "Period",
    /**
     * Key: /
     */
    Slash = "Slash",
    RightShift = "RightShift",
    LeftControl = "LeftControl",
    LeftAlt = "LeftAlt",
    SpaceBar = "SpaceBar",
    RightAlt = "RightAlt",
    RightControl = "RightControl",
    Left = "Left",
    Up = "Up",
    Down = "Down",
    Right = "Right",
    Home = "Home",
    End = "End",
    Insert = "Insert",
    PageUp = "PageUp",
    Delete = "Delete",
    PageDown = "PageDown",
    NumLock = "NumLock",
    /**
     * Key: Numpad /
     */
    Divide = "Divide",
    /**
     * Key: Numpad *
     */
    Multiply = "Multiply",
    /**
     * Key: Numpad -
     */
    Subtract = "Subtract",
    /**
     * Key: Numpad +
     */
    Add = "Add",
    NumPad1 = "NumPadOne",
    NumPad2 = "NumPadTwo",
    NumPad3 = "NumPadThree",
    NumPad4 = "NumPadFour",
    NumPad5 = "NumPadFive",
    NumPad6 = "NumPadSix",
    NumPad7 = "NumPadSeven",
    NumPad8 = "NumPadEight",
    NumPad9 = "NumPadNine",
    NumPad0 = "NumPadZero",
    Decimal = "Decimal",
}

export declare enum MouseButtons {
    LeftMouseButton = "LeftMouseButton",
    RightMouseButton = "RightMouseButton",
    /**
     * Primary mouse thumb button
     */
    ThumbMouseButton = "ThumbMouseButton",
    /**
     * Secondary mouse thumb button
     */
    ThumbMouseButton2 = "ThumbMouseButton2",
    /**
     * Mouse wheel scrolling up
     */
    MouseScrollUp = "MouseScrollUp",
    /**
     * Mouse wheel scrolling down
     */
    MouseScrollDown = "MouseScrollDown",
    /**
     * Mouse movement on the X axis
     */
    MouseX = "MouseX",
    /**
     * Mouse movement on the Y axis
     */
    MouseY = "MouseY",
}
