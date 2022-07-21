import {Actor, ActorEvent} from "./base/Actor";
import {EventCallback} from "../EventCallback";
import {Vector} from "../utils/Vector";
import {Rotator} from "../utils/Rotator";
import {TriggerType} from "../Enums";
import {Color} from "../utils/Color";

/**
 * A Trigger class is a utility class to trigger events when any Entity enters an Area.
 *
 * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Server</u></b>.
 *
 * @customConstructor Trigger
 */
declare class Trigger extends Actor {

    /**
     * @param location Defaults to Vector(0, 0, 0)
     * @param rotation Defaults to Rotator(0, 0, 0)
     * @param extent Size of the Trigger. If using Sphere, only the X is used. Defaults to Vector(0, 0, 0)
     * @param trigger_type Currently supports {@link TriggerType.Sphere} or {@link TriggerType.Box}. Defaults to {@link TriggerType.Sphere}
     * @param is_visible Useful for debugging. Defaults to false
     * @param color Color to paint the Trigger bounds - if Visible. Defaults to {@link Color.RED}
     */
    public constructor(location?: Vector, rotation?: Rotator, extent?: Vector, trigger_type?: TriggerType, is_visible?: boolean, color?: Color);

    /**
     * Forces a Overlap checking to occur, will immediately trigger overlaps
     *
     * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Server</u></b>.
     */
    public ForceOverlapChecking(): void;

    /**
     * Sets the extent size of this trigger (sphere triggers will use only the .X component for radius)
     *
     * @param extent Sphere triggers will use only the .X component for radius
     *
     * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Server</u></b>.
     */
    public SetExtent(extent: Vector): void;

    /**
     * Subscribes for an {@link TriggerEvent}
     *
     * @return The given function callback itself
     *
     * @noSelf
     */
    public static Subscribe(event_name: TriggerEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes all callbacks from this Event in this Actor within this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Unsubscribe(event_name: TriggerEvent, callback?: EventCallback): void;
}

type TriggerEvent = ActorEvent | TriggerEvent_BeginOverlap | TriggerEvent_EndOverlap;

/**
 * Triggered when something overlaps this Trigger
 *
 * @param self {@link Trigger} The Trigger entity
 * @param entity {@link Actor} Any Actor which overlaps
 */
type TriggerEvent_BeginOverlap = "BeginOverlap";
/**
 * Triggered when something leaves this Trigger
 *
 * @param self {@link Trigger} The Trigger entity
 * @param entity {@link Actor} Any Actor which left the Trigger
 */
type TriggerEvent_EndOverlap = "EndOverlap";
