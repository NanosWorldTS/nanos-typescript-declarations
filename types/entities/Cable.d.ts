import {Paintable} from "./base/Paintable";
import {Vector} from "../utils/Vector";
import {Actor} from "./base/Actor";
import {ConstraintMotion} from "../Enums";

/**
 * A Cable represents a Physics Constraint which joins two Actors with a rope-like visual representation between them
 *
 * nanos world Cables are composed primarily of two Unreal Engine components: a Cable and a <a href="https://docs.unrealengine.com/5.0/en-US/physics-constraint-component-user-guide-in-unreal-engine/">PhysicsConstraint</a>.
 * The first is used for visual purposes only and the second one gives the effective physical effects that are applied to each end of the <a href="https://docs.unrealengine.com/5.0/en-US/API/Plugins/CableComponent/UCableComponent/">Cable</a>.
 *
 * <i>Info:</i> Cable visuals can be tweaked with {@link SetForces}, {@link SetCableSettings} and {@link SetRenderingSettings} methods. Those methods don’t have effect on the physics being applied and only have effects on the visual representation.
 * Cable physics can be tweaked with {@link SetAngularLimits} and {@link SetLinearLimits}.
 *
 * After attaching the two sides of your cable, the physics can be tweaked to affect how the constraint will affect the objects.
 *
 * <i>Tip:</i> Cables are automatically destroyed when one of the sides are detached
 *
 * <i>Tip:</i> You can find more useful information regarding physical properties of the joint in the end of this page.
 *
 * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Server</u></b>.
 *
 * @customConstructor Cable
 */
declare class Cable extends Paintable {

    /**
     * @param location Defaults to Vector(0, 0, 0)
     * @param enable_visuals Toggles the cable visuals. Defaults to true
     */
    public constructor(location?: Vector, enable_visuals?: boolean);

    /**
     * Attached the beginning of this cable to another Actor at a specific bone or relative location
     *
     * @param relative_location Defaults to Vector(0, 0, 0)
     * @param bone_name Defaults to ""
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public AttachStartTo(other: Actor, relative_location?: Vector, bone_name?: string): void;

    /**
     * Attached the end of this cable to another Actor at a specific bone or relative location
     *
     * @param relative_location Defaults to Vector(0, 0, 0)
     * @param bone_name Defaults to ""
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public AttachEndTo(other: Actor, relative_location?: Vector, bone_name?: string): void;

    /**
     * Detaches the End of this Cable
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public DetachEnd(): void;

    /**
     * Detaches the Start of this Cable
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public DetachStart(): void;

    /**
     * Set the overall settings for this cable (visuals only)
     *
     * @param length Rest length of the cable
     * @param num_segments How many segments the cable has
     * @param solver_iterations The number of solver iterations controls how 'stiff' the cable is
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetCableSettings(length: number, num_segments: number, solver_iterations: number): void;

    /**
     * Set the forces the cable has applied (visuals only)
     *
     * @param force Force vector (world space) applied to all particles in cable
     * @param gravity_scale Scaling applied to world gravity affecting this cable. Defaults to 1
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetForces(force: Vector, gravity_scale?: number): void;

    /**
     * Sets the Physics Angular Limits of this cable
     *
     * @param swing_1_motion Indicates whether the Swing1 limit is used
     * @param swing_2_motion Indicates whether the Swing2 limit is used
     * @param twist_motion Indicates whether the Twist limit is used
     * @param swing_1_limit Angle of movement along the XY plane. This defines the first symmetric angle of the cone
     * @param swing_2_limit Angle of movement along the XZ plane. This defines the second symmetric angle of the cone
     * @param twist_limit Symmetric angle of roll along the X-axis
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetAngularLimits(swing_1_motion: ConstraintMotion, swing_2_motion: ConstraintMotion, twist_motion: ConstraintMotion, swing_1_limit: number, swing_2_limit: number, twist_limit: number): void;

    /**
     * Sets the Physics Linear Limits of this cable. If use_soft_constraint is enabled, then stiffness and damping will be used, otherwise restitution will be used.
     *
     * @param x_motion Indicates the linear constraint applied along the X-axis. Free implies no constraint at all. Locked implies no movement along X is allowed. Limited implies the distance in the joint along all active axes must be less than the Distance provided
     * @param y_motion Indicates the linear constraint applied along the Y-axis. Free implies no constraint at all. Locked implies no movement along Y is allowed. Limited implies the distance in the joint along all active axes must be less than the Distance provided
     * @param z_motion Indicates the linear constraint applied along theZX-axis. Free implies no constraint at all. Locked implies no movement along Z is allowed. Limited implies the distance in the joint along all active axes must be less than the Distance provided
     * @param limit The distance allowed between between the two joint reference frames. Distance applies on all axes enabled (one axis means line, two axes implies circle, three axes implies sphere)
     * @param restitution Controls the amount of bounce when the constraint is violated. A restitution value of 1 will bounce back with the same velocity the limit was hit. A value of 0 will stop dead. Defaults to 0
     * @param use_soft_constraint Whether we want to use a soft constraint (spring). Defaults to false
     * @param stiffness Stiffness of the soft constraint. Only used when Soft Constraint is on. Defaults to 0
     * @param damping Damping of the soft constraint. Only used when Soft Constraint is on. Defaults to 0
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetLinearLimits(x_motion: ConstraintMotion, y_motion: ConstraintMotion, z_motion: ConstraintMotion, limit: number, restitution?: number, use_soft_constraint?: boolean, stiffness?: number, damping?: number): void;

    /**
     * Set the rendering settings of this cable (visuals only)
     *
     * @param width How wide the cable geometry is
     * @param num_sides Number of sides of the cable geometry
     * @param tile_material How many times to repeat the material along the length of the cable
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetRenderingSettings(width: number, num_sides: number, tile_material: number): void;

    /**
     * Gets the actor attached to Start
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetAttachedStartTo(): Actor;

    /**
     * Gets the actor attached to End
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetAttachedEndTo(): Actor;
}
