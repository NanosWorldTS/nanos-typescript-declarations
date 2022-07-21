import {EventCallback} from "../EventCallback";

/**
 * Class for spawning a web browser in the screen.
 *
 * <i>Tip:</i> This HTML implementation is built upon same core as WebKit/Safari using <a href="https://ultralig.ht/">Ultralight</a> library, a next-generation HTML Renderer.
 *
 * <i><b>Caution:</b></i> We are using a beta build of Ultralight, which now supports Audio and Video. Although it is still very unstable and some crashes may happen! Also the Audio currently plays only in 2D.
 *
 * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Client</u></b>.
 *
 * @customConstructor WebUI
 */
declare class WebUI {

    /**
     * <i>Tip:</i> Loading a .html file supports the following searchers, which are looked in the following order:
     * 1. Relative to current-file-path/
     * 2. Relative to current-package/Client/
     * 3. Relative to current-package/
     * 4. Relative to Packages/
     *
     * @param name Currently not used. Defaults to ""
     * @param path URL or <code>file:///my_file.html</code> or <a href="https://docs.nanos.world/docs/scripting-reference/glossary/basic-types#specialpath">HTML Special Path</a>. Defaults to ""
     * @param is_visible if WebUI is visible by default. Defaults to true
     * @param is_transparent if WebUI background is transparent. Defaults to true
     * @param auto_resize if should auto resize when screen changes it's size (useful OFF when you are painting meshes with WebUI). Defaults to true
     * @param width size of the WebUI when you are not using auto_resize. Defaults to 0
     * @param height size of the WebUI when you are not using auto_resize. Defaults to 0
     */
    public constructor(name?: string, path?: string, is_visible?: boolean, is_transparent?: boolean, auto_resize?: boolean, width?: number, height?: number);

    /**
     * Puts this WebUI in the front of all WebUIs
     */
    public BringToFront(): void;

    /**
     * Calls an Event on the Browser's JavaScript
     */
    public CallEvent(event_name: string, ...args: any[]): void;

    /**
     * Destroys this Browser
     */
    public Destroy(): void;

    /**
     * Loads a new File/URL in this Browser
     */
    public LoadURL(url: string): void;

    /**
     * Enables the focus on this browser (i.e. can receive Keyboard input). You must call it when you want to enable Keyboard Input on WebUIs (after disabling Client's Input)
     *
     * @remarks Only one browser can have focus per time.
     */
    public SetFocus(): void;

    /**
     * Freezes the WebUI Rendering to the surface (it will still execute the JS under the hood)
     */
    public SetFreeze(): void;

    /**
     * Toggles the visibility
     */
    public SetVisible(is_visible: boolean): void;

    /**
     * Gets if this entity is Valid
     */
    public IsValid(): boolean;

    /**
     * Gets the network ID of this entity
     */
    public GetID(): number;

    /**
     * Returns the type of this Entity
     */
    public GetType(): string;

    /**
     * Returns if this WebUI is currently visible
     */
    public IsVisible(): boolean;

    /**
     * Subscribes for an {@link WebUIEvent}
     *
     * @return The given function callback itself
     *
     * @noSelf
     */
    public static Subscribe(event_name: WebUIEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes all callbacks from this Event in this Actor within this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Unsubscribe(event_name: WebUIEvent, callback?: EventCallback): void;
}

type WebUIEvent = string | WebUIEvent_Failed | WebUIEvent_Ready;

/**
 * Triggered when this page fails to load
 *
 * @param error_code {@link number}
 * @param message {@link string}
 */
type WebUIEvent_Failed = "Failed";
/**
 * Triggered when this page is fully loaded
 */
type WebUIEvent_Ready = "Ready";
