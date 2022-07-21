import {Character} from "./Character";
import {Vector} from "../utils/Vector";
import {Rotator} from "../utils/Rotator";
import {Actor} from "./base/Actor";
import {VOIPSetting} from "../Enums";
import {EventCallback} from "../EventCallback";

/**
 * Players are Entities that represents the individual behind the mouse and keyboard. Players are spawned automatically when connected to the server.
 *
 * @remarks <i>Authority</i>: You cannot spawn or Destroy Players.
 */
declare abstract class Player {

    /**
     * Bans the player from the server
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public Ban(reason: string): void;

    /**
     * Redirects the player to another server
     *
     * @param IP Server IP
     * @param password Server password. Defaults to ""
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public Connect(IP: string, password?: string): void;

    /**
     * Kicks the player from the server
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public Kick(reason: string): void;

    /**
     * Makes a {@link Player} to possess and control a {@link Character}
     *
     * @param blend_time Defaults to 0
     * @param exp Defaults to 0
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public Possess(new_character: Character, blend_time?: number, exp?: number): void;

    /**
     * Sets the Player's Camera Location (only works if not possessing any Character)
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetCameraLocation(location: Vector): void;

    /**
     * Sets the Player's Camera Rotation
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetCameraRotation(rotation: Rotator): void;

    /**
     * Smoothly moves the Player's Camera Location (only works if not possessing any Character)
     *
     * @param time Time to interp from current camera location to target location
     * @param exp Exponential used to smooth interp, use 0 for linear movement. Defaults to 0
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public TranslateCameraTo(location: Vector, time: number, exp?: number): void;

    /**
     * Smoothly moves the Player's Camera Rotation
     *
     * @param time Time to interp from current camera rotation to target rotation
     * @param exp Exponential used to smooth interp, use 0 for linear movement. Defaults to 0
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public RotateCameraTo(rotation: Rotator, time: number, exp?: number): void;

    /**
     * Sets the Player’s Camera Socket Offset (Spring Arm Offset)
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetCameraSocketOffset(socket_offset: Vector): void;

    /**
     * Sets the Player’s Camera Arm Length (Spring Arm length)
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetCameraArmLength(length: number): void;

    /**
     * Attaches the Player`s Camera to an Actor
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public AttachCameraTo(actor: Actor, socket_offset: Vector, blend_speed: number): void;

    /**
     * Resets the Camera to default state (Unspectate and Detaches)
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public ResetCamera(): void;

    /**
     * Spectates other Player
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public Spectate(player: Player, blend_speed: number): void;

    /**
     * Sets the player's name
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetName(new_name: string): void;

    /**
     * Sets a value in this entity, which can be accessed by any package (optionally sync on clients if called from server)
     *
     * @param sync_on_clients Server side parameter, if enabled will sync this value through all clients. Defaults to false
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/scripting/entity-values">here</a> for more information
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetValue(key: string, value: any, sync_on_clients?: boolean): void;

    /**
     * Sets the VOIP Channel of this Player (will only communicate with other players in the same channel)
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public SetVOIPChannel(channel: number): void;

    /**
     * Sets the VOIP Settings of this Player
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetVOIPSettings(settings: VOIPSetting): void;

    /**
     * Sets the VOIP Volume of this Player
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetVOIPVolume(volume: number): void;

    /**
     * Release the {@link Player} from the {@link Character}
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public UnPossess(): void;

    /**
     * Gets the Steam account ID
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetSteamID(): string;

    /**
     * Gets the nanos account ID
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetAccountID(): string;

    /**
     * Gets the nanos account name
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetAccountName(): string;

    /**
     * Gets the Player's Camera Location
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public GetCameraLocation(): Vector;

    /**
     * Gets the Player's Camera Rotation
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public GetCameraRotation(): Rotator;

    /**
     * Returns the character of the player. If the player has not yet been assigned a character, nil is returned
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetControlledCharacter(): Character | null;

    /**
     * Gets the network ID of this entity (same in both client and server)
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetID(): number;

    /**
     * Gets the IP of this Player
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
     */
    public GetIP(): string;

    /**
     * Returns the player's name
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetName(): string;

    /**
     * Returns the ping of a player
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetPing(): number;

    /**
     * Returns the type of this Actor
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetType(): string;

    /**
     * Returns the VOIP Channel of this Player
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * <i>Note:</i> Needs checking?
     */
    public GetVOIPChannel(): any;

    /**
     * Gets a value given a key
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/scripting/entity-values">here</a> for more information
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetValue(key: string, fallback: any): any;

    /**
     * Returns if this Player started the server from New Game menu
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public IsHost(): string;

    /**
     * Returns if this is the LocalPlayer
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public IsLocalPlayer(): string;

    /**
     * Returns if this entity is valid (i.e. wasn't destroyed and points to a valid entity)
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public IsValid(): boolean;

    /**
     * Returns this Player VOIP Setting
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public GetVOIPSetting(): VOIPSetting;

    /**
     * Subscribes for an {@link PlayerEvent}
     *
     * @return The given function callback itself
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Subscribe(event_name: PlayerEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes all callbacks from this Event in this Actor within this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Unsubscribe(event_name: PlayerEvent, callback?: EventCallback): void;
}

type PlayerEvent = string | PlayerEvent_Destroy | PlayerEvent_Possess | PlayerEvent_Spawn | PlayerEvent_Ready
    | PlayerEvent_UnPossess | PlayerEvent_VOIP;

/**
 * Triggered when Player disconnects from the server
 *
 * @param self {@link Player}
 */
type PlayerEvent_Destroy = "Destroy";
/**
 * A Player is now controlling a Character
 *
 * @param self {@link Player}
 * @param character {@link Character}
 */
type PlayerEvent_Possess = "Possess";
/**
 * Triggered when Player connects to the server
 *
 * @param self {@link Player}
 */
type PlayerEvent_Spawn = "Spawn";
/**
 * Triggered when Player is ready (the client fully joined, loaded the map and all entities and is ready to play)
 *
 * @param self {@link Player}
 *
 * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Server</u></b>.
 */
type PlayerEvent_Ready = "Ready";
/**
 * A Character was released from the Player
 *
 * @param self {@link Player}
 * @param character {@link Character}
 */
type PlayerEvent_UnPossess = "UnPossess";
/**
 * When a Player starts/ends using VOIP
 *
 * @param self {@link Player}
 * @param is_talking {@link boolean}
 */
type PlayerEvent_VOIP = "VOIP";
