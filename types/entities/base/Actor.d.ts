import {Vector} from "../../utils/Vector";
import {Rotator} from "../../utils/Rotator";
import {AttachmentRule, CollisionType} from "../../Enums";
import {EventCallback} from "../../EventCallback";
import {Player} from "../Player";

/**
 * An Actor is an object which can be spawned and destroyed through Lua. Actors support 3D transformations such as translation (location), rotation, and scale.
 *
 * In nanos world, Actor is the base for several entities, and all those entities share the same Methods and Events described in this page.
 *
 * @remarks This is the base class for all Actors we have. You cannot spawn it directly.
 */
export declare abstract class Actor {

    /**
     * Returns an array containing all Actors of the class this is called on (copy)
     *
     * @noSelf
     */
    public static GetAll<T extends Actor>(): T[];

    /**
     * Returns a specific {@link Actor} of this class at an index
     *
     * @remarks The index starts at 1!
     *
     * @noSelf
     */
    public static GetByIndex<T extends Actor>(index: number): T;

    /**
     * Returns how many {@link Actor}s of this class exist
     *
     * @noSelf
     */
    public static GetCount(): number;

    /**
     * Returns an iterator with all Actors of this class to be used with <code>for(const [key, value] of iterator)</code>.
     * This is a more performant method than {@link GetAll}, as it will return the iterator to access the Actors directly
     * instead of creating and returning a copy of the {@link Actor}s table.
     *
     * @remarks Destroying Actors from inside a {@link GetPairs} loop will cause the iterable to change size during the process. If you want to loop-and-destroy, please use {@link GetAll}.
     *
     * @noSelf
     */
    public static GetPairs<T extends Actor>(): LuaPairsIterable<number, T>;

    /**
     * Applies a force in world world to this Actor (the force is applied client side, by, in most cases, the player closest to this Actor)
     *
     * @param force {@link Vector} Force to apply
     * @param velocity_change {@link boolean} Whether to ignore mass. Defaults to false
     *
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public AddImpulse(force: Vector, velocity_change?: boolean): void;

    /**
     * Attaches this Actor to any other Actor, optionally at a specific bone
     * - {@link AttachmentRule.KeepRelative} will keep the current relative position/rotation if already attached.
     * - {@link AttachmentRule.KeepWorld} will calculate the new relative position/rotation so the Actor stays at the same position after being attached.
     * - {@link AttachmentRule.SnapToTarget} will set the Actor to the same position/rotation as other_actor (or at the bone location) and reset its relative position/rotation to zero.
     *
     * Setting lifespan_when_detached to 0 will automatically destroy this actor when detached, setting it to 10 will destroy this after 10 seconds when detached.
     *
     * @param other {@link Actor} Other actor to attach
     * @param attachment_rule {@link AttachmentRule} How to attach. Defaults to {@link AttachmentRule.SnapToTarget}
     * @param bone_name {@link string} Which bone to attach to. Defaults to ""
     * @param lifespan_when_detached {@link number} Seconds before destroying this Actor when detached. Defaults to -1
     *
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public AttachTo(other: Actor, attachment_rule?: AttachmentRule, bone_name?: string, lifespan_when_detached?: number): void;

    /**
     * Destroys this Actor
     *
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public Destroy(): void;

    /**
     * Detaches this Actor from AttachedTo Actor
     *
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public Detach(): void;

    /**
     * Sets this Actor's collision type
     *
     * @param collision_type Collision Type
     *
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public SetCollision(collision_type: CollisionType): void;

    /**
     * Adds a permanent force to this Actor, set to Vector(0, 0, 0) to cancel
     *
     * @param force {@link Vector} Force to apply
     * @param is_local {@link boolean} Whether to apply the force at local space. Defaults to true
     *
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public SetForce(force: Vector, is_local?: boolean): void;

    /**
     * Sets whether gravity is enabled on this Actor
     *
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public SetGravityEnabled(is_enabled: boolean): void;

    /**
     * Sets whether the actor is visible or not
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetVisibility(is_visible: boolean): void;

    /**
     * Sets whether the highlight is enabled on this Actor, and which highlight index to use
     *
     * @param is_enabled {@link boolean} Whether the highlight should be enabled
     * @param index {@link number} Index to use (should be 0, 1 or 2). Defaults to 0
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public SetHighlightEnabled(is_enabled: boolean, index?: 0 | 1 | 2 | number): void;

    /**
     * Sets whether the outline is enabled on this Actor, and which outline index to use
     *
     * @param is_enabled {@link boolean} Whether the outline should be enabled
     * @param index {@link number} Index to use (should be 0, 1 or 2). Defaults to 0
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public SetOutlineEnabled(is_enabled: boolean, index?: 0 | 1 | 2 | number): void;

    /**
     * Sets the time (in seconds) before this Actor is destroyed. After this time has passed, the actor will be automatically destroyed.
     *
     * @param seconds {@link number} Seconds before being destroyed
     *
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public SetLifeSpan(seconds: number): void;

    /**
     * Sets this Actor's location in the game world
     *
     * @param vector {@link Vector} New location
     *
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public SetLocation(vector: Vector): void;

    /**
     * Sets the Player to have network authority over this Actor. This Player will be manually assigned to handle this Actor's physics and share its location with other clients. The authority assignment will still be overridden by the game automatically
     *
     * @param player {@link Player} New player which will assume the Network Authority of this Actor. Defaults to null
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/scripting/authority-concepts#network-authority">here</a> for more information
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetNetworkAuthority(player?: Player): void;

    /**
     * Sets this Actor's rotation in the game world
     *
     * @param rotation {@link Rotator} New rotation
     *
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public SetRotation(rotation: Rotator): void;

    /**
     * Sets this Actor's relative location in local space (only if this actor is attached)
     *
     * @param relative_location {@link Vector} New relative location
     *
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public SetRelativeLocation(relative_location: Vector): void;

    /**
     * Sets this Actor's relative rotation in local space (only if this actor is attached)
     *
     * @param relative_rotation {@link Rotator} New relative rotation
     *
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public SetRelativeRotation(relative_rotation: Rotator): void;

    /**
     * Sets this Actor's scale
     *
     * @param scale {@link Vector} New scale
     *
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public SetScale(scale: Vector): void;

    /**
     * Sets a value in this Actor, which can be accessed by any package (optionally sync on clients if called from server)
     *
     * @param key {@link string} Key
     * @param value {@link any} Value
     * @param sync_on_clients {@link boolean} Server side parameter, if enabled will sync this value with all clients. Defaults to false
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/scripting/entity-values">here</a> for more information
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetValue(key: string, value: any, sync_on_clients?: boolean): void;

    /**
     * Smoothly moves this actor to a location during a certain time
     *
     * @param location {@link Vector} Location to translate to
     * @param time {@link number} Time to interp from current location to target location
     * @param exp {@link number} Exponential used to smooth interp, use 0 for linear movement. Defaults to 0
     *
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public TranslateTo(location: Vector, time: number, exp?: number): void;

    /**
     * Smoothly rotates this Actor to an angle during a certain time
     *
     * @param rotation {@link Rotator} Angle to rotate to
     * @param time {@link number} Time to interp from current rotation to target rotation
     * @param exp {@link number} Exponential used to smooth interp, use 0 for linear movement. Defaults to 0
     *
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public RotateTo(rotation: Rotator, time: number, exp?: number): void;

    /**
     * Gets if this Actor is being destroyed (you can check this inside events like Drop to see if a Pickable is being dropped because it's going to be destroyed)
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public IsBeingDestroyed(): boolean;

    /**
     * Gets whether this actor is visible
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public IsVisible(): boolean;

    /**
     * Gets whether gravity is enabled on this Actor
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public IsVisible(): boolean;

    /**
     * Gets if this Actor is in water
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public IsInWater(): boolean;

    /**
     * Gets if this Actor is currently network distributed. Only actors being network distributed can have their network authority set Entities have NetworkDistributed automatically disabled when: Attached, Possessed, Grabbed, Picked Up or Driving
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public IsNetworkDistributed(): boolean;

    /**
     * Gets if this Actor is valid (i.e. wasn't destroyed and points to a valid Actor)
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public IsValid(): boolean;

    /**
     * Gets all Actors attached to this Actor
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetAttachedEntities(): Actor[];

    /**
     * Gets the Actor this Actor is attached to
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetAttachedTo(): Actor;

    /**
     * Gets this Actor's bounds
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public GetBounds(): { Origin: Vector, BoxExtent: Vector, SphereRadius: number };

    /**
     * Gets this Actor's collision type
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetCollision(): number;

    /**
     * Gets the universal network ID of this Actor (same on both client and server)
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetID(): number;

    /**
     * Gets this Actor's location in the game world
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetLocation(): Vector;

    /**
     * Gets this Actor's angle in the game world
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetRotation(): Rotator;

    /**
     * Gets this Actor's force (set by {@link SetForce})
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetForce(): Vector;

    /**
     * Gets if the LocalPlayer is currently the Network Authority of this Actor
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public HasNetworkAuthority(): boolean;

    /**
     * Gets if this Actor was spawned by the client side. Returns false if it was spawned by the Server or true if it was spawned by the client
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public HasAuthority(): boolean;

    /**
     * Gets this Actor's scale
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetScale(): Vector;

    /**
     * Gets the type of this Actor
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetType(): string;

    /**
     * Gets a value stored on this Actor at the given key
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/scripting/entity-values">here</a> for more information
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetValue(key: string, fallback: any): any;

    /**
     * Returns this Actor's current velocity
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetVelocity(): Vector;

    /**
     * Adds an Unreal Actor Tag to this Actor
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public AddActorTag(tag: string): void;

    /**
     * Remove an Unreal Actor Tag from this Actor
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public RemoveActorTag(tag: string): void;

    /**
     * Gets all Unreal Actor Tags from this Actor
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public GetActorTags(): string[];

    /**
     * Subscribes for an {@link ActorEvent}
     *
     * @return The given function callback itself
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Subscribe(event_name: ActorEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes all callbacks from this Event in this Actor within this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Unsubscribe(event_name: ActorEvent, callback?: EventCallback): void;
}

export type ActorEvent = string | ActorEvent_Destroy | ActorEvent_Spawn | ActorEvent_ValueChange;

/**
 * Triggered when an Actor is destroyed
 *
 * @param self {@link Actor} The Actor which has been destroyed
 */
type ActorEvent_Destroy = "Destroy";
/**
 * Triggered when an Actor is spawned/created
 *
 * @param self {@link Actor} The Actor which has been spawned
 */
type ActorEvent_Spawn = "Spawn";
/**
 * Triggered when an Actor has a value changed with <code>SetValue()</code>
 *
 * @param self {@link Actor} The Actor that just had a value changed
 * @param key {string} The key of the value that has changed
 * @param value {any} The new value
 */
type ActorEvent_ValueChange = "ValueChange";
