import {EventCallback} from "../EventCallback";
import {Player} from "../entities/Player";

/**
 * Subscribe for user-defined Events
 *
 * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
 */
declare class Events {

    /**
     * Calls an Event which will be triggered in all Local Packages
     *
     * @param event_name {@link string} The Event Name to trigger the event
     * @param args {@link any[]} Arguments to pass to the event
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Call(event_name: string, ...args: any[]): void;

    /**
     * Calls an Event if on Client which will be triggered in all Server Packages
     *
     * @param event_name {@link string} The Event Name to trigger the event
     * @param args {@link any[]} Arguments to pass to the event
     *
     * @remarks <i>Authority</i>: This can be accessed only on <b><u>Client</u></b>.
     *
     * @noSelf
     */
    public static CallRemote(event_name: string, ...args: any[]): void;

    /**
     * Calls an Event if on Server which will be triggered in all Client's Packages of a specific Player
     *
     * @param event_name {@link string} The Event Name to trigger the event
     * @param player {@link Player} The remote player to send this event
     * @param args {@link any[]} Arguments to pass to the event
     *
     * @remarks <i>Authority</i>: This can be accessed only on <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static CallRemote(event_name: string, player: Player, ...args: any[]): void;

    /**
     * Calls an Event on Server which will be triggered in all Client's Packages
     *
     * @param event_name {@link string} The Event Name to trigger the event
     * @param args {@link any[]} Arguments to pass to the event
     *
     * @remarks <i>Authority</i>: This can be accessed only on <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static BroadcastRemote(event_name: string, ...args: any[]): void;

    /**
     * Subscribes for an user-created event which will be triggered for both local or remote* called events
     *
     * @param event_name {@link string} The Event Name to Subscribe for an event
     * @param callback {@link Callback} The callback function to execute
     *
     * @return The given function callback itself
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Subscribe(event_name: string, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes from all subscribed events in this Package with that event name, optionally passing the function to unsubscribe only that callback
     *
     * @param event_name {@link string} The Event Name to Unsubscribe
     * @param callback {@link Callback} The callback function to unsubscribe. Defaults to null
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Unsubscribe(event_name: string, callback?: EventCallback): void;
}
