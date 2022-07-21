import {ActorEvent} from "./base/Actor";
import {EventCallback} from "../EventCallback";
import {Character} from "./Character";
import {Paintable} from "./base/Paintable";
import {Vector} from "../utils/Vector";
import {Rotator} from "../utils/Rotator";
import {CollisionType} from "../Enums";

/**
 * A Prop represents a Dynamic Mesh which can be spawned in the world, can be grabbed around by characters and have physics.
 *
 * <i>Note:</i> If the Prop was spawned by the Client. It will have all interactions disabled (grabbable).
 *
 * <i>Note:</i> Props smaller than radius 40 units or very thin (any side smaller than 20 units) will have CCD (Continuous Collision Detection) enabled to avoid falling through the floor or other objects. This will slightly increase the performance cost of them!
 *
 * <i>Note:</i> Props bigger than radius 200 units will have Grabbable off by default. This can be overridden with {@link SetGrabbable}.
 *
 * <i>Note:</i> Setting {@link CollisionType.Auto} on Props will make them automatically switch between {@link CollisionType.Normal} and {@link CollisionType.IgnoreOnlyPawn} if they are smaller than radius 40 units.
 *
 * @remarks <i>Authority</i>: This can be spawned on both <b><u>Client</u></b> and <b><u>Server</u></b>. (if you spawn it on client, it won't be synchronized with other players).
 *
 * @customConstructor Prop
 */
declare class Prop extends Paintable {

    /**
     * @param location Location to spawn. Defaults to Vector(0, 0, 0)
     * @param rotation Rotation to spawn. Defaults to Rotator(0, 0, 0)
     * @param asset Static Mesh Asset to use. Defaults to ""
     * @param collision_type Defaults to {@link CollisionType.Auto}
     * @param gravity_enabled Default is true.
     * @param is_grabbable Default is true.
     * @param force_no_ccd Force CCD to not be used on small Props (may cause Props passing through objects if it's kinda small). Default: false.
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about the Static Mesh Asset.
     */
    public constructor(location?: Vector, rotation?: Rotator, asset?: string, collision_type?: CollisionType, gravity_enabled?: boolean, is_grabbable?: boolean, force_no_ccd?: boolean);

    /**
     * Sets ability to Characters to Grab this Prop
     *
     * @param is_grabbable If the Prop will be able to be grabbable or not
     *
     * @remarks <i>Authority</i>: This can be accessed only on <b><u>Server</u></b>.
     */
    public SetGrabbable(is_grabbable: boolean): void;

    /**
     * Sets the Physics damping of this Prop
     *
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public SetPhysicsDamping(linear_damping: number, angular_damping: number): void;

    /**
     * Gets the Asset name
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetAssetName(): string;

    /**
     * Gets the Character (if existing) which is holding this
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetHandler(): Character;

    /**
     * Gets ability to Grab this Prop
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public IsGrabbable(): boolean;

    /**
     * Subscribes for an {@link PropEvent}
     *
     * @return The given function callback itself
     *
     * @noSelf
     */
    public static Subscribe(event_name: PropEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes all callbacks from this Event in this Actor within this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Unsubscribe(event_name: PropEvent, callback?: EventCallback): void;
}

type PropEvent =
    ActorEvent
    | PropEvent_Grab
    | PropEvent_Hit
    | PropEvent_Interact
    | PropEvent_TakeDamage
    | PropEvent_UnGrab;

/**
 * Triggered when Character grabs a Prop
 *
 * @param self {@link Prop} The prop which was Grabbed
 * @param character {@link Character} The new Grabber
 */
type PropEvent_Grab = "Grab";
/**
 * Triggered when this Prop hits something
 *
 * @param self {@link Prop} The prop which has been hit
 * @param impact_force {@link number} The intensity of the Hit normalized by the Prop's weight
 * @param normal_impulse {@link Vector} The impulse direction it hits
 * @param impact_location {@link Vector} The world 3D location of the impact
 * @param velocity {@link Vector} The Prop velocity at the moment it hits
 */
type PropEvent_Hit = "Hit";
/**
 * When a Character interacts with this Prop (i.e. try to Grab it)
 *
 * @param self {@link Prop}
 * @param character {@link Character}
 *
 * @return false to prevent it
 */
type PropEvent_Interact = "Interact";
/**
 * When Prop takes Damage
 *
 * @param self {@link Prop}
 * @param damage {@link number}
 * @param bone {@link string} Damaged bone
 * @param type {@link DamageType} Damage Type
 * @param from_direction {@link Vector} Direction of the damage relative to the damaged actor
 * @param instigator {@link Character} The Character which caused the damage
 * @param causer {@link any} The object which caused the damage
 */
type PropEvent_TakeDamage = "TakeDamage";
/**
 * Triggered when this Prop hits something
 *
 * @param self {@link Prop} The prop which has been ungrabbed
 * @param character {@link Character} The old Grabber
 */
type PropEvent_UnGrab = "UnGrab";
