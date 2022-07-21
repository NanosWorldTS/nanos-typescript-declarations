import {Paintable} from "./base/Paintable";
import {Vector} from "../utils/Vector";
import {Rotator} from "../utils/Rotator";

/**
 * A Blueprint Class allows spawning any Unreal Blueprint Actor in nanos world.
 *
 * <i>Tip:</i> If your Actor Blueprint was spawned on the Server, it will be automatically synchronized with other players using the nanos world Network Authority system! It follows the same rules as all other entities!
 *
 * <i>Note:</i> Currently it is only possible to communicate in one-way with the Blueprint (Scripting -> Blueprint). We didn't find a way to have the inverse communication hopefully yet.
 *
 * @remarks <i>Authority</i>: This can be spawned on both <b><u>Client</u></b> and <b><u>Server</u></b>. (if you spawn it on client, it won't be synchronized with other players).
 *
 * @customConstructor Blueprint
 */
declare class Blueprint extends Paintable {

    /**
     * @param location Defaults to Vector(0, 0, 0)
     * @param rotation Defaults to Rotator(0, 0, 0)
     * @param blueprint_path Defaults to ""
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about <b>blueprint_path</b>
     */
    public constructor(location?: Vector, rotation?: Rotator, blueprint_path?: string);

    /**
     * Calls a Blueprint Event or Function
     *
     * @param event_name Event or Function name
     * @param args Sequence of parameters to call
     */
    public CallBlueprintEvent(event_name: string, ...args: any[]): void;
}
