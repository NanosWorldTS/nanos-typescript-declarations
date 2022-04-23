//region Base Classes
/**
 * An Actor is an object which can be spawned and destroyed through Lua. Actors support 3D transformations such as translation (location), rotation, and scale.
 *
 * In nanos world, Actor is the base for several entities, and all those entities share the same Methods and Events described in this page.
 *
 * @remarks This is the base class for all Actors we have. You cannot spawn it directly.
 */
declare abstract class Actor {

    /**
     * Returns an array containing all Actors of the class this is called on (copy)
     */
    public static GetAll<T extends Actor>(): T[];

    /**
     * Returns a specific {@link Actor} of this class at an index
     *
     * @remarks The index starts at 1!
     */
    public static GetByIndex<T extends Actor>(index: number): T;

    /**
     * Returns how many {@link Actor}s of this class exist
     */
    public static GetCount(): number;

    /**
     * Returns an iterator with all Actors of this class to be used with <code>for(const [key, value] of iterator)</code>.
     * This is a more performant method than {@link GetAll}, as it will return the iterator to access the Actors directly
     * instead of creating and returning a copy of the {@link Actor}s table.
     *
     * @remarks Destroying Actors from inside a {@link GetPairs} loop will cause the iterable to change size during the process. If you want to loop-and-destroy, please use {@link GetAll}.
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
     * @remarks <i>Authority</i>: This can be accessed only on the side which <b><u>spawned</u></b> the actor.
     */
    public SetHighlightEnabled(is_enabled: boolean, index?: 0 | 1 | 2 | number): void;

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
    public GetBounds(): {Origin: Vector, BoxExtent: Vector, SphereRadius: number};

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
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
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
     */
    public Subscribe(event_name: ActorEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes all callbacks from this Event in this Actor within this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public Unsubscribe(event_name: ActorEvent, callback?: EventCallback): void;
}

type ActorEvent = string | ActorEvent_Destroy | ActorEvent_Spawn | ActorEvent_ValueChange;
//region Actor Events
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
//endregion

/**
 * A Paintable class is a base class in nanos world which provides customization for materials, exposing common functions to allow you to set custom material parameters, including loading textures from disk.
 *
 * @remarks This is a base class. You cannot spawn it directly.
 */
declare abstract class Paintable extends Actor {

    /**
     * Sets the material at the specified index of this Actor
     *
     * @param material_path {@link any} The new Material to apply.
     * @param index {@link number} The index to apply - -1 means all indices. Defaults to -1
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetMaterial(material_path: any, index?: number): void;

    /**
     * Sets the material at the specified index of this Actor to a {@link Canvas} object
     *
     * @param canvas {@link Canvas} The Canvas object to use as a material
     * @param index {@link number} The index to apply - -1 means all indices. Defaults to -1
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public SetMaterialFromCanvas(canvas: Canvas, index?: number): void;

    /**
     * Sets the material at the specified index of this Actor to a {@link SceneCapture} object
     *
     * @param scene_capture {@link SceneCapture} The SceneCapture object to use as a material
     * @param index {@link number} The index to apply - -1 means all indices. Defaults to -1
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public SetMaterialFromSceneCapture(scene_capture: SceneCapture, index?: number): void;

    /**
     * Sets the material at the specified index of this Actor to a {@link WebUI} object
     *
     * @param webui {@link WebUI} The WebUI object to use as a material
     * @param index {@link number} The index to apply - -1 means all indices. Defaults to -1
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public SetMaterialFromWebUI(webui: WebUI, index?: number): void;

    /**
     * Resets the material from the specified index to the original one
     *
     * @param index {@link number} The index to apply - -1 means all indices. Defaults to -1
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public ResetMaterial(index?: number): void;

    /**
     * Sets a Color parameter in this Actor’s material
     *
     * @param parameter_name {@link string} The name of the material parameter
     * @param color {@link Color} The value to set
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetMaterialColorParameter(parameter_name: string, color: Color): void;

    /**
     * Sets a Scalar parameter in this Actor's material
     *
     * For setting a parameter in an <a href="https://docs.nanos.world/docs/scripting-reference/classes/character#addskeletalmeshattached">Attachable</a>
     * mesh, use the following parameter_name pattern: attachable///[ATTACHABLE_ID]/[PARAMETER_NAME]
     *
     * @param parameter_name {@link string} The name of the material parameter
     * @param value {@link any} The value to set
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetMaterialScalarParameter(parameter_name: string, value: any): void;

    /**
     * Sets a texture parameter in this Actor's material to an image on disk
     *
     * @param parameter_name {@link string} The name of the material parameter
     * @param texture_path {@link string} The path to the texture
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetMaterialTextureParameter(parameter_name: string, texture_path: string): void;

    /**
     * Sets a Vector parameter in this Actor's material
     *
     * For setting a parameter in an <a href="https://docs.nanos.world/docs/scripting-reference/classes/character#addskeletalmeshattached">Attachable</a>
     * mesh, use the following parameter_name pattern: attachable///[ATTACHABLE_ID]/[PARAMETER_NAME]
     *
     * @param parameter_name {@link string} The name of the material parameter
     * @param vector {@link Vector} The value to set
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetMaterialVectorParameter(parameter_name: string, vector: Vector): void;

    /**
     * Overrides this Actor's Physical Material with a new one
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetPhysicsMaterial(physical_material_path: any): void;
}

/**
 * Pickables are special Actors which can be grabbed, held and used by {@link Character}s. Examples of Pickable Actor
 * are: {@link Weapon}, {@link Melee} and {@link Grenade}.
 *
 * They have special methods and events and are highlighted when looked at by a Character.
 */
declare abstract class Pickable extends Paintable {

    /**
     * Spawns and attaches a SkeletalMesh to this Pickable, the SkeletalMesh must have the same skeleton used by this Actor's mesh, and will follow all animations from it. Uses a custom ID to be used for removing it later
     *
     * @param id Unique ID to assign to the SkeletalMesh
     * @param skeletal_mesh_path SkeletalMesh asset to use
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public AddSkeletalMeshAttached(id: string, skeletal_mesh_path: string): void;

    /**
     *
     * @param id Unique ID to assign to the StaticMesh
     * @param static_mesh_path 	StaticMesh asset to use
     * @param socket Bone socket to attach to. Defaults to ""
     * @param relative_location Relative location. Defaults to Vector(0, 0, 0)
     * @param relative_rotation Relative rotation. Defaults to Rotator(0, 0, 0)
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public AddStaticMeshAttached(id: string, static_mesh_path: string, socket?: string, relative_location?: Vector, relative_rotation?: Rotator): void;

    /**
     * Pulls the usage of this Pickable (will start firing if this is a weapon)
     *
     * @param release_use_after Time in seconds to automatically release the usage (-1 will not release, 0 will release one tick after). Defaults to -1
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public PullUse(release_use_after?: number): void;

    /**
     * Releases the usage of this Pickable (will stop firing if this is a weapon)
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public ReleaseUse(): void;

    /**
     * Removes, if it exists, a SkeletalMesh from this Pickable given its custom ID
     *
     * @param id Unique ID of the SkeletalMesh to remove
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public RemoveSkeletalMeshAttached(id: string): void;

    /**
     * Removes, if it exists, a StaticMesh from this Pickable given its custom ID
     *
     * @param id Unique ID of the StaticMesh to remove
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public RemoveStaticMeshAttached(id: string): void;

    /**
     * Sets the Attachment Settings for this Pickable (how it attaches to the Character when Picking up)
     *
     * @param relative_location Relative location to the Socket
     * @param relative_rotation Relative rotation to the Socket. Defaults to Rotator(0, 0, 0)
     * @param socket Character Socket to attach. Defaults to "hand_r_socket"
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetAttachmentSettings(relative_location: Vector, relative_rotation?: Rotator, socket?: string): void;

    /**
     * Sets the crosshair material for this Pickable
     *
     * @param path Asset path to the crosshair material
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetCrosshairMaterial(path: string): void;

    /**
     * Sets if this Pickable can be grabbed
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetPickable(is_pickable: boolean): void;

    /**
     * Gets the name of the asset this Pickable uses
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetAssetName(): string;

    /**
     * Gets the Character, if it exists, that's holding this Pickable
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetHandler(): Character|undefined;

    /**
     * Subscribes for an {@link PickableEvent}
     *
     * @return The given function callback itself
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public Subscribe(event_name: PickableEvent, callback: EventCallback): EventCallback;
}

type PickableEvent = ActorEvent | PickableEvent_Drop | PickableEvent_Hit | PickableEvent_Interact
    | PickableEvent_PickUp | PickableEvent_PullUse | PickableEvent_ReleaseUse;
//region Piackable Events
/**
 * When a Character drops this Pickable
 *
 * @param self {@link Pickable} The Pickable which has been dropped
 * @param character {@link Character} The Character that dropped it
 * @param was_triggered_by_player {@link boolean} If the Player actively pressed 'G' to drop
 */
type PickableEvent_Drop = "Drop";
/**
 * When this Pickable hits something
 *
 * @param self {@link Pickable}	The Actor that was hit
 * @param impact_force {@link number} The intensity of the hit normalized by the Pickable's weight
 * @param normal_impulse {@link Vector} The impulse direction of the hit
 * @param impact_location {@link Vector}The world space location of the impact
 * @param velocity {@link Vector} The Pickable's velocity at the moment it hit
 */
type PickableEvent_Hit = "Hit";
/**
 * When a Character interacts with this Pickable (i.e. tries to pick it up)
 *
 * @param self {@link Pickable} The Pickable that was interacted with
 * @param character {@link Character} The Character that interacted with it
 *
 * @return false to prevent the interaction
 *
 * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
 */
type PickableEvent_Interact = "Interact";
/**
 * When a Character picks this up
 *
 * @param self {@link Pickable} The Pickable that was picked up
 * @param character {@link Character} The Character that picked it up
 */
type PickableEvent_PickUp = "PickUp";
/**
 * When a Character presses the use button for this Pickable (i.e. clicks left mouse button with this equipped)
 *
 * @param self {@link Pickable} The Pickable which has just been used
 * @param character {@link Character} The Character that used it
 */
type PickableEvent_PullUse = "PullUse";
/**
 * When a Character releases the use button for this Pickable (i.e. releases left mouse button with this equipped)
 *
 * @param self {@link Pickable} The Pickable which has just stopped being used
 * @param character {@link Character} The Character that stopped using it
 */
type PickableEvent_ReleaseUse = "ReleaseUse";
//endregion
//endregion

//region Classes
/**
 * A Billboard is a 2D Material that will be rendered always facing the camera.
 *
 * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Client</u></b>.
 */
declare class Billboard extends Paintable {

    /**
     * @param location Defaults to Vector(0, 0, 0)
     * @param material_asset Defaults to ""
     * @param size Defaults to Vector2D(32, 32)
     * @param size_in_screen_space Size is in Screen or World Space. Defaults to false
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about <b>material_asset</b>
     */
    public constructor(location?: Vector, material_asset?: any, size?: Vector2D, size_in_screen_space?: boolean);
}

/**
 * A Blueprint Class allows spawning any Unreal Blueprint Actor in nanos world.
 *
 * <i>Tip:</i> If your Actor Blueprint was spawned on the Server, it will be automatically synchronized with other players using the nanos world Network Authority system! It follows the same rules as all other entities!
 *
 * <i>Note:</i> Currently it is only possible to communicate in one-way with the Blueprint (Scripting -> Blueprint). We didn't find a way to have the inverse communication hopefully yet.
 *
 * @remarks <i>Authority</i>: This can be spawned on both <b><u>Client</u></b> and <b><u>Server</u></b>.
 */
declare class Blueprint extends Paintable {

    /**
     * @param location Defaults to Vector(0, 0, 0)
     * @param rotation Defaults to Rotator(0, 0, 0)
     * @param blueprint_path Defaults to ""
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about <b>blueprint_path</b>
     */
    public constructor(location?: Vector, rotation?: Rotator, blueprint_path?: any);

    /**
     * Calls a Blueprint Event or Function
     *
     * @param event_name Event or Function name
     * @param args Sequence of parameters to call
     */
    public CallBlueprintEvent(event_name: string, ...args: any[]): void;
}

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

declare class Canvas {

}

declare class Character extends Paintable {

}

declare class Database {

}

declare class Decal extends Paintable {

}

declare class File {

}

declare class Grenade extends Pickable {

}

declare class Light extends Actor {

}

declare class Melee extends Pickable {

}

declare class Particle extends Actor {

}

declare class Player {

}

declare class Prop extends Paintable {

}

declare class SceneCapture extends Actor {

}

declare class Sound extends Actor {

}

declare class StaticMesh extends Paintable {

}

declare class TextRender extends Paintable {

}

declare class Trigger extends Actor {

}

declare class Vehicle extends Paintable {

}

declare class Weapon extends Pickable {

}

declare class WebUI {

}
//endregion

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

    /**
     * @param size Defaults to 100
     * @param life_time Defaults to 5
     * @param thickness Defaults to 0
     */
    public static DrawDebugCoordinateSystem(location: Vector, rotation: Rotator, size?: number, life_time?: number, thickness?: number): void;

    /**
     * @param size Defaults to 100
     * @param color Defaults to {@link Color.RED}
     * @param life_time Defaults to 5
     * @param thickness Defaults to 0
     */
    public static DrawDebugCrosshairs(location: Vector, rotation: Rotator, size?: number, color?: Color, life_time?: number, thickness?: number): void;

    /**
     * @param arrow_size Defaults to 100
     * @param color Defaults to {@link Color.RED}
     * @param life_time Defaults to 5
     * @param thickness Defaults to 0
     */
    public static DrawDebugDirectionalArrow(start_location: Vector, end_location: Vector, arrow_size?: number, color?: Color, life_time?: number, thickness?: number): void;

    /**
     * @param color Defaults to {@link Color.RED}
     * @param life_time Defaults to 5
     * @param thickness Defaults to 0
     */
    public static DrawDebugCylinder(start_location: Vector, end_location: Vector, radius: number, segments: number, color?: Color, life_time?: number, thickness?: number): void;

    /**
     * @param color Defaults to {@link Color.RED}
     * @param life_time Defaults to 5
     * @param draw_shadow Defaults to false
     * @param font_scale Defaults to 1
     */
    public static DrawDebugString(location: Vector, text: string, color?: Color, life_time?: number, draw_shadow?: boolean, font_scale?: number): void;

    /**
     * Draws a Debug Line in the World
     *
     * @param color Defaults to {@link Color.RED}
     * @param life_time Defaults to 5
     * @param thickness Defaults to 0
     */
    public static DrawDebugLine(start_location: Vector, end_location: Vector, color?: Color, duration?: number, thickness?: number): void;

    /**
     * Draws a Debug Point in the World
     *
     * @param color Defaults to {@link Color.RED}
     * @param duration Defaults to 5
     * @param size Defaults to 10
     */
    public static DrawDebugPoint(start_position: Vector, color?: Color, duration?: number, size?: number): void;

    /**
     * Draws a Debug Line in the World
     *
     * @param color Defaults to {@link Color.RED}
     * @param duration Defaults to 5
     * @param thickness Defaults to 0
     */
    public static DrawDebugSphere(start_position: Vector, radius: number, segments: number, color?: Color, duration?: number, thickness?: number): void;

    /**
     * Transforms a 2D screen coordinates into 3D world-space location
     */
    public static DeprojectScreenToWorld(screen_position: Vector2D): {Position: Vector, Direction: Vector};

    /**
     * Transforms a 3D world-space vector into 2D screen coordinates
     */
    public static ProjectWorldToScreen(world_position: Vector): Vector2D;

    /**
     * Initializes the Discord Integration with your custom client_id
     */
    public static InitializeDiscord(client_id: number): void;

    /**
     * Sends a chat message which will display local only
     */
    public static SendChatMessage(message: string): void;

    /**
     * Configure the Chat. Anchors = (1, 1) means the location will be relative to bottom right and (0, 0) to top left.
     *
     * @param screen_location Defaults to (-25, 0)
     * @param size Defaults to (600, 250)
     * @param anchors_min Defaults to (1, 0.5)
     * @param anchors_max Defaults to (1, 0.5)
     * @param alignment Defaults to (1, 0.5)
     * @param justify Defaults to ???
     * @param show_scrollbar Defaults to true
     */
    public static SetChatConfiguration(screen_location?: Vector2D, size?: Vector2D, anchors_min?: Vector2D, anchors_max?: Vector2D, alignment?: Vector2D, justify?: boolean, show_scrollbar?: boolean): void;

    /**
     * Set if the Chat is visible or not
     */
    public static SetChatVisibility(is_visible: boolean): void;

    /**
     * Enables/Disables the default Crosshair
     */
    public static SetCrosshairEnabled(is_enabled: boolean): void;

    /**
     * Enables/Disables the Blood Screen
     */
    public static SetBloodScreenEnabled(is_enabled: boolean): void;

    /**
     * Manually sets the Blood Screen intensity
     *
     * @param intensity Between 0.0 and 1.0
     *
     * @remarks If you want the Blood Screen to do not be overridden, disable it with {@link SetBloodScreenEnabled} with <code>false</code> before
     */
    public static SetBloodScreenIntensity(intensity: number): void;

    /**
     * Loads or sets a hardware cursor from the content directory in the game
     *
     * @param hotspot Defaults to (0, 0)
     */
    public static SetHardwareCursor(cursor_shape: CursorType, cursor_path: string, hotspot?: Vector2D): void;

    /**
     * Communicates with Discord and sets a custom user status
     */
    public static SetDiscordActivity(state: string, details: string, large_image: string, large_text: string): void;

    /**
     * Toggles Local Player input
     */
    public static SetInputEnabled(enable_input: boolean): void;

    /**
     * Displays/Hides Mouse Cursor
     */
    public static SetMouseEnabled(is_enabled: boolean): void;

    /**
     * Changes the Outline Color for interactable stuff. Multiply it by 5 (or more) for having a glowing effect
     */
    public static SetOutlineColor(color: Color): void;

    /**
     * Changes the Highlight Color for highlighted actors at a specific Index. Multiply it by 5 (or more) for having a glowing effect
     */
    public static SetHighlightColor(highlight_color: Color, index: number, mode: HighlightMode): void;

    /**
     * Changes the Steam Rich Presence text
     */
    public static SetSteamRichPresence(text: string): void;

    /**
     * Sets a global value in the Client, which can be accessed from anywhere (client side)
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/scripting/entity-values">here</a> for more information
     */
    public static SetValue(key: string, value: any): void;

    /**
     * Subscribes for an {@link ClientEvent}
     *
     * @return The given function callback itself
     */
    public static Subscribe(event_name: ClientEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes from all subscribed Events in this Class and in this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     */
    public static Unsubscribe(event_name: ClientEvent, callback?: EventCallback): void;

    /**
     * Trace a ray against the world and returns a table with the first blocking hit information. Currently only
     * supports trace for {@link Character}, {@link Vehicle}, {@link StaticMesh}, {@link Weapon}, {@link Melee},
     * {@link Grenade} and {@link Prop}, more can be requested
     *
     * @param collision_channel Defaults to {@link CollisionChannel.WorldStatic}
     * @param trace_complex Defaults to false
     * @param return_entity Defaults to false
     * @param return_physical_material Defaults to false
     * @param ignored_actos Defaults to [] (empty array)
     * @param draw_debug Defaults to false
     *
     * @remarks The Trace will collide with the ObjectType (in the Collision Settings), even if the channel is ignored below
     */
    public static Trace(start_location: Vector, end_location: Vector, collision_channel?: CollisionChannel, trace_complex?: boolean, return_entity?: boolean, return_physical_material?: boolean, ignored_actos?: any[], draw_debug?: boolean): void;

    /**
     * Gets the local Player
     */
    public static GetLocalPlayer(): Player;

    /**
     * Finds random, reachable point in navigable space restricted to radius around origin (only if map has a NavMesh)
     */
    public static GetRandomReachablePointInRadius(origin: Vector, radius: number): Vector;

    /**
     * Finds random, point in navigable space restricted to Radius around Origin. Resulting location is not tested for reachability from the Origin (only if map has a NavMesh)
     */
    public static GetRandomPointInNavigableRadius(origin: Vector, radius: number): Vector;

    /**
     * Finds a Path given Start and End location (only if map has a NavMesh)
     */
    public static FindPathToLocation(start_location: Vector, end_location: Vector): ({IsValid: boolean, IsPartial: boolean, Length: number, Cost: number, PathPoints: Vector[]})[];

    /**
     * Returns the current Map
     */
    public static GetMap(): string;

    /**
     * Gets the current mouse screen location
     */
    public static GetMousePosition(): Vector2D;

    /**
     * Gets a list of Packages folder names loaded and running in the client
     *
     * @returns {string[]} A string array with packages folder names
     */
    public static GetPackages(): string[];

    /**
     * Gets the size of viewport (how much screen space the game window occupies)
     */
    public static GetViewportSize(): Vector2D;

    /**
     * Gets a value given a key
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/scripting/entity-values">here</a> for more information
     */
    public static GetValue(key: string, fallback: any): any;

    /**
     * Forces a Input Key event on Local Player
     *
     * @param key_name Key Name to input
     * @param input_event Defaults to "Which Event to input (Released/Pressed)"
     * @param amount_depressed The amount pressed. Defaults to 1
     *
     * @remarks This won't trigger any Scripting event as it bypass internal validations
     */
    public static InputKey(key_name: string, input_event?: InputEvent, amount_depressed?: number): void;

    /**
     * Gets if a key is being pressed
     */
    public static IsKeyDown(key_name: string): boolean;

    /**
     * Gets if the mouse is visible
     */
    public static IsMouseEnabled(): boolean;

    /**
     * Gets if the input is visible
     */
    public static IsInputEnabled(): boolean;
}

type EventCallback = (...args: any[]) => void;
type ClientEvent = string
    | Chat | ChatEntry | Console | KeyDown | KeyPress | KeyUp | LogEntry | MouseDown | MouseUp
    | MouseEnabled | MouseMoveX | MouseMoveY | OpenChat | CloseChat | OpenConsole | CloseConsole | Tick
    | ViewportResized | WindowFocusChanged | StreamLevelLoaded | StreamLevelUnloaded;

//region Client Events
/**
 * Called when a chat text is submitted (by LocalPlayer)
 *
 * @param text {@link string}
 *
 * @return false to prevent the message to be sent
 */
type Chat = "Chat";
/**
 * Called when a Chat Entry is received
 *
 * @param text {@link string}
 * @param sender {@link Player}
 *
 * @remarks This is also triggered when SendChatMessage is called (useful for creating your own Chat interface while still use the built-in system)
 */
type ChatEntry = "ChatEntry";
/**
 * Called when a console command is submitted
 *
 * @param text {@link string}
 */
type Console = "Console";
/**
 * A keyboard key is being pressed
 *
 * @param key_name {@link Keys}
 *
 * @return false to block it
 */
type KeyDown = "KeyDown";
/**
 * A keyboard key has been pressed
 *
 * @param key_name {@link Keys}
 *
 * @return false to block it
 */
type KeyPress = "KeyPress";
/**
 * A keyboard key has been released
 *
 * @param key_name {@link Keys}
 *
 * @return false to block it
 */
type KeyUp = "KeyUp";
/**
 * Called when a Client log is received
 *
 * @param text {@link string}
 * @param type {@link LogType}
 */
type LogEntry = "LogEntry";
/**
 * A mouse button has been pressed / is being pressed
 *
 * @param key_name {@link MouseButtons}
 * @param mouse_x {@link number}
 * @param mouse_y {@link number}
 *
 * @return false to block it
 */
type MouseDown = "MouseDown";
/**
 * A mouse button has been released
 *
 * @param key_name {@link MouseButtons}
 * @param mouse_x {@link number}
 * @param mouse_y {@link number}
 *
 * @return false to block it
 */
type MouseUp = "MouseUp";
/**
 * When mouse cursor is displayed/hidden
 *
 * @param is_enabled {@link boolean}
 */
type MouseEnabled = "MouseUp";
/**
 * Called when the mouse moves in the X axis
 *
 * @param delta {@link number}
 * @param delta_time {@link number}
 * @param num_samples {@link number}
 */
type MouseMoveX = "MouseMoveX";
/**
 * Called when the mouse moves in the Y axis
 *
 * @param delta {@link number}
 * @param delta_time {@link number}
 * @param num_samples {@link number}
 */
type MouseMoveY = "MouseMoveY";
/**
 * When player opens the chat
 */
type OpenChat = "OpenChat";
/**
 * When player closes the chat
 */
type CloseChat = "CloseChat";
/**
 * When player opens the console
 */
type OpenConsole = "OpenConsole";
/**
 * When player closes the console
 */
type CloseConsole = "CloseConsole";
/**
 * Called Every Frame. Do not abuse
 *
 * @param delta_time {@link number}
 */
type Tick = "Tick";
/**
 * Called when the screen is resized
 *
 * @param new_size {@link Vector2D} New new screen size
 */
type ViewportResized = "ViewportResized";
/**
 * Called when the game is focused/unfocused
 *
 * @param is_focused {@link boolean}
 */
type WindowFocusChanged = "WindowFocusChanged";
//endregion

/**
 * Subscribe for user-defined Events
 *
 * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
 */
declare class Events {

    /**
     * Calls an Event which will be triggered in all Local Packages
     *
     * @param event_name {@link string} The Event Name to trigger the event
     * @param args {@link any[]} Arguments to pass to the event
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public static Call(event_name: string, ...args: any[]): void;

    /**
     * Calls an Event if on Client which will be triggered in all Server Packages
     *
     * @param event_name {@link string} The Event Name to trigger the event
     * @param args {@link any[]} Arguments to pass to the event
     *
     * @remarks <i>Authority</i>: This can be accessed only on <b><u>Client</u></b>.
     */
    public static CallRemote(event_name: string, ...args: any[]): void;

    /**
     * Calls an Event if on Server which will be triggered in all Client's Packages of a specific Player
     *
     * @param event_name {@link string} The Event Name to trigger the event
     * @param player {@link Player} The remote player to send this event
     * @param args {@link any[]} Arguments to pass to the event
     *
     * @remarks <i>Authority</i>: This can be accessed only on <b><u>Server</u></b>.
     */
    public static CallRemote(event_name: string, player: Player, ...args: any[]): void;

    /**
     * Calls an Event on Server which will be triggered in all Client's Packages
     *
     * @param event_name {@link string} The Event Name to trigger the event
     * @param args {@link any[]} Arguments to pass to the event
     *
     * @remarks <i>Authority</i>: This can be accessed only on <b><u>Server</u></b>.
     */
    public static BroadcastRemote(event_name: string, ...args: any[]): void;

    /**
     * Subscribes for an user-created event which will be triggered for both local or remote* called events
     *
     * @param event_name {@link string} The Event Name to Subscribe for an event
     * @param callback {@link Callback} The callback function to execute
     *
     * @return The given function callback itself
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public static Subscribe(event_name: string, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes from all subscribed events in this Package with that event name, optionally passing the function to unsubscribe only that callback
     *
     * @param event_name {@link string} The Event Name to Unsubscribe
     * @param callback {@link Callback} The callback function to unsubscribe. Defaults to null
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public static Unsubscribe(event_name: string, callback?: EventCallback): void;
}

/**
 * HTTP Requests Interface
 *
 * @remarks <i>Authority</i>: This can be accessed only on <b><u>Server</u></b>.
 */
declare class HTTP {

    /**
     * Makes an asynchronous HTTP Request.
     *
     * The request will be made asynchronously and returned safetly in the same thread in the callback provided when it's done.
     *
     * @param uri {@link string} The main URI
     * @param endpoint {@link string} The endpoint. Defaults to "/"
     * @param method {@link HttpMethod} The <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods">HTTP method</a> to be used. Defaults to GET
     * @param data {@link any} Payload. Defaults to empty string ("")
     * @param content_type {@link string} The <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types">content type</a> of the payload. Defaults to "application/json"
     * @param compress {@link boolean} Whether or not to compress the content with gzip. Defaults to false
     * @param headers {@link any} The <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers">Headers</a> to be used. Defaults to empty object ({})
     * @param callback {@link HttpCallback} The result will be called in the format. Defaults to null
     *
     * @remarks If a request is still running when unloading packages, the server will freeze until it's finished, then the package will unload.
     */
    public static Request(uri: string, endpoint?: string, method?: HttpMethod, data?: string, content_type?: string, compress?: boolean, headers?: any, callback?: HttpCallback): void;

    /**
     * Makes a synchronous HTTP Request.
     *
     * The request will be made synchronously and will freeze the server until it's done.
     *
     * @param uri {@link string} The main URI
     * @param endpoint {@link string} The endpoint. Defaults to "/"
     * @param method {@link HttpMethod} The <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods">HTTP method</a> to be used. Defaults to GET
     * @param data {@link any} Payload. Defaults to empty string ("")
     * @param content_type {@link string} The <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types">content type</a> of the payload. Defaults to "application/json"
     * @param compress {@link boolean} Whether or not to compress the content with gzip. Defaults to false
     * @param headers {@link any} The <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers">Headers</a> to be used. Defaults to empty object ({})
     */
    public static RequestSync(uri: string, endpoint?: string, method?: HttpMethod, data?: string, content_type?: string, compress?: boolean, headers?: any): {Status: number, Data: string};
}

type HttpMethod = string | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
type HttpCallback = (status: number, data: string) => void;

/**
 * Create custom Bindings and Retrieve Input information
 *
 * @remarks <i>Authority</i>: This can be accessed only on <b><u>Client</u></b>.
 *
 * @warning This Class is <b>experimental</b>, so you can try it out and provide feedback before it's full release!
 */
declare class Input {

    /**
     * Binds a function to an Input defined using {@link Register} or from Game
     *
     * @param binding_name The KeyBinding ID
     * @param input_event Which Event to register (Released/Pressed)
     * @param callback The function to trigger
     */
    public static Bind(binding_name: string, input_event: InputEvent, callback: () => void): void;

    /**
     * Unbinds all Input functions related to that binding_name and input_event
     *
     * @param binding_name The KeyBinding ID
     * @param input_event Which Event to register (Released/Pressed)
     */
    public static Unbind(binding_name: string, input_event: InputEvent): void;

    /**
     * Registers a BindingName to a default Key
     *
     * @param binding_name The KeyBinding ID
     */
    public static Register(binding_name: string, key_name: string): void;

    /**
     * Unregisters a BindingName
     *
     * @param binding_name The KeyBinding ID
     */
    public static Unregister(binding_name: string, key_name: string): void;

    /**
     * Gets the Icon image path from a Key
     */
    public static GetKeyIcon(key_name: string): string;

    /**
     * Gets the Key given a BindingName
     */
    public static GetMappedKey(binding_name: string): string;

    /**
     * Resets all Bound functions from this Package
     */
    public static ResetBindings(): void;

    /**
     * Returns a table with all Scripting KeyBindings
     */
    public static GetScriptingKeyBindings(): KeyBinding[];

    /**
     * Returns a table with all Game KeyBindings
     */
    public static GetGameKeyBindings(): KeyBinding[];
}

type KeyBinding = {BindingName: string, KeyName: string} & {[key: string]: any};

/**
 * Class which represents the Current Package
 *
 * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
 */
declare class Package {

    /**
     * Calls an exported function from an other Package
     */
    public static Call(package_name: string, function_name: string, ...args: any[]): any;

    /**
     * Logs and formats an error message in the console in Red (the proper and nanos way)
     */
    public static Error(message: string, ...args: any[]): void;

    /**
     * 'exports' a function to be called from any other package
     */
    public static Export(function_name: string, callback: (...args: any[]) => any): void;

    /**
     * Logs and formats a message in the console (the proper and nanos way)
     */
    public static Log(message: string, ...args: any[]): void;

    /**
     * Includes new .lua files
     *
     * We currently support 5 searchers, which are looked in the following order:
     * 1. Relative to <code>current-file-path/</code>
     * 2. Relative to <code>current-package/Client/</code> or <code>current-package/Server/</code> (depending on your side)
     * 3. Relative to <code>current-package/Shared/</code>
     * 4. Relative to <code>current-package/</code>
     * 5. Relative to <code>Packages/</code>
     */
    public static Require(script_file: string): void;

    /**
     * Includes other Package in this Package
     */
    public static RequirePackage(package_name: string): void;

    /**
     * Subscribes for an Event
     *
     * @return The given function callback itself
     */
    public static Subscribe(event_name: PackageEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes from all subscribed Events in this Class and in this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     */
    public static Unsubscribe(event_name: PackageEvent, callback?: EventCallback): void;

    /**
     * Logs and formats a warning message in the console in Orange (the proper and nanos way)
     */
    public static Warn(message: string, ...args: any[]): void;

    /**
     * Sets a Persistent Value which will be saved to Disk
     */
    public static SetPersistentData(key: string, value: any): void;

    /**
     * Gets a list of all directories in this package, optionally with filters
     *
     * @param path_filter Defaults to an empty string ("")
     */
    public static GetDirectories(path_filter?: string): string|any[];

    /**
     * Gets a list of all files in this package, optionally with filters
     *
     * @param path_filter Defaults to an empty string ("")
     * @param extension_filter Defaults to an empty string ("")
     */
    public static GetFiles(path_filter?: string, extension_filter?: string): string|any[];

    /**
     * Gives the package name
     */
    public static GetName(): string;

    /**
     * Gives the package path
     */
    public static GetPath(): string;

    /**
     * Gets the package version
     */
    public static GetVersion(): string;

    /**
     * Gets all Persistent Values from the Disk
     */
    public static GetPersistentData(key: string): {[key: string]: any}|any;
}

type PackageEvent = string | Load | Unload;

//region Package Events
/**
 * Called when this package is loaded
 *
 * <i>Info:</i> The event Load is triggered differently depending on the situation:
 * - When the server starts or you run package reload all the event triggers only after ALL packages are loaded.
 * - In all other cases (package load/reload or Package.Load/Reload) the event is triggered immediately after the package is loaded/reloaded.
 */
type Load = "Load";
/**
 * Triggered when this page fails to load
 */
type Unload = "Unload";
//endregion

/**
 * Server represents all Server controls in the Server side
 *
 * @remarks <i>Authority</i>: This can be accessed only on <b><u>Server</u></b>.
 */
declare class Server {

    /**
     * Sends a chat message to everyone
     */
    public static BroadcastChatMessage(message: string): void;

    /**
     * Restarts the server in a new Map, restarts all packages and reconnects all players
     */
    public static ChangeMap(map_path: string): void;

    /**
     * Reloads a Package
     */
    public static ReloadPackage(package_folder_name: string): void;

    /**
     * Sends a chat message to {@link Player} only
     */
    public static SendChatMessage(player: Player, message: string): void;

    /**
     * Sets the description of the server, optionally overrides Config.toml
     *
     * @param persist_to_config_file Defaults to false
     */
    public static SetDescription(description: string, persist_to_config_file?: boolean): void;

    /**
     * Sets the logo of the server, optionally overrides Config.toml
     *
     * @param persist_to_config_file Defaults to false
     */
    public static SetLogo(log_url: string, persist_to_config_file?: boolean): void;

    /**
     * Sets the maximum player slots of the server, optionally overrides Config.toml
     *
     * @param persist_to_config_file Defaults to false
     */
    public static SetMaxPlayers(max_players: number, persist_to_config_file?: boolean): void;

    /**
     * Sets the name of the server, optionally overrides Config.toml
     *
     * @param persist_to_config_file Defaults to false
     */
    public static SetName(name: string, persist_to_config_file?: boolean): void;

    /**
     * Sets the password of the server, optionally overrides Config.toml
     *
     * @param persist_to_config_file Defaults to false
     */
    public static SetPassword(name: string, persist_to_config_file?: boolean): void;

    /**
     * Sets a global value in the Server, which can be accessed from anywhere (server side)
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/scripting/entity-values">here</a> for more information
     */
    public static SetValue(key: string, value: any): void;

    /**
     * Gets a value given a key
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/scripting/entity-values">here</a> for more information
     */
    public static GetValue(key: string): any;

    /**
     * Stops the server
     */
    public static Stop(): void;

    /**
     * Subscribes for an Event
     *
     * @return The given function callback itself
     */
    public static Subscribe(event_name: ServerEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes from all subscribed Events in this Class and in this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     */
    public static Unsubscribe(event_name: ServerEvent, callback?: EventCallback): void;

    /**
     * Unloads a Package
     */
    public static UnloadPackage(package_folder_name: string): void;

    /**
     * Returns the current Map
     */
    public static GetMap(): string;

    /**
     * Returns a list of the Custom Config of the current map (stored in the MAP_NAME.toml)
     */
    public static GetMapConfig(): ({[key: string]: any})[];

    /**
     * Returns a list of all Maps installed on the server
     *
     * @param only_loaded Defaults to true
     */
    public static GetMaps(only_loaded?: boolean): ({key: string, author: string, compatible_game_modes: any[]})[];

    /**
     * Returns a list of Packages folder names available in the server, optionally returns only loaded and running packages
     *
     * @param only_loaded Defaults to true
     */
    public static GetPackages(only_loaded?: boolean): string[];

    /**
     * Gets the server Version
     */
    public static GetVersion(): string;

    /**
     * Gets the server IP
     */
    public static GetIP(): string;

    /**
     * Gets the server Port
     */
    public static GetPort(): number;

    /**
     * Gets the server QueryPort
     */
    public static GetQueryPort(): number;

    /**
     * Gets the server Max Players allowed
     */
    public static GetMaxPlayers(): number;

    /**
     * Gets the server Description
     */
    public static GetDescription(): string;

    /**
     * Gets the configured Tick Rate
     */
    public static GetTickRate(): number;

    /**
     * Gets if the server is announced in the Master List
     */
    public static IsAnnounced(): number;
}

type ServerEvent = string
    | ServerEvent_Chat | ServerEvent_Console | ServerEvent_LogEntry | ServerEvent_Start
    | ServerEvent_PlayerConnect | ServerEvent_Stop | ServerEvent_Tick;

//region Server Events
/**
 * Called when a player types something in the chat
 *
 * @param text {@link string}
 * @param sender {@link Player}
 *
 * @return false to do not send the message
 */
type ServerEvent_Chat = "Chat";
/**
 * Called when a console command is submitted
 *
 * @param text {@link string}
 */
type ServerEvent_Console = "Console";
/**
 * Called when a Server log is received
 *
 * @param text {@link string}
 * @param type {@link LogType}
 */
type ServerEvent_LogEntry = "LogEntry";
/**
 * Server has been started
 */
type ServerEvent_Start = "Start";
/**
 * Called when a player is attempting to connect to the server
 *
 * @param IP {@link string}
 * @param player_account_ID {@link string}
 * @param player_name {@link string}
 * @param player_steam_ID {@link string}
 *
 * @return false to do not allow it
 */
type ServerEvent_PlayerConnect = "PlayerConnect";
/**
 * Server has been stopped
 */
type ServerEvent_Stop = "Stop";
/**
 * Is called every 30 ms by default. Only small operations should be performed here, otherwise this can lead the server to delays
 *
 * @param delta_time {@link number}
 */
type ServerEvent_Tick = "Tick";
//endregion

/**
 * Execute of code at specified time intervals
 *
 * <i>Info:</i> The shortest interval possible is equal to the local Tick Rate - usually at 33ms. On the Server this can vary depending on the Config.toml setting.
 *
 * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
 */
declare class Timer {

    /**
     * Executes a function, after waiting a specified number of milliseconds
     *
     * @param callback {@link EventCallback} The callback that will be executed
     * @param milliseconds {@link number} The time in milliseconds to wait before executing the function. Defaults to 0
     * @param args {@link any[]} Additional parameters to pass to the function
     *
     * @returns The timeout_id
     */
    public static SetTimeout(callback: EventCallback, milliseconds?: number, ...args: any[]): number;

    /**
     * Same as {@link SetTimeout}, but repeats the execution of the function continuously
     *
     * @param callback {@link EventCallback} The callback that will be executed
     * @param milliseconds {@link number} The time in milliseconds the timer should delay in between executions of the specified function. Defaults to 0
     * @param args {@link any[]} Additional parameters to pass to the function
     *
     * @returns The interval_id
     */
    public static SetInterval(callback: EventCallback, milliseconds?: number, ...args: any[]): number;

    /**
     * Stops the execution of the function specified in {@link SetTimeout}
     *
     * @param timeout_id {@link number} The ID value returned by {@link SetTimeout} is used as the parameter for this method
     */
    public static ClearTimeout(timeout_id: number): void;

    /**
     * Stops the execution of the function specified in {@link SetInterval}
     *
     * @param interval_id {@link number} The ID value returned by {@link SetInterval} is used as the parameter for this method
     */
    public static ClearInterval(interval_id: number): void;

    /**
     * Binds a Timer to any {@link Actor}. The timer will be automatically cleared when the {@link Actor} is destroyed
     *
     * @param timer_id {@link number} The Timer ID
     * @param actor {@link Actor} {@link Actor} to be bound
     */
    public static Bind(timer_id: number, actor: Actor): void;

    /**
     * Checks if a Timer is currently active or waiting to be triggered
     *
     * @param timer_id {@link number} The Timer ID
     */
    public static IsValid(timer_id: number): boolean;

    /**
     * Returns the time elapsed since the last tick
     *
     * @param timer_id {@link number} The Timer ID
     */
    public static GetElapsedTime(timer_id: number): number;

    /**
     * Returns the time remaining to the next tick
     *
     * @param timer_id {@link number} The Timer ID
     */
    public static GetRemainingTime(timer_id: number): number;

    /**
     * Pauses the Timer
     *
     * @param timer_id {@link number} The Timer ID
     */
    public static Pause(timer_id: number): void;

    /**
     * Resumes the Timer
     *
     * @param timer_id {@link number} The Timer ID
     */
    public static Resume(timer_id: number): void;
}

/**
 * Interaction with World and Environment elements
 *
 * <i>Info:</i> Check <a href="https://docs.nanos.world/docs/core-concepts/scripting/interacting-with-the-sun">Interacting with Sun</a> for further information and examples.
 *
 * @remarks <i>Authority</i>: This can be accessed only on <b><u>Client</u></b>.
 */
declare class World {

    /**
     * Loads a Level in runtime
     *
     * @param should_block_on_load {@link boolean} If this should be a blocking operation - the game will freeze. Defaults to false
     */
    public static LoadStreamLevel(level_name: string, should_block_on_load?: boolean): void;

    /**
     * Unloads a Level in runtime
     *
     * @param should_block_on_unload {@link boolean} If this should be a blocking operation - the game will freeze. Defaults to false
     */
    public static UnloadStreamLevel(level_name: string, should_block_on_unload?: boolean): void;

    /**
     * @param second_density Defaults to 0
     */
    public static SetFogDensity(density: number, second_density?: number): void;

    public static SetFogHeightFalloff(falloff: number): void;

    public static SetFogHeightOffset(offset: number): void;

    public static SetSunLightColor(color: Color): void;

    public static SetSkyLightIntensity(intensity: number): void;

    public static SetSkyRayleighScattering(color: Color): void;

    public static SetSunLightIntensity(intensity: number): void;

    public static SetSunTemperatureMultiplier(multiplier: number): void;

    /**
     * Set Post Process Bloom Settings
     *
     * @param intensity Defaults to 0.675
     * @param threshold Defaults to -1
     */
    public static SetPPBloom(intensity?: number, threshold?: number): void;

    /**
     * Set Post Process Chromatic Aberration Settings
     *
     * @param intensity Defaults to 0
     * @param start_offset Defaults to 0
     */
    public static SetPPChromaticAberration(intensity?: number, start_offset?: number): void;

    /**
     * Set Post Process Image Effect Settings
     *
     * @param vignette_intensity Defaults to 0.6
     * @param grain_jitter Defaults to 0
     * @param grain_intensity Defaults to 0
     */
    public static SetPPImageEffects(vignette_intensity?: number, grain_jitter?: number, grain_intensity?: number): void;

    /**
     * Set Post Process Film Settings
     *
     * @param slope Defaults to 0.8
     * @param toe Defaults to 0.55
     * @param shoulder Defaults to 0.26
     * @param black_clip Defaults to 0
     * @param white_clip Defaults to 0.3
     */
    public static SetPPFilm(slope?: number, toe?: number, shoulder?: number, black_clip?: number, white_clip?: number): void;

    /**
     * Set Post Process Saturation Colors. Use Alpha for overall Saturation intensity
     */
    public static SetPPGlobalSaturation(color: Color): void;

    /**
     * Sets a PostProcess Material
     *
     * @param material_path The Material Asset to set as Post Process
     */
    public static SetPPMaterial(material_path: string): void;

    /**
     * Removes the current Post Process Material
     */
    public static RemovePPMaterial(): void;

    /**
     * Sets the sun's angle (0-360)
     */
    public static SetSunAngle(angle: number): void;

    /**
     * Sets the sun's time speed (default: '60', which means 60 seconds in game = 1 second in real world)
     */
    public static SetSunSpeed(speed: number): void;

    /**
     * Sets the Global time of the day
     */
    public static SetTime(hours: number, minutes: number): void;

    /**
     * Sets the global Predefined Weather ({@link WeatherType})
     */
    public static SetWeather(weather: WeatherType): void;

    /**
     * Overrides all Light/Sun Actors with the NanosWorld's Official one, to be able to use the functions from this page
     */
    public static SpawnDefaultSun(): void;

    /**
     * Sets the global Wind intensity
     */
    public static SetWind(intensity: number): void;

    public static GetSunAngle(): number;

    public static GetSunSpeed(): number;

    public static GetTime(): {hours: number, minutes: number};

    public static GetWeather(): WeatherType;

    public static GetWind(): number;
}

//region World Events
/**
 * Called when a Stream Level is loaded
 *
 * @param level_name {@link string}
 */
type StreamLevelLoaded = "StreamLevelLoaded";
/**
 * Called when a Stream Level is unloaded
 *
 * @param level_name {@link string}
 */
type StreamLevelUnloaded = "StreamLevelUnloaded";
//endregion
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

declare enum CollisionType {
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

declare enum Keys {
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

declare enum MouseButtons {
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
//endregion
