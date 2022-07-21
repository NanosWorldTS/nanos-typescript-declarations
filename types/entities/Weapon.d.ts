import {ActorEvent} from "./base/Actor";
import {EventCallback} from "../EventCallback";
import {Rotator} from "../utils/Rotator";
import {Vector} from "../utils/Vector";
import {Color} from "../utils/Color";
import {CollisionType, HandlingMode} from "../Enums";
import {Pickable} from "./base/Pickable";

/**
 * Weapons are fully customizable, all pieces of the weapon can be changed with immense possibility of creation
 *
 * <i>Info:</i> Please take a look at our Default’s Weapon package with all built-in Weapons already properly configured and ready to use: <a href="https://github.com/nanos-world/nanos-world-weapons">here</a>
 *
 * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Server</u></b>.
 *
 * @customConstructor Weapon
 */
declare class Weapon extends Pickable {

    /**
     * @param location Defaults to Vector(0, 0, 0)
     * @param rotation Defaults to Rotator(0, 0, 0)
     * @param asset Defaults to ""
     * @param collision_type Defaults to {@link CollisionType.Normal}
     * @param gravity_enabled Defaults to true
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about the Static Mesh Asset.
     */
    public constructor(location?: Vector, rotation?: Rotator, asset?: string, collision_type?: CollisionType, gravity_enabled?: boolean);

    /**
     * Forces this Weapon to reload (only if being handled by a Character)
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public Reload(): void;

    /**
     * Sets this Weapon's Ammo in the Bag
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetAmmoBag(new_ammo: number): void;

    /**
     * Sets this Weapon's Ammo in the Clip
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetAmmoClip(new_ammo: number): void;

    /**
     * Aux for setting and configuring ammo
     *
     * @param ammo_to_reload The amount of ammo which will be effectively reloaded in the clip when reloading. Defaults to ammo_clip
     * @param clip_capacity How much ammo the clip can hold without needing to reload. Defaults to ammo_clip
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetAmmoSettings(ammo_clip: number, ammo_bag: number, ammo_to_reload?: number, clip_capacity?: number): void;

    /**
     * Animation played by the Weapon when Firing
     *
     * @param play_rate Defaults to 1.
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about the Animation Asset.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetAnimationFire(animation_asset_path: string, play_rate?: number): void;

    /**
     * Animation played by the Character when Firing
     *
     * @param play_rate Defaults to 1.
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about the Animation Asset.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetAnimationCharacterFire(animation_asset_path: string, play_rate?: number): void;

    /**
     * Animation played by the Character when Reloading
     *
     * Currently this animation must be one of the default ones: AM_Mannequin_Reload_Rifle, AM_Mannequin_Reload_Pistol or AM_Mannequin_Reload_Shotgun, as they have internal triggers to finish the reload
     *
     * @param play_rate Defaults to 1
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about the Animation Asset.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetAnimationReload(animation_asset_path: string, play_rate?: number): void;

    /**
     * Set the Bullet Color
     *
     * Only has effect if using Bullet Trail particle P_Bullet_Trail or if you particle has the Color parameter
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetBulletColor(color: Color): void;

    /**
     * Aux for setting and configuring the Bullet
     *
     * @param bullet_count 1 for common weapons, > 1 for shotguns
     * @param bullet_velocity Visuals only
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetBulletSettings(bullet_count: number, bullet_max_distance: number, bullet_velocity: number, bullet_color: Color): void;

    /**
     * Speed of shots
     *
     * @param cadence 1 shot at each cadence second
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetCadence(cadence: number): void;

    /**
     * Capacity of the Weapon's Clip
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetClipCapacity(clip: number): void;

    /**
     * Base Weapon's Damage
     *
     * This will be multiplied by multiplier factors when hitting specific bones
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetDamage(damage: number): void;

    /**
     * Sets how the Character grabs this Weapon
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetHandlingMode(mode: HandlingMode): void;

    /**
     * Left Hand Offset
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetLeftHandTransform(location: Vector, rotation: Rotator): void;

    /**
     * The mesh used when the Character reloads the weapon. Will drop this Mesh as an animation effect.
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about the Static Mesh Asset.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetMagazineMesh(static_mesh_asset_path: string): void;

    /**
     * Particle of the Bullet flying
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about the Particle Asset.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetParticlesBulletTrail(particle_asset_path: string): void;

    /**
     * Particle of the Fire Blast in the muzzle
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about the Particle Asset.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetParticlesBarrel(particle_asset_path: string): void;

    /**
     * Particle of the empty bullet flying from the weapon when shooting
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about the Particle Asset.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetParticlesShells(particle_asset_path: string): void;

    /**
     * Offset of Right Hand. To position relative to the camera.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetRightHandOffset(offset: Vector): void;

    /**
     * The FOV multiplier when ADS
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetSightFOVMultiplier(multiplier: number): void;

    /**
     * Offset applied to align player's head to weapon's sight and rotation applied on the weapon when ADS
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetSightTransform(location: Vector, rotation: Rotator): void;

    /**
     * Sound when weapon has not bullet and try to shoot
     *
     * @param volume Defaults to 1.
     * @param pitch Defaults to 1.
     *
     * @see <a href="https://docs.nanos.world/docs/scripting-reference/glossary/basic-types#specialpath">here</a> for more information about the Sound Asset.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetSoundDry(sound_asset_path: string, volume?: number, pitch?: number): void;

    /**
     * Sound when Loading a magazine
     *
     * @param volume Defaults to 1.
     * @param pitch Defaults to 1.
     *
     * @see <a href="https://docs.nanos.world/docs/scripting-reference/glossary/basic-types#specialpath">here</a> for more information about the Sound Asset.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetSoundLoad(sound_asset_path: string, volume?: number, pitch?: number): void;

    /**
     * Sound when Unloading a magazine
     *
     * @param volume Defaults to 1.
     * @param pitch Defaults to 1.
     *
     * @see <a href="https://docs.nanos.world/docs/scripting-reference/glossary/basic-types#specialpath">here</a> for more information about the Sound Asset.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetSoundUnload(sound_asset_path: string, volume?: number, pitch?: number): void;

    /**
     * Sound when Zooming
     *
     * @param volume Defaults to 1.
     * @param pitch Defaults to 1.
     *
     * @see <a href="https://docs.nanos.world/docs/scripting-reference/glossary/basic-types#specialpath">here</a> for more information about the Sound Asset.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetSoundZooming(sound_asset_path: string, volume?: number, pitch?: number): void;

    /**
     * Sound when Aiming
     *
     * @param volume Defaults to 1.
     * @param pitch Defaults to 1.
     *
     * @see <a href="https://docs.nanos.world/docs/scripting-reference/glossary/basic-types#specialpath">here</a> for more information about the Sound Asset.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetSoundAim(sound_asset_path: string, volume?: number, pitch?: number): void;

    /**
     * Sound when Shooting
     *
     * @param volume Defaults to 1.
     * @param pitch Defaults to 1.
     *
     * @see <a href="https://docs.nanos.world/docs/scripting-reference/glossary/basic-types#specialpath">here</a> for more information about the Sound Asset.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetSoundFire(sound_asset_path: string, volume?: number, pitch?: number): void;

    /**
     * Sound when firing with only having X remaining bullets in the magazine, useful for last shot 'ping' or sound when low on bullets
     *
     * @param remaining_bullets_count The amount of remaining bullet to start playing this sound. Defaults to 1
     * @param volume Defaults to 1.
     * @param pitch Defaults to 1.
     *
     * @see <a href="https://docs.nanos.world/docs/scripting-reference/glossary/basic-types#specialpath">here</a> for more information about the Sound Asset.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetSoundFireLastBullets(sound_asset_path: string, remaining_bullets_count?: number, volume?: number, pitch?: number): void;

    /**
     * Base Weapon's Spread (the higher the less precision - recommended value: 20)
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetSpread(spread: number): void;

    /**
     * Base Weapon's Recoil - 0 means no Recoil, default is 1
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetRecoil(recoil: number): void;

    /**
     * Sets if the Weapon can hold to keep firing and if it needs to release to fire
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetUsageSettings(can_hold_use: boolean, hold_release_use: boolean): void;

    /**
     * Sets how the bullet will pass through walls
     *
     * @param max_distance Max distance to pass through another wall
     * @param damage_multiplier Damage given if wallbangged
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetWallbangSettings(max_distance: number, damage_multiplier: number): void;

    /**
     * Gets this Weapon's Ammo Bag
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetAmmoBag(): number;

    /**
     * Gets this Weapon's Ammo Clip
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetAmmoClip(): number;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetAmmoToReload(): number;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetHandlingMode(): HandlingMode;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetAnimationCharacterFire(): string;

    public GetAnimationFire(): string;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetMagazineMesh(): string;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetParticlesBulletTrail(): string;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetParticlesBarrel(): string;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetParticlesShells(): string;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetSoundDry(): string;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetSoundLoad(): string;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetSoundUnload(): string;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetSoundZooming(): string;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetSoundAim(): string;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetSoundFire(): string;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetCanHoldUse(): boolean;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetHoldReleaseUse(): boolean;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetBulletCount(): number;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetBulletColor(): Color;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetCadence(): number;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetClipCapacity(): number;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetDamage(): number;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetRightHandOffset(): Vector;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetLeftHandLocation(): Vector;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetLeftHandRotation(): Rotator;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetSightLocation(): Vector;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetSightRotation(): Rotator;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetSightFOVMultiplier(): number;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetSpread(): number;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetRecoil(): number;

    /**
     * Subscribes for an {@link WeaponEvent}
     *
     * @return The given function callback itself
     *
     * @noSelf
     */
    public static Subscribe(event_name: WeaponEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes all callbacks from this Event in this Actor within this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Unsubscribe(event_name: WeaponEvent, callback?: EventCallback): void;
}

type WeaponEvent =
    ActorEvent
    | WeaponEvent_Fire
    | WeaponEvent_Reload
    | WeaponEvent_AmmoClipChanged
    | WeaponEvent_AmmoBagChanged;

/**
 * Triggered when Weapon fires (this will be triggered for each shot)
 *
 * @param self {@link Weapon}
 * @param shooter {@link Character}
 */
type WeaponEvent_Fire = "Fire";
/**
 * When a Weapon is reloaded, optionally by a Character
 *
 * @param self {@link Weapon}
 * @param shooter {@link Character}
 * @param ammo_to_reload {@link number}
 */
type WeaponEvent_Reload = "Reload";
/**
 * When the Ammo Clip is changed, by reloading or manually setting through scripting
 *
 * @param self {@link Weapon}
 * @param old_ammo_clip {@link number}
 * @param new_ammo_clip {@link number}
 */
type WeaponEvent_AmmoClipChanged = "AmmoClipChanged";
/**
 * When the Ammo Bag is changed, by reloading or manually setting through scripting
 *
 * @param self {@link Weapon}
 * @param old_ammo_bag {@link number}
 * @param new_ammo_bag {@link number}
 */
type WeaponEvent_AmmoBagChanged = "AmmoBagChanged";
