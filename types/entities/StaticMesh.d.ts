import {ActorEvent} from "./base/Actor";
import {EventCallback} from "../EventCallback";
import {Paintable} from "./base/Paintable";
import {Vector} from "../utils/Vector";
import {Rotator} from "../utils/Rotator";
import {CollisionType} from "../Enums";
import {Prop} from "./Prop";

/**
 * A StaticMesh entity represents a Mesh which can be spawned in the world, can't move and is more optimized for using in decorating the world.
 *
 * Static Meshes are like {@link Prop}s, but with fewer interaction options. Static Meshes are aimed to offer better performance on spawning Static "objects" in the world than Props.
 *
 * <i>Tip:</i> Automatically all StaticMeshActors present in the Level will be loaded as a StaticMesh entity in the client side.
 *
 * @remarks <i>Authority</i>: This can be spawned on both <b><u>Client</u></b> and <b><u>Server</u></b>. (if you spawn it on client, it won't be synchronized with other players).
 *
 * @customConstructor StaticMesh
 */
declare class StaticMesh extends Paintable {

    /**
     *
     * @param location Location to spawn. Defaults to Vector(0, 0, 0)
     * @param rotation Rotation to spawn. Defaults to Rotator(0, 0, 0)
     * @param asset Static Mesh Asset to use. Defaults to ""
     * @param collision_type Defaults to {@link CollisionType.Normal}
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about the Static Mesh Asset.
     */
    public constructor(location?: Vector, rotation?: Rotator, asset?: string, collision_type?: CollisionType);

    /**
     * Gets the Asset name
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetMesh(): string;

    /**
     * If this StaticMesh is from the Level
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public IsFromLevel(): boolean;

    /**
     * Subscribes for an {@link StaticMeshEvent}
     *
     * @return The given function callback itself
     *
     * @noSelf
     */
    public static Subscribe(event_name: StaticMeshEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes all callbacks from this Event in this Actor within this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Unsubscribe(event_name: StaticMeshEvent, callback?: EventCallback): void;
}

type StaticMeshEvent = ActorEvent | StaticMesh_TakeDamage;
/**
 * When a StaticMesh takes Damage
 *
 * @param self {@link StaticMesh}
 * @param damage {@link number}
 * @param bone {@link string} Damaged bone
 * @param type {@link DamageType} Damage Type
 * @param from_direction {@link Vector} Direction of the damage relative to the damaged actor
 * @param instigator {@link Character} The Character which caused the damage
 * @param causer {@link any} The any which caused the damage
 */
type StaticMesh_TakeDamage = "TakeDamage";
