import {Paintable} from "./base/Paintable";
import {Vector} from "../utils/Vector";
import {Rotator} from "../utils/Rotator";

/**
 * Decals are Materials that are projected onto meshes in your level, including Static Meshes and Skeletal Meshes.
 *
 * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Client</u></b>.
 *
 * @customConstructor Decal
 */
declare class Decal extends Paintable {

    /**
     * @param location Defaults to Vector(0, 0, 0)
     * @param rotation Defaults to Rotator(0, 0, 0)
     * @param material_asset Defaults to ""
     * @param size Vector(128, 256, 256)
     * @param lifespan Time until automatically destroyed. Defaults to 60
     * @param fade_screen_size Size percentage in screen to fade out. Defaults to 0.01
     */
    public constructor(location?: Vector, rotation?: Rotator, material_asset?: string, size?: Vector, lifespan?: number, fade_screen_size?: number);
}
