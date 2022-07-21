import {EventCallback} from "../EventCallback";
import {Player} from "../entities/Player";

/**
 * Server represents all Server controls in the Server side
 *
 * @remarks <i>Authority</i>: This can be accessed only on <b><u>Server</u></b>.
 */
declare class Server {

    /**
     * Sends a chat message to everyone
     *
     * @noSelf
     */
    public static BroadcastChatMessage(message: string): void;

    /**
     * Restarts the server in a new Map, restarts all packages and reconnects all players
     *
     * @noSelf
     */
    public static ChangeMap(map_path: string): void;

    /**
     * Reloads a Package
     *
     * @noSelf
     */
    public static ReloadPackage(package_folder_name: string): void;

    /**
     * Sends a chat message to {@link Player} only
     *
     * @noSelf
     */
    public static SendChatMessage(player: Player, message: string): void;

    /**
     * Sets the description of the server, optionally overrides Config.toml
     *
     * @param persist_to_config_file Defaults to false
     *
     * @noSelf
     */
    public static SetDescription(description: string, persist_to_config_file?: boolean): void;

    /**
     * Sets the logo of the server, optionally overrides Config.toml
     *
     * @param persist_to_config_file Defaults to false
     *
     * @noSelf
     */
    public static SetLogo(log_url: string, persist_to_config_file?: boolean): void;

    /**
     * Sets the maximum player slots of the server, optionally overrides Config.toml
     *
     * @param persist_to_config_file Defaults to false
     *
     * @noSelf
     */
    public static SetMaxPlayers(max_players: number, persist_to_config_file?: boolean): void;

    /**
     * Sets the name of the server, optionally overrides Config.toml
     *
     * @param persist_to_config_file Defaults to false
     *
     * @noSelf
     */
    public static SetName(name: string, persist_to_config_file?: boolean): void;

    /**
     * Sets the password of the server, optionally overrides Config.toml
     *
     * @param persist_to_config_file Defaults to false
     *
     * @noSelf
     */
    public static SetPassword(name: string, persist_to_config_file?: boolean): void;

    /**
     * Sets a global value in the Server, which can be accessed from anywhere (server side)
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/scripting/entity-values">here</a> for more information
     *
     * @noSelf
     */
    public static SetValue(key: string, value: any): void;

    /**
     * Gets a value given a key
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/scripting/entity-values">here</a> for more information
     *
     * @noSelf
     */
    public static GetValue(key: string): any;

    /**
     * Stops the server
     *
     * @noSelf
     */
    public static Stop(): void;

    /**
     * Subscribes for an Event
     *
     * @return The given function callback itself
     *
     * @noSelf
     */
    public static Subscribe(event_name: ServerEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes from all subscribed Events in this Class and in this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     *
     * @noSelf
     */
    public static Unsubscribe(event_name: ServerEvent, callback?: EventCallback): void;

    /**
     * Unloads a Package
     *
     * @noSelf
     */
    public static UnloadPackage(package_folder_name: string): void;

    /**
     * Returns the current Map
     *
     * @noSelf
     */
    public static GetMap(): string;

    /**
     * Returns a list of the Custom Config of the current map (stored in the MAP_NAME.toml)
     *
     * @noSelf
     */
    public static GetMapConfig(): ({ [key: string]: any })[];

    /**
     * Returns a list of all Maps installed on the server
     *
     * @param only_loaded Defaults to true
     *
     * @noSelf
     */
    public static GetMaps(only_loaded?: boolean): ({ key: string, author: string, compatible_game_modes: any[] })[];

    /**
     * Returns a list of Packages folder names available in the server, optionally returns only loaded and running packages
     *
     * @param only_loaded Defaults to true
     *
     * @noSelf
     */
    public static GetPackages(only_loaded?: boolean): string[];

    /**
     * Gets the server Version
     *
     * @noSelf
     */
    public static GetVersion(): string;

    /**
     * Gets the server IP
     *
     * @noSelf
     */
    public static GetIP(): string;

    /**
     * Gets the server Port
     *
     * @noSelf
     */
    public static GetPort(): number;

    /**
     * Gets the server QueryPort
     *
     * @noSelf
     */
    public static GetQueryPort(): number;

    /**
     * Gets the server Max Players allowed
     *
     * @noSelf
     */
    public static GetMaxPlayers(): number;

    /**
     * Gets the server Description
     *
     * @noSelf
     */
    public static GetDescription(): string;

    /**
     * Gets the configured Tick Rate
     *
     * @noSelf
     */
    public static GetTickRate(): number;

    /**
     * Gets if the server is announced in the Master List
     *
     * @noSelf
     */
    public static IsAnnounced(): number;
}

type ServerEvent = string
    | ServerEvent_Chat | ServerEvent_Console | ServerEvent_LogEntry | ServerEvent_Start
    | ServerEvent_PlayerConnect | ServerEvent_Stop | ServerEvent_Tick;

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
