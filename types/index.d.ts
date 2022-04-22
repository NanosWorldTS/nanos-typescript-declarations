/**
 * @module nanos-world
 */
declare module "nanos-world" {


    //region Enums
    export enum AimMode {
        None,
        ADS,
        ZoomedZoom,
        Zoomed,
        ZoomedFar
    }

    export enum AnimationSlotType {
        FullBody,
        UpperBody,
    }

    export enum AttachmentRule {
        KeepRelative,
        KeepWorld,
        SnapToTarget,
    }

    export enum AttenuationType {
        Linear,
        Logarithmic,
        Inverse,
        LogReverse,
        NaturalSound
    }

    export enum BlendMode {
        Opaque,
        Masked,
        Translucent,
        Additive,
        Modulate,
        AlphaComposite,
        AlphaHoldout
    }

    export enum CameraMode {
        FPSTPS,
        FPSOnly,
        TPSOnly,
    }

    export enum CollisionChannel {
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

    export enum ColisionType {
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

    export enum CursorType {
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

    export enum ConstraintMotion {
        Free,
        Limited,
        Locked
    }

    export enum DamageType {
        Shot,
        Explosion,
        Punch,
        Fail,
        RunOverProp,
        RunOverVehicle,
        Unknown
    }

    export enum DatabaseEngine {
        SQLite,
        MySQL,
        PostgreSQL,
    }

    export enum DifferentialType {
        LimitedSlip_4W,
        LimitedSlip_FrontDrive,
        LimitedSlip_RearDrive,
        Open_4W,
        Open_FrontDrive,
        Open_RearDrive,
    }

    export enum FallingMode {
        None,
        Jumping,
        Climbing,
        Vaulting,
        Falling,
        HighFalling,
        Parachuting,
        SkyDiving,
    }

    export enum FontType {
        Roboto,
        GothicA1,
        PoiretOne,
        Oswald,
        RobotoMono,
        OpenSans,
    }

    export enum GaitMode {
        None,
        Walking,
        Sprinting,
    }

    export enum HighlightMode {
        Always,
        OnlyHidden,
        OnlyVisible,
    }

    export enum HandlingMode {
        SingleHandedWeapon,
        DoubleHandedWeapon,
        SingleHandedMelee,
        DoubleHandedMelee,
        Throwable,
        Torch,
        Barrel,
        Box
    }

    export enum InputEvent {
        Pressed,
        Released
    }

    export enum LightProfile {
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

    export enum LogType {
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

    export enum LightType {
        Point,
        Spot,
        React
    }

    export enum SoundType {
        SFX,
        Music,
    }

    export enum SoundLoopMode {
        Default,
        Forever,
        Never,
    }

    export enum StanceMod {
        None,
        Standing,
        Crouching,
        Proning,
    }

    export enum SurfaceType {
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

    export enum SwimmingMode {
        None,
        Surface,
        Underwater
    }

    export enum TextRenderAlignCamera {
        Unaligned,
        AlignCameraRotation,
        FaceCamera,
    }

    export enum TextRenderBevelType {
        Linear,
        HalfCircle,
        Convex,
        Concave,
        OneStep,
        TwoSteps,
        Engraved,
    }

    export enum TextRenderHorizontalAlignment {
        Left,
        Center,
        Right,
    }

    export enum TextRenderVerticalAlignment {
        Top,
        Center,
        Bottom,
        QuadTop,
    }

    export enum TriggerType {
        Sphere,
        Box
    }

    export enum ViewMode {
        FPS,
        TPS1,
        TPS2,
        TPS3,
        TopDown,
    }

    export enum VOIPSetting {
        Local,
        Global,
        Muted
    }

    export enum WeatherType {
        Clear,
        Rain,
        Cloudy,
        Thunderstorm,
    }
    //endregion
}
