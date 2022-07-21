import {ActorEvent} from "./base/Actor";
import {EventCallback} from "../EventCallback";
import {Vector} from "../utils/Vector";
import {Rotator} from "../utils/Rotator";
import {CollisionType} from "../Enums";
import {Pickable} from "./base/Pickable";

/**
 * Chad Grenade
 *
 * <i>Tip:</i> nanos world provides a special Particle* called nanos-world::P_Grenade_Special which spawns different particles depending on the surface it explodes, and also if is underwater.
 *
 * *This "Particle" is just a special identifier which can only be used on Grenades!
 *
 * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Server</u></b>.
 *
 * @customConstructor Grenade
 */
export declare class Grenade extends Pickable {

    /**
     * @param location Defaults to Vector(0, 0, 0)
     * @param rotation Defaults to Rotator(0, 0, 0)
     * @param static_mesh_asset Defaults to "nanos-world::SM_Grenade_G67"
     * @param explosion_particles Defaults to "nanos-world::P_Grenade_Special"
     * @param explosion_sound Defaults to "nanos-world::A_Explosion_Large"
     * @param collision_type Defaults to {@link CollisionType.Normal}
     * @param gravity_enabled Defaults to true
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information on how to reference assets
     */
    public constructor(location?: Vector, rotation?: Rotator, static_mesh_asset?: string, explosion_particles?: string, explosion_sound?: string, collision_type?: CollisionType, gravity_enabled?: boolean);

    /**
     * Forces this grenade to Explode
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public Explode(): void;

    /**
     * Sets Damage parameters of this Grenade
     *
     * @param base_damage Max damage when inner radius. Defaults to 90
     * @param minimum_damage Min damage when outer radius. Defaults to 0
     * @param damage_inner_radius Radius which damage will be 100%. Defaults to 200
     * @param damage_outer_radius Radius which damage will be interpoled through falloff. Defaults to 1000
     * @param damage_falloff Lerp function between Max and Min damage. Defaults to 1
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetDamage(base_damage?: number, minimum_damage?: number, damage_inner_radius?: number, damage_outer_radius?: number, damage_falloff?: number): void;

    /**
     * Set Time until Explosion after thrown
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetTimeToExplode(time: number): void;

    /**
     * Set Impulse applied when throwing
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetThrowForce(force: any): void;

    /**
     * Damage at Inner Radius
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetBaseDamage(): number;

    /**
     * Radius which BaseDamage will apply proportionally
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetDamageFalloff(): number;

    /**
     * Radius which MinimumDamage will apply
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetDamageInnerRadius(): number;

    /**
     * Radius which BaseDamage will apply
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetDamageOuterRadius(): number;

    /**
     * Damage at Outer Radius
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetMinimumDamage(): number;

    /**
     * Time until Explosion
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetTimeToExplode(): number;

    /**
     * Impulse applied when throwing
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetThrowForce(): any;

    /**
     * Subscribes for an {@link GrenadeEvent}
     *
     * @return The given function callback itself
     *
     * @noSelf
     */
    public static Subscribe(event_name: GrenadeEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes all callbacks from this Event in this Actor within this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Unsubscribe(event_name: GrenadeEvent, callback?: EventCallback): void;
}

type GrenadeEvent = ActorEvent | GrenadeEvent_Explode | GrenadeEvent_Throw;

/**
 * Triggered when the has exploded
 *
 * @param self {@link Grenade} The grenade which exploded
 */
type GrenadeEvent_Explode = "Explode";
/**
 * Triggered when the has been thrown
 *
 * @param self {@link Grenade} The grenade which has been thrown
 * @param handler {@link Character} The Character which has thrown
 */
type GrenadeEvent_Throw = "Throw";
