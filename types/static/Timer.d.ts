import {EventCallback} from "../EventCallback";
import {Actor} from "../entities/base/Actor";

/**
 * Execute of code at specified time intervals
 *
 * <i>Info:</i> The shortest interval possible is equal to the local Tick Rate - usually at 33ms. On the Server this can vary depending on the Config.toml setting.
 *
 * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
 */
declare class Timer {

    /**
     * Executes a function, after waiting a specified number of milliseconds
     *
     * @param callback {@link EventCallback} The callback that will be executed
     * @param milliseconds {@link number} The time in milliseconds to wait before executing the function. Defaults to 0
     * @param args {@link any[]} Additional parameters to pass to the function
     *
     * @returns The timeout_id
     *
     * @noSelf
     */
    public static SetTimeout(callback: EventCallback, milliseconds?: number, ...args: any[]): number;

    /**
     * Same as {@link SetTimeout}, but repeats the execution of the function continuously
     *
     * @param callback {@link EventCallback} The callback that will be executed
     * @param milliseconds {@link number} The time in milliseconds the timer should delay in between executions of the specified function. Defaults to 0
     * @param args {@link any[]} Additional parameters to pass to the function
     *
     * @returns The interval_id
     *
     * @noSelf
     */
    public static SetInterval(callback: EventCallback, milliseconds?: number, ...args: any[]): number;

    /**
     * Stops the execution of the function specified in {@link SetTimeout}
     *
     * @param timeout_id {@link number} The ID value returned by {@link SetTimeout} is used as the parameter for this method
     *
     * @noSelf
     */
    public static ClearTimeout(timeout_id: number): void;

    /**
     * Stops the execution of the function specified in {@link SetInterval}
     *
     * @param interval_id {@link number} The ID value returned by {@link SetInterval} is used as the parameter for this method
     *
     * @noSelf
     */
    public static ClearInterval(interval_id: number): void;

    /**
     * Binds a Timer to any {@link Actor}. The timer will be automatically cleared when the {@link Actor} is destroyed
     *
     * @param timer_id {@link number} The Timer ID
     * @param actor {@link Actor} {@link Actor} to be bound
     *
     * @noSelf
     */
    public static Bind(timer_id: number, actor: Actor): void;

    /**
     * Checks if a Timer is currently active or waiting to be triggered
     *
     * @param timer_id {@link number} The Timer ID
     *
     * @noSelf
     */
    public static IsValid(timer_id: number): boolean;

    /**
     * Returns the time elapsed since the last tick
     *
     * @param timer_id {@link number} The Timer ID
     *
     * @noSelf
     */
    public static GetElapsedTime(timer_id: number): number;

    /**
     * Returns the time remaining to the next tick
     *
     * @param timer_id {@link number} The Timer ID
     *
     * @noSelf
     */
    public static GetRemainingTime(timer_id: number): number;

    /**
     * Pauses the Timer
     *
     * @param timer_id {@link number} The Timer ID
     *
     * @noSelf
     */
    public static Pause(timer_id: number): void;

    /**
     * Resumes the Timer
     *
     * @param timer_id {@link number} The Timer ID
     *
     * @noSelf
     */
    public static Resume(timer_id: number): void;
}
