import {Canvas} from "./Canvas";
import {Vector} from "../utils/Vector";
import {Rotator} from "../utils/Rotator";
import {Actor} from "./base/Actor";
import {WebUI} from "./WebUI";

/**
 * Particle Entity.
 *
 * @remarks <i>Authority</i>: This can be spawned on both <b><u>Client</u></b> and <b><u>Server</u></b>. (if you spawn it on client, it won't be synchronized with other players).
 *
 * @customConstructor Particle
 */
declare class Particle extends Actor {

    /**
     * @param location Defaults to Vector(0, 0, 0)
     * @param rotation Defaults to Rotator(0, 0, 0)
     * @param asset Defaults to ""
     * @param auto_destroy auto_destroy means the Entity will be immediately destroyed after spawned, losing references to the Particle System spawned in-game. So if the Particle System itself loops indefinitely, it will keep playing until the Player reconnects. Defaults to true
     * @param auto_activate Defaults to true
     */
    public constructor(location?: Vector, rotation?: Rotator, asset?: string, auto_destroy?: boolean, auto_activate?: boolean);

    /**
     * Activates the Emitter
     *
     * @param should_reset If should reset
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public Activate(should_reset: boolean): void;

    /**
     * Deactivate the Emitter
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public Deactivate(): void;

    /**
     * Sets a float parameter in this Particle System
     *
     * @param parameter The parameter name
     * @param value The float value
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetParameterFloat(parameter: string, value: number): void;

    /**
     * Sets a integer parameter in this Particle System
     *
     * @param parameter The parameter name
     * @param value The int value
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetParameterInt(parameter: string, value: number): void;

    /**
     * Sets a boolean parameter in this Particle System
     *
     * @param parameter The parameter name
     * @param value The boolean value
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetParameterBool(parameter: string, value: boolean): void;

    /**
     * Sets a {@link Vector} parameter in this Particle System
     *
     * @param parameter The parameter name
     * @param value The {@link Vector} value
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetParameterVector(parameter: string, value: Vector): void;

    /**
     * Sets a <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">Material Asset</a> parameter in this Particle System
     *
     * @param parameter The parameter name
     * @param value The <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">Material Asset</a> value
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetParameterMaterial(parameter: string, value: string): void;

    /**
     * Sets a Material from a <a href="https://docs.nanos.world/docs/scripting-reference/glossary/basic-types#specialpath">Texture</a> parameter in this Particle System
     *
     * This will create a Material and set this Texture as it's parameter internally, then set the Material into the Particle parameter
     *
     * @param parameter The parameter name
     * @param value The <a href="https://docs.nanos.world/docs/scripting-reference/glossary/basic-types#specialpath">Texture</a> value
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public SetParameterMaterialFromTexture(parameter: string, value: string): void;

    /**
     * Sets a Material from a {@link Canvas} parameter in this Particle System
     *
     * This will create a Material and set this Canvas as it's parameter internally, then set the Material into the Particle parameter
     *
     * @param parameter The parameter name
     * @param value The {@link Canvas} value
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public SetParameterMaterialFromTexture(parameter: string, value: Canvas): void;

    /**
     * Sets a Material from a {@link WebUI} parameter in this Particle System
     *
     * This will create a Material and set this Canvas as it's parameter internally, then set the Material into the Particle parameter
     *
     * @param parameter The parameter name
     * @param value The {@link WebUI} value
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public SetParameterMaterialFromWebUI(parameter: string, value: WebUI): void;
}
