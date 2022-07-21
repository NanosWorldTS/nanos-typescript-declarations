import {Vector} from "../utils/Vector";
import {Vector2D} from "../utils/Vector2D";
import {Player} from "../entities/Player";
import {CollisionChannel, CursorType, HighlightMode, InputEvent} from "../Enums";
import {EventCallback} from "../EventCallback";
import {Color} from "../utils/Color";
import {Rotator} from "../utils/Rotator";
import {StaticMesh} from "../entities/StaticMesh";
import {Weapon} from "../entities/Weapon";
import {StreamLevelLoaded, StreamLevelUnloaded} from "./World";

/**
 * Static Class present on Client side
 *
 * @remarks <i>Authority</i>: This can be accessed only on <b><u>Client</u></b>.
 */
declare class Client {

    /**
     * Calls a Level Blueprint custom event (which can be added when creating levels through Unreal Engine).
     * Parameters can be concatenated to event_name like 'MyEventName 123, "MyParameter2", 456'
     *
     * @noSelf
     */
    public static CallLevelBlueprintEvent(event_name: string): void;

    /**
     * @param life_time Defaults to 5
     * @param thickness Defaults to 0
     *
     * @noSelf
     */
    public static DrawDebugBox(location: Vector, extent: Vector, rotation: Rotator, color: Color, life_time?: number, thickness?: number): void;

    /**
     * @param size Defaults to 100
     * @param life_time Defaults to 5
     * @param thickness Defaults to 0
     *
     * @noSelf
     */
    public static DrawDebugCoordinateSystem(location: Vector, rotation: Rotator, size?: number, life_time?: number, thickness?: number): void;

    /**
     * @param size Defaults to 100
     * @param color Defaults to {@link Color.RED}
     * @param life_time Defaults to 5
     * @param thickness Defaults to 0
     *
     * @noSelf
     */
    public static DrawDebugCrosshairs(location: Vector, rotation: Rotator, size?: number, color?: Color, life_time?: number, thickness?: number): void;

    /**
     * @param arrow_size Defaults to 100
     * @param color Defaults to {@link Color.RED}
     * @param life_time Defaults to 5
     * @param thickness Defaults to 0
     *
     * @noSelf
     */
    public static DrawDebugDirectionalArrow(start_location: Vector, end_location: Vector, arrow_size?: number, color?: Color, life_time?: number, thickness?: number): void;

    /**
     * @param color Defaults to {@link Color.RED}
     * @param life_time Defaults to 5
     * @param thickness Defaults to 0
     *
     * @noSelf
     */
    public static DrawDebugCylinder(start_location: Vector, end_location: Vector, radius: number, segments: number, color?: Color, life_time?: number, thickness?: number): void;

    /**
     * @param color Defaults to {@link Color.RED}
     * @param life_time Defaults to 5
     * @param draw_shadow Defaults to false
     * @param font_scale Defaults to 1
     *
     * @noSelf
     */
    public static DrawDebugString(location: Vector, text: string, color?: Color, life_time?: number, draw_shadow?: boolean, font_scale?: number): void;

    /**
     * Draws a Debug Line in the World
     *
     * @param color Defaults to {@link Color.RED}
     * @param life_time Defaults to 5
     * @param thickness Defaults to 0
     *
     * @noSelf
     */
    public static DrawDebugLine(start_location: Vector, end_location: Vector, color?: Color, duration?: number, thickness?: number): void;

    /**
     * Draws a Debug Point in the World
     *
     * @param color Defaults to {@link Color.RED}
     * @param duration Defaults to 5
     * @param size Defaults to 10
     *
     * @noSelf
     */
    public static DrawDebugPoint(start_position: Vector, color?: Color, duration?: number, size?: number): void;

    /**
     * Draws a Debug Line in the World
     *
     * @param color Defaults to {@link Color.RED}
     * @param duration Defaults to 5
     * @param thickness Defaults to 0
     *
     * @noSelf
     */
    public static DrawDebugSphere(start_position: Vector, radius: number, segments: number, color?: Color, duration?: number, thickness?: number): void;

    /**
     * Transforms a 2D screen coordinates into 3D world-space location
     *
     * @noSelf
     */
    public static DeprojectScreenToWorld(screen_position: Vector2D): { Position: Vector, Direction: Vector };

    /**
     * Transforms a 3D world-space vector into 2D screen coordinates
     *
     * @noSelf
     */
    public static ProjectWorldToScreen(world_position: Vector): Vector2D;

    /**
     * Initializes the Discord Integration with your custom client_id
     *
     * @noSelf
     */
    public static InitializeDiscord(client_id: number): void;

    /**
     * Sends a chat message which will display local only
     *
     * @noSelf
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
     *
     * @noSelf
     */
    public static SetChatConfiguration(screen_location?: Vector2D, size?: Vector2D, anchors_min?: Vector2D, anchors_max?: Vector2D, alignment?: Vector2D, justify?: boolean, show_scrollbar?: boolean): void;

    /**
     * Set if the Chat is visible or not
     *
     * @noSelf
     */
    public static SetChatVisibility(is_visible: boolean): void;

    /**
     * Enables/Disables the default Crosshair
     *
     * @noSelf
     */
    public static SetCrosshairEnabled(is_enabled: boolean): void;

    /**
     * Enables/Disables the Blood Screen
     *
     * @noSelf
     */
    public static SetBloodScreenEnabled(is_enabled: boolean): void;

    /**
     * Manually sets the Blood Screen intensity
     *
     * @param intensity Between 0.0 and 1.0
     *
     * @remarks If you want the Blood Screen to do not be overridden, disable it with {@link SetBloodScreenEnabled} with <code>false</code> before
     *
     * @noSelf
     */
    public static SetBloodScreenIntensity(intensity: number): void;

    /**
     * Loads or sets a hardware cursor from the content directory in the game
     *
     * @param hotspot Defaults to (0, 0)
     *
     * @noSelf
     */
    public static SetHardwareCursor(cursor_shape: CursorType, cursor_path: string, hotspot?: Vector2D): void;

    /**
     * Communicates with Discord and sets a custom user status
     *
     * @noSelf
     */
    public static SetDiscordActivity(state: string, details: string, large_image: string, large_text: string): void;

    /**
     * Toggles Local Player input
     *
     * @noSelf
     */
    public static SetInputEnabled(enable_input: boolean): void;

    /**
     * Displays/Hides Mouse Cursor
     *
     * @noSelf
     */
    public static SetMouseEnabled(is_enabled: boolean): void;

    /**
     * Changes the Outline Color for interactable stuff. Multiply it by 5 (or more) for having a glowing effect
     *
     * @remarks The default Outline color index used by the game is 0 (when interacting with stuff).
     *
     * @noSelf
     */
    public static SetOutlineColor(color: Color, index?: number): void;

    /**
     * Changes the Highlight Color for highlighted actors at a specific Index. Multiply it by 5 (or more) for having a glowing effect
     *
     * @noSelf
     */
    public static SetHighlightColor(highlight_color: Color, index: number, mode: HighlightMode): void;

    /**
     * Changes the Steam Rich Presence text
     *
     * @noSelf
     */
    public static SetSteamRichPresence(text: string): void;

    /**
     * Sets a global value in the Client, which can be accessed from anywhere (client side)
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/scripting/entity-values">here</a> for more information
     *
     * @noSelf
     */
    public static SetValue(key: string, value: any): void;

    /**
     * Subscribes for an {@link ClientEvent}
     *
     * @return The given function callback itself
     *
     * @noSelf
     */
    public static Subscribe(event_name: ClientEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes from all subscribed Events in this Class and in this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     *
     * @noSelf
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
     *
     * @noSelf
     */
    public static Trace(start_location: Vector, end_location: Vector, collision_channel?: CollisionChannel, trace_complex?: boolean, return_entity?: boolean, return_physical_material?: boolean, ignored_actos?: any[], draw_debug?: boolean): void;

    /**
     * Gets the local Player
     *
     * @noSelf
     */
    public static GetLocalPlayer(): Player;

    /**
     * Finds random, reachable point in navigable space restricted to radius around origin (only if map has a NavMesh)
     *
     * @noSelf
     */
    public static GetRandomReachablePointInRadius(origin: Vector, radius: number): Vector;

    /**
     * Finds random, point in navigable space restricted to Radius around Origin. Resulting location is not tested for reachability from the Origin (only if map has a NavMesh)
     *
     * @noSelf
     */
    public static GetRandomPointInNavigableRadius(origin: Vector, radius: number): Vector;

    /**
     * Finds a Path given Start and End location (only if map has a NavMesh)
     *
     * @noSelf
     */
    public static FindPathToLocation(start_location: Vector, end_location: Vector): ({ IsValid: boolean, IsPartial: boolean, Length: number, Cost: number, PathPoints: Vector[] })[];

    /**
     * Returns the current Map
     *
     * @noSelf
     */
    public static GetMap(): string;

    /**
     * Gets the current mouse screen location
     *
     * @noSelf
     */
    public static GetMousePosition(): Vector2D;

    /**
     * Gets a list of Packages folder names loaded and running in the client
     *
     * @returns {string[]} A string array with packages folder names
     *
     * @noSelf
     */
    public static GetPackages(): string[];

    /**
     * Gets the size of viewport (how much screen space the game window occupies)
     *
     * @noSelf
     */
    public static GetViewportSize(): Vector2D;

    /**
     * Gets a value given a key
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/scripting/entity-values">here</a> for more information
     *
     * @noSelf
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
     *
     * @noSelf
     */
    public static InputKey(key_name: string, input_event?: InputEvent, amount_depressed?: number): void;

    /**
     * Gets if a key is being pressed
     *
     * @noSelf
     */
    public static IsKeyDown(key_name: string): boolean;

    /**
     * Gets if the mouse is visible
     *
     * @noSelf
     */
    public static IsMouseEnabled(): boolean;

    /**
     * Gets if the input is visible
     *
     * @noSelf
     */
    public static IsInputEnabled(): boolean;
}

type ClientEvent = string
    | Chat | ChatEntry | ClientEvent_Console | KeyDown | KeyPress | KeyUp | LogEntry | MouseDown | MouseUp
    | MouseEnabled | MouseMoveX | MouseMoveY | OpenChat | CloseChat | OpenConsole | CloseConsole | Tick
    | ViewportResized | WindowFocusChanged | StreamLevelLoaded | StreamLevelUnloaded;

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
type ClientEvent_Console = "Console";
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
