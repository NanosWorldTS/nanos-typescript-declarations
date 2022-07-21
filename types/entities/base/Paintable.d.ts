import {Actor} from "./Actor";
import {Color} from "../../utils/Color";
import {Vector} from "../../utils/Vector";
import {Canvas} from "../Canvas";
import {SceneCapture} from "../SceneCapture";
import {WebUI} from "../WebUI";

/**
 * A Paintable class is a base class in nanos world which provides customization for materials, exposing common functions to allow you to set custom material parameters, including loading textures from disk.
 *
 * @remarks This is a base class. You cannot spawn it directly.
 */
export declare abstract class Paintable extends Actor {

    /**
     * Sets the material at the specified index of this Actor
     *
     * @param material_path {@link string} The new Material to apply.
     * @param index {@link number} The index to apply - -1 means all indices. Defaults to -1
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetMaterial(material_path: string, index?: number): void;

    /**
     * Sets the material at the specified index of this Actor to a {@link Canvas} object
     *
     * @param canvas {@link Canvas} The Canvas object to use as a material
     * @param index {@link number} The index to apply - -1 means all indices. Defaults to -1
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public SetMaterialFromCanvas(canvas: Canvas, index?: number): void;

    /**
     * Sets the material at the specified index of this Actor to a {@link SceneCapture} object
     *
     * @param scene_capture {@link SceneCapture} The SceneCapture object to use as a material
     * @param index {@link number} The index to apply - -1 means all indices. Defaults to -1
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public SetMaterialFromSceneCapture(scene_capture: SceneCapture, index?: number): void;

    /**
     * Sets the material at the specified index of this Actor to a {@link WebUI} object
     *
     * @param webui {@link WebUI} The WebUI object to use as a material
     * @param index {@link number} The index to apply - -1 means all indices. Defaults to -1
     *
     * @remarks <i>Authority</i>: This can be accessed only on the <b><u>Client</u></b>.
     */
    public SetMaterialFromWebUI(webui: WebUI, index?: number): void;

    /**
     * Resets the material from the specified index to the original one
     *
     * @param index {@link number} The index to apply - -1 means all indices. Defaults to -1
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public ResetMaterial(index?: number): void;

    /**
     * Sets a Color parameter in this Actor’s material
     *
     * @param parameter_name {@link string} The name of the material parameter
     * @param color {@link Color} The value to set
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetMaterialColorParameter(parameter_name: string, color: Color): void;

    /**
     * Sets a Scalar parameter in this Actor's material
     *
     * For setting a parameter in an <a href="https://docs.nanos.world/docs/scripting-reference/classes/character#addskeletalmeshattached">Attachable</a>
     * mesh, use the following parameter_name pattern: attachable///[ATTACHABLE_ID]/[PARAMETER_NAME]
     *
     * @param parameter_name {@link string} The name of the material parameter
     * @param value {@link any} The value to set
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetMaterialScalarParameter(parameter_name: string, value: any): void;

    /**
     * Sets a texture parameter in this Actor's material to an image on disk
     *
     * @param parameter_name {@link string} The name of the material parameter
     * @param texture_path {@link string} The path to the texture
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetMaterialTextureParameter(parameter_name: string, texture_path: string): void;

    /**
     * Sets a Vector parameter in this Actor's material
     *
     * For setting a parameter in an <a href="https://docs.nanos.world/docs/scripting-reference/classes/character#addskeletalmeshattached">Attachable</a>
     * mesh, use the following parameter_name pattern: attachable///[ATTACHABLE_ID]/[PARAMETER_NAME]
     *
     * @param parameter_name {@link string} The name of the material parameter
     * @param vector {@link Vector} The value to set
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetMaterialVectorParameter(parameter_name: string, vector: Vector): void;

    /**
     * Overrides this Actor's Physical Material with a new one
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetPhysicsMaterial(physical_material_path: string): void;
}
