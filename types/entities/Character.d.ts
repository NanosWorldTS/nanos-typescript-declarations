import {Actor, ActorEvent} from "./base/Actor";
import {EventCallback} from "../EventCallback";
import {AimMode, AnimationSlotType, CameraMode, CollisionType, DamageType, FallingMode, GaitMode, StanceMode, SwimmingMode, ViewMode} from "../Enums";
import {Pickable} from "./base/Pickable";
import {Vector} from "../utils/Vector";
import {Rotator} from "../utils/Rotator";
import {Paintable} from "./base/Paintable";
import {Vehicle} from "./Vehicle";
import {Player} from "./Player";
import {Prop} from "./Prop";

/**
 * Characters represents Actors which can be possessed, can move and interact with world. They are the default Skeletal Mesh Character built for nanos world
 *
 * <i>Note:</i> Characters are Skeletal Meshes using Unreal’s Mannequin Skeletal, with animations and interactivity already natively integrated into nanos world. It is possible to import any Skeletal Mesh (which uses Unreal’s Mannequin Skeletal) to this Character.
 *
 * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Server</u></b>.
 *
 * @customConstructor Character
 */
declare class Character extends Paintable {

    /**
     * @param location Defaults to Vector(0, 0, 0)
     * @param rotation Defaults to Rotator(0, 0, 0)
     * @param skeletal_mesh Defaults to "nanos-world::SK_Mannequin"
     * @param collision_type Defaults to {@link CollisionType.Normal}
     * @param gravity_enabled Defaults to true
     * @param health Defaults to 100
     * @param death_sounds Defaults to "nanos-world::A_Male_01_Death"
     * @param pain_sounds Defaults to "nanos-world::A_Male_01_Pain"
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about skeletal mesh.
     */
    public constructor(location?: Vector, rotation?: Rotator, skeletal_mesh?: string, collision_type?: CollisionType, gravity_enabled?: boolean, health?: number, death_sounds?: string, pain_sounds?: number);

    /**
     * Do damage in a character, will trigger all related events and apply modified damage based on bone. Also will apply impulse if it's a heavy explosion
     *
     * @param bone_name Defaults to ""
     * @param damage_type Defaults to {@link DamageType.Shot}
     * @param from_direction Defaults to Vector(0, 0, 0)
     * @param instigator Defaults to null
     * @param causer The object which caused the damage. Defaults to null
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public ApplyDamage(damage: number, bone_name?: string, damage_type?: DamageType, from_direction?: Vector, instigator?: Player, causer?: any): void;

    /**
     * Spawns and Attaches a SkeletalMesh into this Character, the SkeletalMesh must have the same Skeletal used by the Character Mesh, and will follow all animations from it. Uses a custom ID to be used for removing it further
     *
     * @param skeletal_mesh_path Defaults to ""
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public AddSkeletalMeshAttached(id: string, skeletal_mesh_path?: string): void;

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
     * Drops any {@link Pickable} the Character is holding.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public Drop(): void;

    /**
     * Enters the Vehicle at Seat (0 - Driver)
     *
     * @param seat Defaults to 0
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public EnterVehicle(vehicle: Vehicle, seat?: number): void;

    /**
     * Gives a {@link Prop} to the Character
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public GrabProp(prop: Prop): void;

    /**
     * Hides a bone of this Character. Check <a href="https://docs.nanos.world/docs/scripting-reference/classes/character#characters-skeleton-bone-names">Bone Names List</a> for all Bone names
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public HideBone(bone_name: string): void;

    /**
     * UnHide a bone of this Character. Check <a href="https://docs.nanos.world/docs/scripting-reference/classes/character#characters-skeleton-bone-names">Bone Names List</a> for all Bone names
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public UnHideBone(bone_name: string): void;

    /**
     * Check if a Bone is Hidden
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public IsBoneHidden(bone_name: string): boolean;

    /**
     * Triggers this Character to jump
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public Jump(): void;

    /**
     * Leaves the current Vehicle
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public LeaveVehicle(): void;

    /**
     * AI: Tries to make this Character to look at Location
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public LookAt(location: Vector): void;

    /**
     * AI: Makes this Character to walk to the Location
     *
     * Triggers event {@link CharacterEvent_MoveCompleted}.
     *
     * @param acceptance_radius Defaults to 50
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public MoveTo(location: Vector, acceptance_radius?: number): void;

    /**
     * AI: Makes this Character to follow another Actor
     *
     * Triggers event {@link CharacterEvent_MoveCompleted}.
     *
     * @param acceptance_radius Defaults to 50
     * @param stop_on_succeed Whether to stop when reaching the target. Defaults to false
     * @param stop_on_fail Whether to stop when failed to reach the target. Defaults to false
     * @param update_rate How often to recalculate the AI path. Defaults to 0.25
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public Follow(actor: Actor, acceptance_radius?: number, stop_on_succeed?: boolean, stop_on_fail?: boolean, update_rate?: number): void;

    /**
     * AI: Stops the movement
     *
     * Triggers event {@link CharacterEvent_MoveCompleted}.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public StopMovement(): void;

    /**
     * Gives a Melee/Grenade/Weapon (Pickable) to the Character
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public PickUp(pickable: Pickable): void;

    /**
     * Plays an Animation Montage on this character
     *
     * @param slot_type Defaults to {@link AnimationSlotType.FullBody}
     * @param loop_indefinitely Defaults to false
     * @param blend_in_time Defaults to 0.25
     * @param blend_out_time Defaults to 0.25
     * @param play_rate Defaults to 1
     * @param stop_all_montages Stops all running Montages from the same Group. Defaults to false
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public PlayAnimation(animation_path: string, slot_type?: AnimationSlotType, loop_indefinitely?: boolean, blend_in_time?: number, blend_out_time?: number, play_rate?: number, stop_all_montages?: boolean): void;

    /**
     * Removes, if existing, a SkeletalMesh from this Character given it's custom ID
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public RemoveSkeletalMeshAttached(id: string): void;

    /**
     * Removes, if existing, a StaticMesh from this Character given it's custom ID
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public RemoveStaticMeshAttached(id: string): void;

    /**
     * Removes all StaticMeshes attached
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public RemoveAllStaticMeshAttached(): void;

    /**
     * Removes all SkeletalMeshes attached
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public RemoveAllSkeletalMeshAttached(): void;

    /**
     * Respawns the Character, fullying it's Health and moving it to it's Initial Location
     *
     * @param location If not passed will use the initial location passed when the Character spawned. Defaults to initial location
     * @param rotation Defaults to Rotator(0, 0, 0)
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public Respawn(location?: Vector, rotation?: Rotator): void;

    /**
     * Sets the Movement Max Acceleration of this Character.
     *
     * @param walking Defaults to 768
     * @param parachuting Defaults to 512
     * @param skydiving Defaults to 768
     * @param falling Defaults to 128
     * @param swimming Defaults to 256
     * @param swimming_surface Defaults to 256
     * @param flying Defaults to 1024
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetAccelerationSettings(walking?: number, parachuting?: number, skydiving?: number, falling?: number, swimming?: number, swimming_surface?: number, flying?: number): void;

    /**
     * Sets the Movement Braking Settings of this Character.
     *
     * @param ground_friction Defaults to 2
     * @param braking_friction_factor Defaults to 2
     * @param braking_walking Defaults to 96
     * @param braking_flying Defaults to 3000
     * @param braking_swimming Defaults to 10
     * @param braking_falling Defaults to 0
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetBrakingSettings(ground_friction?: number, braking_friction_factor?: number, braking_walking?: number, braking_flying?: number, braking_swimming?: number, braking_falling?: number): void;

    /**
     * Sets the Camera Mode (i.e. Only TPS, FPS or if allow both)
     *
     * <i>Info:</> Using FPSOnly CameraMode on AI will lock his body rotation (when using LookAt).
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetCameraMode(camera_mode: CameraMode): void;

    /**
     * Sets the Camera Offset (only affects TPS)
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public SetCameraOffset(camera_offset: Vector): void;

    /**
     * Sets if this Character is allowed to Crouch and to Prone
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetCanCrouch(can_crouch: boolean): void;

    /**
     * Sets if this Character is allowed to Aim
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetCanAim(can_aim: boolean): void;

    /**
     * Sets if this Character is allowed to Drop the Picked up item
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetCanDrop(can_drop: boolean): void;

    /**
     * Sets if this Character is allowed to Sprint
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetCanSprint(can_sprint: boolean): void;

    /**
     * Sets if this Character is allowed to Grab any Prop
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetCanGrabProps(can_grab_props: boolean): void;

    /**
     * Sets if this Character is allowed to Pick up any {@link Pickable} (Weapon, Grenade, Melee...)
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetCanPickupPickables(can_pickup: boolean): void;

    /**
     * Sets if this Character is allowed to Punch
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetCanPunch(can_punch: boolean): void;

    /**
     * Sets if this Character is allowed to deploy the Parachute
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetCanDeployParachute(can_deploy_parachute: boolean): void;

    /**
     * Sets this Character's Capsule size (will affect Camera location and Character's collision) - default is (42, 96)
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetCapsuleSize(radius: number, half_height: number): void;

    /**
     * Changes how much damage this character takes
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetDamageMultiplier(bone_name: string, multiplier: number): void;

    /**
     * Changes the Death sound when Character dies
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetDeathSound(sound_asset: string): void;

    /**
     * Set the Fall Damage multiplier taken when falling from High places (default: 10). Setting to 0 will make the Character to do not take damage or enter ragdoll mode
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetFallDamageTaken(damage: number): void;

    /**
     * Sets the Flying Mode
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetFlyingMode(flying_mode: boolean): void;

    /**
     * Sets time elapsed until automatically transition to HighFalling state (from SmallFalling). Default is 1 second
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetHighFallingTime(time: number): void;

    /**
     * Sets the Field of View multiplier
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetFOVMultiplier(multiplier: number): void;

    /**
     * Gait Modes: {@link GaitMode.None}, {@link GaitMode.Walking}, {@link GaitMode.Sprinting}
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetGaitMode(mode: GaitMode): void;

    /**
     * Changes the Gravity Scale of this Character (can be negative)
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetGravityScale(scale: Vector): void;

    /**
     * Sets the Health of this Character. If the character is dead, respawns it with full health
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetHealth(new_health: number): void;

    /**
     * Set the Impact Damage taken when being roamed by things (default: 10). Setting to 0 will make the Character to do not take damage or enter ragdoll mode
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetImpactDamageTaken(damage: number): void;

    /**
     * Sets if the Character can receive any damage
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetInvulnerable(is_invulnerable: boolean): void;

    /**
     * Sets the velocity of the jump. Default is 450.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetJumpZVelocity(velocity: number): void;

    /**
     * Sets the MaxHealth of this Character
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetMaxHealth(new_health: number): void;

    /**
     * Changes the Character Mesh on the fly
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about skeleton mesh asset.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetMesh(skeletal_mesh_asset: string): void;

    /**
     * Set Morph Target with Name and Value
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetMorphTarget(name: string, value: number): void;

    /**
     * Get Morph target with given name
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetMorphTarget(name: string): number;

    /**
     * Clear all Morph Target that are set to this Mesh
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public ClearMorphTargets(): void;

    /**
     * Returns the list of all morph targets of this Skeletal Mesh
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public GetAllMorphTargetNames(): string[];

    /**
     * Applies the physical animation settings to the body given
     *
     * @param bone The body we will be driving
     * @param include_self Whether to modify the given body
     * @param is_local_simulation Whether the drive targets are in world space or local
     * @param orientation_strength The strength used to correct orientation error. Defaults to 0
     * @param angular_velocity_strength The strength used to correct angular velocity error. Defaults to 0
     * @param position_strength The strength used to correct linear position error. Only used for non-local simulation. Defaults to 0
     * @param velocity_strength The strength used to correct linear velocity error. Only used for non-local simulation. Defaults to 0
     * @param max_linear_force The max force used to correct linear errors. Defaults to 0
     * @param max_angular_force The max force used to correct angular errors. Defaults to 0
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetPhysicalAnimationSettings(bone: string, include_self: boolean, is_local_simulation: boolean, orientation_strength?: number, angular_velocity_strength?: number, position_strength?: number, velocity_strength?: number, max_linear_force?: number, max_angular_force?: number): void;

    /**
     * Enables/Disables Character's Movement
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetMovementEnabled(is_movement_enabled: boolean): void;

    /**
     * Changes the Parachute Texture
     *
     * @see <a href="https://docs.nanos.world/docs/scripting-reference/glossary/basic-types#specialpath">here</a> for more information about texture.
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetParachuteTexture(texture: string): void;

    /**
     * Changes the Pain sound when Character takes damage
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetPainSound(sound_asset: string): void;

    /**
     * Set the Punch Damage this Character will apply on others (default is 15)
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetPunchDamage(damage: number): void;

    /**
     * Sets Character Ragdoll Mode
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetRagdollMode(ragdoll_enabled: boolean): void;

    /**
     * 1 = normal
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetSpeedMultiplier(multiplier: number): void;

    /**
     * Stance Modes: {@link StanceMode.None}, {@link StanceMode.Standing}, {@link StanceMode.Crouching}, {@link StanceMode.Proning}
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetStanceMode(mode: StanceMode): void;

    /**
     * Sets a Team which will disable damaging same Team Members. 0 for Neutral
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetTeam(team: number): void;

    /**
     * Changes the Predefined View Mode
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetViewMode(view_mode: ViewMode): void;

    /**
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetWeaponAimMode(aim_mode: AimMode): void;

    /**
     * Stops an Animation Montage on this character
     *
     * @param animation_path Defaults to ""
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public StopAnimation(animation_path?: string): void;

    /**
     * UnGrabs/Drops the Prop the Character is holding
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public UnGrabProp(): void;

    /**
     * Gets Character Ragdoll Mode
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public IsInRagdollMode(): boolean;

    /**
     * Gets if the Character can receive damage
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public IsInvulnerable(): boolean;

    /**
     * Gets Character Movement Enabled
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public IsMovementEnabled(): boolean;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetCameraMode(): CameraMode;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetCanDrop(): boolean;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetCanPunch(): boolean;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetCanAim(): boolean;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetCanCrouch(): boolean;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetCanSprint(): boolean;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetCanGrabProps(): boolean;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetCanPickupPiackables(): boolean;

    /**
     * Gets the Capsule Size set by {@link SetCapsuleSize}
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetCapsuleSize(): { Radius: number, HalfHeight: number };

    /**
     * Gets the Bone Transform in World Space
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public GetBoneTransform(bone_name: string): { Location: Vector, Rotation: Rotator };

    /**
     * Gets the rotation this character is looking at
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetControlRotation(): Rotator;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetDamageMultiplier(bone_name: string): number;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetFallDamageTaken(): number;

    /**
     * Gets the Falling Mode
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetFallingMode(): FallingMode;

    /**
     * Gets if the Character is in Flying Mode
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetFlyingMode(): any;

    /**
     * Gets the Gait Mode
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetGaitMode(): GaitMode;

    /**
     * Gets the Grabbing Prop
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetGrappedProp(): Prop | null;

    /**
     * Gets the Gravity Scale of this Character
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetGravityScale(): number;

    /**
     * Gets the Character's Health.
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetHealth(): number;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetImpactDamageTaken(): number;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetJumpZVelocity(): number;

    /**
     * Gets the Character's MaxHealth.
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetMaxHealth(): number;

    /**
     * Gets the Mesh Asset name
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetMesh(): string;

    /**
     * Gets the Character moving to location, returns Vector(0, 0, 0) if it's not
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetMovingTo(): Vector;

    /**
     * Gets the holding Picked Melee/Grenade/Weapon
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetPicked(): Pickable | null;

    /**
     * Gets the Player controlling this Character
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetPlayer(): Player | null;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetPunchDamage(): number;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetSpeedMultiplier(): number;

    /**
     *
     */
    public GetStanceMode(): StanceMode;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetSwimmingMode(): SwimmingMode;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetTeam(): number;

    /**
     * Gets the Vehicle the Character is on
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetVehicle(): Vehicle | null;

    /**
     * Gets Character View Mode
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetViewMode(): ViewMode;

    /**
     * Gets Character Aim Mode
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetWeaponAimMode(): AimMode;

    /**
     * Subscribes for an {@link CharacterEvent}
     *
     * @return The given function callback itself
     *
     * @noSelf
     */
    public static Subscribe(event_name: CharacterEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes all callbacks from this Event in this Actor within this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Unsubscribe(event_name: CharacterEvent, callback?: EventCallback): void;
}

type CharacterEvent =
    ActorEvent
    | CharacterEvent_AnimationBeginNotify
    | CharacterEvent_AnimationEndNotify
    | CharacterEvent_Death
    | CharacterEvent_Drop
    | CharacterEvent_EnterVehicle
    | CharacterEvent_AttemptEnterVehicle
    | CharacterEvent_FallingModeChanged
    | CharacterEvent_Fire
    | CharacterEvent_GaitModeChanged
    | CharacterEvent_GrabProp
    | CharacterEvent_HealthChanged
    | CharacterEvent_Highlight
    | CharacterEvent_Interact
    | CharacterEvent_LeaveVehicle
    | CharacterEvent_AttemptLeaveVehicle
    | CharacterEvent_MoveCompleted
    | CharacterEvent_PickUp
    | CharacterEvent_Possessed
    | CharacterEvent_Punch
    | CharacterEvent_RagdollModeChanged
    | CharacterEvent_AttemptReload
    | CharacterEvent_Reload
    | CharacterEvent_Respawn
    | CharacterEvent_StanceModeChanged
    | CharacterEvent_SwimmingModeChanged
    | CharacterEvent_TakeDamage
    | CharacterEvent_UnGrabProp
    | CharacterEvent_UnPossessed
    | CharacterEvent_ViewModeChanged
    | CharacterEvent_WeaponAimModeChanged;

/**
 * When an Animation Montage Notify begins
 *
 * @param self {@link Character}
 * @param notify_name {@link string}
 *
 * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
 */
type CharacterEvent_AnimationBeginNotify = "AnimationBeginNotify";
/**
 * When an Animation Montage Notify ends
 *
 * @param self {@link Character}
 * @param notify_name {@link string}
 *
 * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
 */
type CharacterEvent_AnimationEndNotify = "AnimationEndNotify";
/**
 * When Character Dies
 *
 * @param self {@link Character}
 * @param last_damage_taken {@link number}
 * @param last_bone_damaged {@link string}
 * @param damage_type_reason {@link DamageType}
 * @param hit_from_direction {@link Vector}
 * @param instigator {@link Player}
 * @param cause {@link any} The object which caused the damage
 *
 * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
 */
type CharacterEvent_Death = "Death";
/**
 * When Character drops the currently picked up {@link Pickable}
 *
 * @param self {@link Character}
 * @param object {@link Pickable}
 * @param triggered_by_player {@link boolean}
 */
type CharacterEvent_Drop = "Drop";
/**
 * When Character enters a vehicle
 *
 * @param self {@link Character}
 * @param vehicle {@link Vehicle}
 * @param seat_index {@link number}
 */
type CharacterEvent_EnterVehicle = "EnterVehicle";
/**
 * When Character attempts to enter a vehicle
 *
 * @param self {@link Character}
 * @param vehicle {@link Vehicle}
 * @param seat_index {@link number}
 *
 * @return false to prevent it
 *
 * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
 */
type CharacterEvent_AttemptEnterVehicle = "AttemptEnterVehicle";
/**
 * Falling Modes: None, Jumping, Climbing, Vaulting, Falling, HighFalling, Parachuting, SkyDiving
 *
 * @param self {@link Character}
 * @param old_state {@link FallingMode}
 * @param new_state {@link FallingMode}
 */
type CharacterEvent_FallingModeChanged = "FallingModeChanged";
/**
 * When Character fires a Weapon
 *
 * @param self {@link Character}
 * @param weapon {@link Weapon}
 */
type CharacterEvent_Fire = "Fire";
/**
 * Gait Modes: None, Walking, Sprinting
 *
 * @param self {@link Character}
 * @param old_state {@link GaitMode}
 * @param new_state {@link GaitMode}
 */
type CharacterEvent_GaitModeChanged = "GaitModeChanged";
/**
 * When Character grabs up a Prop
 *
 * @param self {@link Character}
 * @param prop {@link Prop}
 */
type CharacterEvent_GrabProp = "GrabProp";
/**
 * When Character has it's Health changed, or because took damage or manually set through scripting or respawning
 *
 * @param self {@link Character}
 * @param old_health {@link number}
 * @param new_health {@link number}
 */
type CharacterEvent_HealthChanged = "HealthChanged";
/**
 * When Character highlights/looks at a {@link Prop} or a {@link Pickable}
 *
 * @param self {@link Character}
 * @param is_highlightes {@link boolean} Whether the object is being highlighted or not
 * @param object {@link Prop} or {@link Pickable}
 */
type CharacterEvent_Highlight = "Highlight";
/**
 * When a Character interacts with a {@link Prop} or {@link Pickable} to pick it up
 *
 * @param self {@link Character}
 * @param object {@link Prop} or {@link Pickable}
 *
 * @return false to prevent it
 *
 * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
 */
type CharacterEvent_Interact = "Interact";
/**
 * When Character leaves a vehicle
 *
 * @param self {@link Character}
 * @param vehicle {@link Vehicle}
 * @param seat_index {@link number}
 */
type CharacterEvent_LeaveVehicle = "LeaveVehicle";
/**
 * When Character attempts to leave a vehicle
 *
 * @param self {@link Character}
 * @param vehicle {@link Vehicle}
 * @param seat_index {@link number}
 *
 * @return false to prevent it
 *
 * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
 */
type CharacterEvent_AttemptLeaveVehicle = "AttemptLeaveVehicle";
/**
 * Called when AI reaches it's destination, or when it fails
 *
 * @param self {@link Character}
 * @param succeeded {@link boolean}
 */
type CharacterEvent_MoveCompleted = "MoveCompleted";
/**
 * When Character picks up anything
 *
 * @param self {@link Character}
 * @param object {@link Pickable}
 */
type CharacterEvent_PickUp = "PickUp";
/**
 * When Character is possessed
 *
 * @param self {@link Character}
 * @param possesser {@link Player}
 */
type CharacterEvent_Possessed = "Possessed";
/**
 * When Character punches
 *
 * @param self {@link Character}
 */
type CharacterEvent_Punch = "Punch";
/**
 * When Character enters or leaves ragdoll
 *
 * @param self {@link Character}
 * @param old_state {@link boolean}
 * @param new_state {@link boolean}
 */
type CharacterEvent_RagdollModeChanged = "RagdollModeChanged";
/**
 * When Character attempts to reload a weapon
 *
 * @param self {@link Character}
 *
 * @return false to prevent it
 */
type CharacterEvent_AttemptReload = "AttemptReload";
/**
 * When Character reloads a weapon
 *
 * @param self {@link Character}
 * @param weapon {@link Weapon}
 */
type CharacterEvent_Reload = "Reload";
/**
 * When Character Respawns
 *
 * @param self {@link Character}
 */
type CharacterEvent_Respawn = "Respawn";
/**
 * Stance Modes: None, Standing, Crouching, Proning
 *
 * @param self {@link Character}
 * @param old_state {@link StanceMode}
 * @param new_state {@link StanceMode}
 */
type CharacterEvent_StanceModeChanged = "StanceModeChanged";
/**
 * Swimming Modes: None, Surface, Underwater
 *
 * @param self {@link Character}
 * @param old_state {@link SwimmingMode}
 * @param new_state {@link SwimmingMode}
 */
type CharacterEvent_SwimmingModeChanged = "SwimmingModeChanged";
/**
 * When Character takes Damage
 *
 * @param self {@link Character}
 * @param damage {@link number}
 * @param bone {@link string} Damaged bone
 * @param type {@link DamageType} Damage Type
 * @param from_direction {@link Vector} Direction of the damage relative to the damaged actor
 * @param instigator {@link Player} The player which caused the damage
 * @param causer {@link any} The object which caused the damage
 *
 * @return false to cancel the damage (will still display animations, particles and apply impact forces)
 */
type CharacterEvent_TakeDamage = "TakeDamage";
/**
 * When Character drops a Prop
 *
 * @param self {@link Character}
 * @param prop {@link Prop}
 */
type CharacterEvent_UnGrabProp = "UnGrabProp";
/**
 * When Character is unpossessed
 *
 * @param self {@link Character}
 * @param old_possesser {@link Player}
 */
type CharacterEvent_UnPossessed = "UnPossessed";
/**
 * When Character changes it's View Mode: FPS, TPS1, TPS2, TPS3
 *
 * @param self {@link Character}
 * @param old_state {@link ViewMode}
 * @param new_state {@link ViewMode}
 */
type CharacterEvent_ViewModeChanged = "ViewModeChanged";
/**
 * Aim Modes: None, ADS, ZoomedZoom, Zoomed, ZoomedFar
 *
 * @param self {@link Character}
 * @param old_state {@link AimMode}
 * @param new_state {@link AimMode}
 */
type CharacterEvent_WeaponAimModeChanged = "WeaponAimModeChanged";
