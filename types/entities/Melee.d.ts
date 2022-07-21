import {Pickable} from "./base/Pickable";
import {Vector} from "../utils/Vector";
import {Rotator} from "../utils/Rotator";
import {CollisionType, HandlingMode} from "../Enums";

/**
 * A Melee represents an Entity which can be Pickable by a Character and can be used to melee attack, Charactes can hold it with hands with pre-defined handling modes.
 *
 * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Server</u></b>.
 *
 * @customConstructor Melee
 */
declare class Melee extends Pickable {

    /**
     * @param location Defaults to Vector(0, 0, 0)
     * @param rotation Defaults to Rotator(0, 0, 0)
     * @param asset Defaults to ""
     * @param collision_type Defaults to {@link CollisionType.Normal}
     * @param gravity_enabled Defaults to true
     * @param handling_mode Defaults to {@link HandlingMode.Torch}
     * @param crosshair_material Defaults to ""
     */
    public constructor(location?: Vector, rotation?: Rotator, asset?: string, collision_type?: CollisionType, gravity_enabled?: boolean, handling_mode?: HandlingMode, crosshair_material?: string);

    /**
     * Sets the Animation when attacking
     *
     * @param asset_path The Animation used when attacking
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetAnimationCharacterUse(asset_path: string): void;

    /**
     * Sets the Sound when attacking
     *
     * @param asset_path The Sound used when attacking
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetSoundUse(asset_path: string): void;

    /**
     * Sets the Base Damage
     *
     * @param damage The Base Damage value
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetBaseDamage(damage: number): void;

    /**
     * Sets the times when to start applying damage and when to end. During this time the collision of the melee will be enabled and the damage will be applied if it hits something
     *
     * @param damage_start_time The initial time to start applying damage
     * @param damage_duration_time The duration time to stop applying damage
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetDamageSettings(damage_start_time: number, damage_duration_time: number): void;

    /**
     * Sets the cooldown between attacking
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetCooldown(cooldown: number): void;

    /**
     * Gets the animation asset
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetAnimationCharacterUse(): string;

    /**
     * Gets the sound asset
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetSoundUse(): string;

    /**
     * Gets the base damage
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetBaseDamage(): number;

    /**
     * Gets the cooldown
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetCooldown(): number;
}
