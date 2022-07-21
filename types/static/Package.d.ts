import {EventCallback} from "../EventCallback";

/**
 * Class which represents the Current Package
 *
 * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
 */
declare class Package {

    /**
     * Calls an exported function from an other Package
     *
     * @noSelf
     */
    public static Call(package_name: string, function_name: string, ...args: any[]): any;

    /**
     * Logs and formats an error message in the console in Red (the proper and nanos way)
     *
     * @noSelf
     */
    public static Error(message: string, ...args: any[]): void;

    /**
     * 'exports' a function to be called from any other package
     *
     * @noSelf
     */
    public static Export(function_name: string, callback: (...args: any[]) => any): void;

    /**
     * Logs and formats a message in the console (the proper and nanos way)
     *
     * @noSelf
     */
    public static Log(message: string, ...args: any[]): void;

    /**
     * Includes new .lua files
     *
     * We currently support 5 searchers, which are looked in the following order:
     * 1. Relative to <code>current-file-path/</code>
     * 2. Relative to <code>current-package/Client/</code> or <code>current-package/Server/</code> (depending on your side)
     * 3. Relative to <code>current-package/Shared/</code>
     * 4. Relative to <code>current-package/</code>
     * 5. Relative to <code>Packages/</code>
     *
     * @noSelf
     */
    public static Require(script_file: string): void;

    /**
     * Includes other Package in this Package
     *
     * @noSelf
     */
    public static RequirePackage(package_name: string): void;

    /**
     * Subscribes for an Event
     *
     * @return The given function callback itself
     *
     * @noSelf
     */
    public static Subscribe(event_name: PackageEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes from all subscribed Events in this Class and in this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     *
     * @noSelf
     */
    public static Unsubscribe(event_name: PackageEvent, callback?: EventCallback): void;

    /**
     * Logs and formats a warning message in the console in Orange (the proper and nanos way)
     *
     * @noSelf
     */
    public static Warn(message: string, ...args: any[]): void;

    /**
     * Sets a Persistent Value which will be saved to Disk
     *
     * @noSelf
     */
    public static SetPersistentData(key: string, value: any): void;

    /**
     * Gets a list of all directories in this package, optionally with filters
     *
     * @param path_filter Defaults to an empty string ("")
     *
     * @noSelf
     */
    public static GetDirectories(path_filter?: string): string | any[];

    /**
     * Gets a list of all files in this package, optionally with filters
     *
     * @param path_filter Defaults to an empty string ("")
     * @param extension_filter Defaults to an empty string ("")
     *
     * @noSelf
     */
    public static GetFiles(path_filter?: string, extension_filter?: string): string | any[];

    /**
     * Gives the package name
     *
     * @noSelf
     */
    public static GetName(): string;

    /**
     * Gives the package path
     *
     * @noSelf
     */
    public static GetPath(): string;

    /**
     * Gets the package version
     *
     * @noSelf
     */
    public static GetVersion(): string;

    /**
     * Gets all Persistent Values from the Disk
     *
     * @noSelf
     */
    public static GetPersistentData(key: string): { [key: string]: any } | any;
}

type PackageEvent = string | Load | Unload;

/**
 * Called when this package is loaded
 *
 * <i>Info:</i> The event Load is triggered differently depending on the situation:
 * - When the server starts or you run package reload all the event triggers only after ALL packages are loaded.
 * - In all other cases (package load/reload or Package.Load/Reload) the event is triggered immediately after the package is loaded/reloaded.
 */
type Load = "Load";
/**
 * Triggered when this page fails to load
 */
type Unload = "Unload";
