import {Vector} from "../utils/Vector";
import {Rotator} from "../utils/Rotator";
import {Actor} from "./base/Actor";
import {Paintable} from "./base/Paintable";

/**
 * Scene Capture is an Actor which captures a fully dynamic image of the scene into a Texture. It captures the scene from its view frustum, stores that view as an image, which is then used within a Material.
 *
 * <i>Tip:</i> You can use the output Texture from a SceneCapture with {@link Paintable.SetMaterialFromSceneCapture} method!
 *
 * <i>Note:</i> Scene Captures capture a scene in real time, this means every tick it will re-render the scene from scratch. Please consider reducing the width/height and even the render_rate to improve it's performance.
 *
 * We've worked hard to make SceneCapture as performatic as possible! Some techniques were applied for optimization and reducing the render_rate automatically when you are far and when the generated texture is out of the screen.
 *
 * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Client</u></b>.
 *
 * @customConstructor SceneCapture
 */
declare class SceneCapture extends Actor {

    /**
     * @param location Defaults to Vector(0, 0, 0)
     * @param rotation Defaults to Rotator(0, 0, 0)
     * @param width Width of the generated Texture. Defaults to 128
     * @param height Height of the generated Texture. Defaults to 128
     * @param render_rate Render Rate (how frequent is the capture). Defaults to 0.033
     * @param view_distance Maximum distance of capturing. Defaults to 5000
     * @param fov_angle Field of View Angle. Defaults to 90
     */
    public constructor(location?: Vector, rotation?: Rotator, width?: number, height?: number, render_rate?: number, view_distance?: number, fov_angle?: number);

    /**
     * Stops or Restore Capturing
     */
    public SetFreeze(freeze: boolean): void;

    /**
     * Sets the FOV
     */
    public SetFOVAngle(angle: number): void;

    /**
     * Change the output Texture size
     *
     * Too high texture will make the capture slower and will affect game performance
     */
    public Resize(width: number, height: number): void;

    /**
     * Set how frequent is the capture
     *
     * Setting to 0 will make it capture every frame
     */
    public SetRenderRate(render_rate: number): void;
}
