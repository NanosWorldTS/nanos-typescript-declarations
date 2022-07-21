import {Paintable} from "./base/Paintable";
import {Vector} from "../utils/Vector";
import {Vector2D} from "../utils/Vector2D";

/**
 * A Billboard is a 2D Material that will be rendered always facing the camera.
 *
 * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Client</u></b>.
 *
 * @customConstructor Billboard
 */
declare class Billboard extends Paintable {

    /**
     * @param location Defaults to Vector(0, 0, 0)
     * @param material_asset Defaults to ""
     * @param size Defaults to Vector2D(32, 32)
     * @param size_in_screen_space Size is in Screen or World Space. Defaults to false
     *
     * @see <a href="https://docs.nanos.world/docs/core-concepts/assets#referencing-assets-in-scripting">here</a> for more information about <b>material_asset</b>
     */
    public constructor(location?: Vector, material_asset?: string, size?: Vector2D, size_in_screen_space?: boolean);
}
