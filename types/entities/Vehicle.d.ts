import {ActorEvent} from "./base/Actor";
import {EventCallback} from "../EventCallback";
import {Character} from "./Character";
import {Vector} from "../utils/Vector";
import {Color} from "../utils/Color";
import {Rotator} from "../utils/Rotator";
import {CollisionType, DifferentialType} from "../Enums";
import {Paintable} from "./base/Paintable";

/**
 * Vehicles are 4-wheeled entities which Characters can possesses and drive.
 *
 * Any Skeletal Mesh can be used to create a Vehicle, although only Skeletal Meshes with Wheels bones can use the built-in feature of animated Wheels.
 *
 * <i><b>Caution:</b></i> Currently only 4-Wheeled vehicles are supported.
 *
 * <i><b>Caution:</b></i> Most of the functions below will reset the vehicle Physics State (automatically), which means the vehicle will stop immediately if moving.
 *
 * <i>Tip:</i> Please take a look at our Default’s Vehicle package with all built-in Vehicles already properly configured and ready to use: <a href="https://github.com/nanos-world/nanos-world-vehicles">here</a>
 *
 * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Server</u></b>.
 *
 * @customConstructor Vehicle
 */
declare class Vehicle extends Paintable {

    /**
     * @param location Defaults to Vector(0, 0, 0)
     * @param rotation Defaults to Rotator(0, 0, 0)
     * @param asset Defaults to ""
     * @param collision_type Defaults to {@link CollisionType.Normal}
     * @param gravity_enabled Defaults to true
     * @param auto_create_physics Defaults to true
     * @param auto_unflip Defaults to true
     * @param engine_sound_asset Defaults to "nanos-world::A_Vehicle_Engine_01"
     * @param horn_sound_asset Defaults to "nanos-world::A_Vehicle_Horn_Toyota"
     * @param brake_sound_asset Defaults to "nanos-world::A_Vehicle_Brake"
     * @param engine_start_sound_asset Defaults to "nanos-world::A_Car_Engine_Start"
     * @param vehicle_door_sound_asset Defaults to "nanos-world::A_Vehicle_Door"
     * @param auto_start_engine Defaults to true
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about the asset parameter.
     * @see <a href="https://docs.nanos.world/docs/scripting-reference/glossary/basic-types#specialpath">here</a> for more information about the sound assets.
     */
    public constructor(location?: Vector, rotation?: Rotator, asset?: string, collision_type?: CollisionType, gravity_enabled?: boolean, auto_create_physics?: boolean, auto_unflip?: boolean, engine_sound_asset?: string, horn_sound_asset?: string, brake_sound_asset?: string, engine_start_sound_asset?: string, vehicle_door_sound_asset?: string, auto_start_engine?: boolean);

    /**
     * Spawns and Attaches a StaticMesh into this Character in a Socket with relative Location and Rotation. Uses a custom ID to be used for removing it further
     *
     * @param static_mesh_path Defaults to ""
     * @param socket Defaults to ""
     * @param relative_location Defaults to Vector(0, 0, 0)
     * @param relative_rotation Defaults to Rotator(0, 0, 0)
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public AddStaticMeshAttached(id: string, static_mesh_path?: string, socket?: string, relative_location?: Vector, relative_rotation?: Rotator): void;

    /**
     * Starts or stops the vehicles horn
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public Horn(enable_horn: boolean): void;

    /**
     * Recreate the Vehicle Physics
     *
     * Call this after configuring the vehicle if using <code>auto_create_physics = false</code>
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public RecreatePhysics(): void;

    /**
     * Removes, if existing, a StaticMesh from this Vehicle given it's custom ID
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public RemoveStaticMeshAttached(id: string): void;

    /**
     * Removes all StaticMeshes attached
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public RemoveAllStaticMeshesAttached(): void;

    /**
     * Sets if the Engine auto starts when the driver enters the Vehicle
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetAutoStartEngine(auto_start: boolean): void;

    /**
     * Sets if the Engine is turned off/on (this will affect Lights, Sounds and ability to Throttle)
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetEngineStarted(started: boolean): void;

    /**
     * Configures the Vehicle Differential
     *
     * @param differential_type Defaults to {@link DifferentialType.LimitedSlip_4W}
     * @param front_rear_split Ratio of torque split between front and rear. >0.5 means more to front. <0.5 means more to rear (works only with 4W type). Defaults to 0.45
     * @param front_left_right_split Ratio of torque split between front-left and front-right. >0.5 means more to front-left. <0.5 means more to front-right (works only with 4W and LimitedSlip_FrontDrive). Defaults to 0.5
     * @param rear_left_right_split Ratio of torque split between rear-left and rear-right. >0.5 means more to rear-left. <0.5 means more to rear-right (works only with 4W and LimitedSlip_FrontDrive). Defaults to 0.5
     * @param center_bias Maximum allowed ratio of average front wheel rotation speed and rear wheel rotation speeds. Acceptable range: 1 .. infinite (works only with LimitedSlip_4W). Defaults to 1.3
     * @param front_bias Maximum allowed ratio of front-left and front-right wheel rotation speeds. Acceptable range: 1 .. infinite (works only with LimitedSlip_4W, LimitedSlip_FrontDrive). Defaults to 1.3
     * @param rear_bias Maximum allowed ratio of rear-left and rear-right wheel rotation speeds. Acceptable range: 1 .. infinite (works only with LimitedSlip_4W, LimitedSlip_FrontDrive). Defaults to 1.3
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetDifferentialSetup(differential_type?: DifferentialType, front_rear_split?: number, front_left_right_split?: number, rear_left_right_split?: number, center_bias?: number, front_bias?: number, rear_bias?: number): void;

    /**
     * Configures the Vehicle Engine
     *
     * @param max_rpm Maximum revolutions per minute of the engine. Defaults to 4500
     * @param moi Moment of inertia of the engine around the axis of rotation (Kgm^2). Defaults to 1
     * @param damping_rate_full_throttle Damping rate of engine when full throttle is applied (Kgm^2/s). Defaults to 0.15
     * @param d_r_zero_trt_clutch_engaged Damping rate of engine in at zero throttle when the clutch is engaged (Kgm^2/s). Defaults to 2
     * @param d_r_zero_trt_clutch_disengaged Damping rate of engine in at zero throttle when the clutch is disengaged (in neutral gear) (Kgm^2/s). Defaults to 0.35
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetEngineSetup(max_rpm?: number, moi?: number, damping_rate_full_throttle?: number, d_r_zero_trt_clutch_engaged?: number, d_r_zero_trt_clutch_disengaged?: number): void;

    /**
     * Configures the Vehicle General Settings
     *
     * @param drag_coefficient DragCoefficient of the vehicle chassis. Defaults to 0.3
     * @param throttle_input_rise_rate Rate at which the input value rises. Defaults to 6
     * @param throttle_input_fall_rate Rate at which the input value falls. Defaults to 10
     * @param brake_input_rise_rate Rate at which the input value rises. Defaults to 6
     * @param brake_input_fall_rate Rate at which the input value falls. Defaults to 10
     * @param handbrake_input_rise_rate Rate at which the input value rises. Defaults to 12
     * @param handbrake_input_fall_rate Rate at which the input value falls. Defaults to 12
     * @param steering_input_rise_rate Rate at which the input value rises. Defaults to 2.5
     * @param steering_input_fall_rate Rate at which the input value falls. Defaults to 5
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetVehicleSetup(drag_coefficient?: number, throttle_input_rise_rate?: number, throttle_input_fall_rate?: number, brake_input_rise_rate?: number, brake_input_fall_rate?: number, handbrake_input_rise_rate?: number, handbrake_input_fall_rate?: number, steering_input_rise_rate?: number, steering_input_fall_rate?: number): void;

    /**
     * Configures the Vehicle Transmission
     *
     * @param has_automatic_transmission Whether to use automatic transmission. Defaults to true
     * @param gear_switch_time Time it takes to switch gears (seconds). Defaults to 0.5
     * @param gear_auto_box_latency Minimum time it takes the automatic transmission to initiate a gear change (seconds). Defaults to 2
     * @param final_ratio The final gear ratio multiplies the transmission gear ratios. Defaults to 4
     * @param clutch_strength Strength of clutch (Kgm^2/s). Defaults to 10
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetTransmissionSetup(has_automatic_transmission?: boolean, gear_switch_time?: number, gear_auto_box_latency?: number, final_ratio?: number, clutch_strength?: number): void;

    /**
     * Configures a Vehicle Wheel
     *
     * @param shape_radius Radius of the wheel. Defaults to 30
     * @param shape_width Width of the wheel. Defaults to 10
     * @param steer_angle Steer angle in degrees for this wheel. Defaults to 70
     * @param mass Mass of this wheel. Defaults to 20
     * @param damping_rate Damping rate for this wheel (Kgm^2/s). Defaults to 0.25
     * @param lat_stiff_max_load Max normalized tire load at which the tire can deliver no more lateral stiffness no matter how much extra load is applied to the tire. Defaults to 2
     * @param lat_stiff_value How much lateral stiffness to have given lateral slip. Defaults to 17
     * @param long_stiff_value How much longitudinal stiffness to have given longitudinal slip. Defaults to 1000
     * @param suspension_force_offset Vertical offset from where suspension forces are applied (along Z-axis). Defaults to 0
     * @param suspension_max_raise How far the wheel can go above the resting position. Defaults to 10
     * @param suspension_max_drop How far the wheel can drop below the resting position. Defaults to 10
     * @param suspension_natural_frequency Oscillation frequency of suspension. Standard cars have values between 5 and 10. Defaults to 7
     * @param suspension_damping_ratio The rate at which energy is dissipated from the spring. Standard cars have values between 0.8 and 1.2. Values < 1 are more sluggish, values > 1 or more twitchy. Defaults to 1
     * @param max_brake_torque Max brake torque for this wheel. Defaults to 1500
     * @param max_handbrake_torque Max handbrake brake torque for this wheel. A handbrake should have a stronger brake torque than the brake. This will be ignored for wheels that are not affected by the handbrake. Defaults to 3000
     * @param is_affected_by_handbrake Defaults to true
     * @param offset If bone_name is specified, offset the wheel from the bone’s location. Otherwise this offsets the wheel from the vehicle’s origin. Defaults to Vector(0, 0, 0)
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetWheel(index: number, bone_name: string, shape_radius?: number, shape_width?: number, steer_angle?: number, mass?: number, damping_rate?: number, lat_stiff_max_load?: number, lat_stiff_value?: number, long_stiff_value?: number, suspension_force_offset?: number, suspension_max_raise?: number, suspension_max_drop?: number, suspension_natural_frequency?: number, suspension_damping_ratio?: number, max_brake_torque?: number, max_handbrake_torque?: number, is_affected_by_handbrake?: boolean, offset?: Vector): void;

    /**
     * Adds a Door at OffsetLocation from root which will pose the Character at SeatLocation with SeatRotation rotation. LeaveLateralOffset is where the Character will be ejected when leaving it (e.g. -150 for left door or 150 for right door)
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetDoor(seat_index: number, offset_location: Vector, seat_location: Vector, seat_rotation: Rotator, trigger_radius: number, leave_lateral_offset: number): void;

    /**
     * Configures where the Steering Wheel is located, so Characters can grab it procedurally properly
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetSteeringWheelSetup(location: Vector, radius: number): void;

    /**
     * Configures the Headlights Offset and Color.
     *
     * @param color Defaults to Color(1, 0.86, 0.5)
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetHeadlightsSetup(location: Vector, color?: Color): void;

    /**
     * Configures the Taillights Offset.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetTaillightsSetup(location: Vector): void;

    /**
     * Gets the Asset name
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetAssetName(): string;

    /**
     * Gets a passenger from a seat
     *
     * @returns {@link Character} or null if the seat is invalid or empty.
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetPassenger(seat: number): Character | null;

    /**
     * Gets all passengers
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetPassengers(): LuaTable<number, Character>;

    /**
     * Gets the current RPM
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public GetRPM(): number;

    /**
     * Gets the current Gear
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public GetGear(): number;

    /**
     * Subscribes for an {@link VehicleEvent}
     *
     * @return The given function callback itself
     *
     * @noSelf
     */
    public static Subscribe(event_name: VehicleEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes all callbacks from this Event in this Actor within this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Unsubscribe(event_name: VehicleEvent, callback?: EventCallback): void;
}

type VehicleEvent = ActorEvent | VehicleEvent_Horn | VehicleEvent_Hit | VehicleEvent_CharacterEntered
    | VehicleEvent_CharacterLeft | VehicleEvent_CharacterAttemptEnter | VehicleEvent_CharacterAttemptLeave;

/**
 * Triggered when Vehicle honks
 *
 * @param self {@link Vehicle}
 * @param is_honking {@link boolean}
 */
type VehicleEvent_Horn = "Horn";
/**
 * Triggered when Vehicle hits something
 *
 * @param self {@link Vehicle}    The Actor that was hit
 * @param impact_force {@link number} The intensity of the hit normalized by the Vehicle's weight
 * @param normal_impulse {@link Vector} The impulse direction of the hit
 * @param impact_location {@link Vector}The world space location of the impact
 * @param velocity {@link Vector} The Vehicle's velocity at the moment it hit
 */
type VehicleEvent_Hit = "Hit";
/**
 * Triggered when a Character fully enters the Vehicle
 *
 * @param self {@link Vehicle}
 * @param character {@link Character}
 * @param seat {@link number} The seat index
 */
type VehicleEvent_CharacterEntered = "CharacterEntered";
/**
 * Triggered when a Character fully leaves the Vehicle
 *
 * @param self {@link Vehicle}
 * @param character {@link Character}
 */
type VehicleEvent_CharacterLeft = "CharacterLeft";
/**
 * Triggered when a Character attempts to enter the Vehicle
 *
 * @param self {@link Vehicle}
 * @param character {@link Character}
 * @param seat {@link number} The seat index
 *
 * @return false to prevent it
 *
 * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
 */
type VehicleEvent_CharacterAttemptEnter = "CharacterAttemptEnter";
/**
 * Triggered when a Character attempts to leave the Vehicle
 *
 * @param self {@link Vehicle}
 * @param character {@link Character}
 *
 * @return false to prevent it
 *
 * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
 */
type VehicleEvent_CharacterAttemptLeave = "CharacterAttemptLeave";
