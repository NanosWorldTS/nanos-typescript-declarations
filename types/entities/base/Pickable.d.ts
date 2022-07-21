import {Paintable} from "./Paintable";
import {Vector} from "../../utils/Vector";
import {Rotator} from "../../utils/Rotator";
import {EventCallback} from "../../EventCallback";
import {ActorEvent} from "./Actor";
import {Character} from "../Character";
import {Grenade} from "../Grenade";
import {Melee} from "../Melee";

/**
 * Pickables are special Actors which can be grabbed, held and used by {@link Character}s. Examples of Pickable Actor
 * are: {@link Weapon}, {@link Melee} and {@link Grenade}.
 *
 * They have special methods and events and are highlighted when looked at by a Character.
 */
export declare abstract class Pickable extends Paintable {

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
     * @param static_mesh_path    StaticMesh asset to use
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
    public GetHandler(): Character | null;

    /**
     * Subscribes for an {@link PickableEvent}
     *
     * @return The given function callback itself
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Subscribe(event_name: PickableEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes all callbacks from this Event in this Actor within this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Unsubscribe(event_name: PickableEvent, callback?: EventCallback): void;
}

type PickableEvent = ActorEvent | PickableEvent_Drop | PickableEvent_Hit | PickableEvent_Interact
    | PickableEvent_PickUp | PickableEvent_PullUse | PickableEvent_ReleaseUse;

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
 * @param self {@link Pickable}    The Actor that was hit
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
