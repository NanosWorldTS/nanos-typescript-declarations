import {InputEvent} from "../Enums";

/**
 * Create custom Bindings and Retrieve Input information
 *
 * @remarks <i>Authority</i>: This can be accessed only on <b><u>Client</u></b>.
 *
 * @warning This Class is <b>experimental</b>, so you can try it out and provide feedback before it's full release!
 */
declare class Input {

    /**
     * Binds a function to an Input defined using {@link Register} or from Game
     *
     * @param binding_name The KeyBinding ID
     * @param input_event Which Event to register (Released/Pressed)
     * @param callback The function to trigger
     *
     * @noSelf
     */
    public static Bind(binding_name: string, input_event: InputEvent, callback: () => void): void;

    /**
     * Unbinds all Input functions related to that binding_name and input_event
     *
     * @param binding_name The KeyBinding ID
     * @param input_event Which Event to register (Released/Pressed)
     *
     * @noSelf
     */
    public static Unbind(binding_name: string, input_event: InputEvent): void;

    /**
     * Registers a BindingName to a default Key
     *
     * @param binding_name The KeyBinding ID
     *
     * @noSelf
     */
    public static Register(binding_name: string, key_name: string): void;

    /**
     * Unregisters a BindingName
     *
     * @param binding_name The KeyBinding ID
     *
     * @noSelf
     */
    public static Unregister(binding_name: string, key_name: string): void;

    /**
     * Gets the Icon image path from a Key
     *
     * @noSelf
     */
    public static GetKeyIcon(key_name: string): string;

    /**
     * Gets the Key given a BindingName
     *
     * @noSelf
     */
    public static GetMappedKey(binding_name: string): string;

    /**
     * Resets all Bound functions from this Package
     *
     * @noSelf
     */
    public static ResetBindings(): void;

    /**
     * Returns a table with all Scripting KeyBindings
     *
     * @noSelf
     */
    public static GetScriptingKeyBindings(): KeyBinding[];

    /**
     * Returns a table with all Game KeyBindings
     *
     * @noSelf
     */
    public static GetGameKeyBindings(): KeyBinding[];
}

type KeyBinding = { BindingName: string, KeyName: string } & { [key: string]: any };
