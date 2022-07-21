import {ActorEvent} from "./base/Actor";
import {EventCallback} from "../EventCallback";
import {Color} from "../utils/Color";
import {Vector2D} from "../utils/Vector2D";
import {BlendMode, FontType} from "../Enums";

/**
 * Canvas is an entity which you can draw onto it.
 *
 * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Client</u></b>.
 *
 * @customConstructor Canvas
 */
export declare class Canvas {

    /**
     * @param is_visible If Canvas is visible on Screen by default. Defaults to true
     * @param clear_color color of the default background. Defaults to {@link Color.TRANSPARENT}
     * @param auto_repaint_rate frequency to auto repaint (to retrigger Update event). Defaults to -1
     * @param should_clear_before_update if should clear the Canvas (using clear_color) before every Update. Defaults to true
     * @param auto_resize if should auto resize when screen changes it's size (useful OFF when you are painting meshes with Canvas). Defaults to true
     * @param width size of the Canvas when you are not using auto_resize. Defaults to 0
     * @param height size of the Canvas when you are not using auto_resize. Defaults to 0
     */
    public constructor(is_visible?: boolean, clear_color?: Color, auto_repaint_rate?: number, should_clear_before_update?: boolean, auto_resize?: boolean, width?: number, height?: number);

    /**
     * Draws a box on the Canvas
     *
     * @remarks This method can only be called from inside {@link CanvasEvent_Update} event
     */
    public DrawBox(screen_position: Vector2D, screen_size: Vector2D, thickness: number, render_color: Color): void;

    /**
     * Draws a line on the Canvas
     *
     * @remarks This method can only be called from inside {@link CanvasEvent_Update} event
     */
    public DrawLine(screen_position_a: Vector2D, screen_position_b: Vector2D, thickness: number, render_color: Color): void;

    /**
     * Draws a Material on the Canvas
     *
     * @param coordinate_size Defaults to Vector2D(1, 1)
     * @param rotation Defaults to 0
     * @param pivot_point Defaults to Vector2D(0.5, 0.5)
     *
     * @remarks This method can only be called from inside {@link CanvasEvent_Update} event
     */
    public DrawMaterial(material_path: string, screen_position: Vector2D, screen_size: Vector2D, coordinate_position: Vector2D, coordinate_size?: Vector2D, rotation?: number, pivot_point?: Vector2D): void;

    /**
     * Draws a Text on the Canvas
     *
     * @param font_type Defaults to {@link FontType.Roboto}
     * @param font_size Defaults to 12
     * @param text_color Defaults to {@link Color.WHITE}
     * @param kerning Defaults to 0
     * @param center_x Defaults to false
     * @param center_y Defaults to false
     * @param shadow_color Defaults to {@link Color.TRANSPARENT}
     * @param shadow_offset Defaults to Vector2D(1, 1)
     * @param outlined Defaults to false
     * @param outline_color Defaults to {@link Color.BLACK}
     *
     * @remarks This method can only be called from inside {@link CanvasEvent_Update} event. Shadow and Outline won't work properly with Transparent clear_color.
     */
    public DrawText(text: string, screen_position: Vector2D, font_type?: FontType, font_size?: number, text_color?: Color, kerning?: number, center_x?: number, center_y?: number, shadow_color?: Color, shadow_offset?: Vector2D, outlined?: boolean, outline_color?: Color): void;

    /**
     * Draws a Texture on the Canvas
     *
     * @param coordinate_size Defaults to Vector2D(1, 1)
     * @param render_color Defaults to {@link Color.WHITE}
     * @param blend_mode Defaults to {@link BlendMode.Opaque}
     * @param rotation Defaults to 0
     * @param pivot_point Defaults to Vector2D(0.5, 0.5)
     *
     * @remarks This method can only be called from inside {@link CanvasEvent_Update} event
     */
    public DrawTexture(texture_path: string, screen_position: Vector2D, screen_size: Vector2D, coordinate_position: Vector2D, coordinate_size?: Vector2D, render_color?: Color, blend_mode?: BlendMode, rotation?: number, pivot_point?: Vector2D): void;

    /**
     * Draws a N-Polygon on the Canvas
     *
     * @param texture_path Pass "" to use default white Texture
     * @param radius Defaults to Vector2D(1, 1)
     * @param number_of_sides Defaults to 3
     * @param render_color Defaults to {@link Color.WHITE}
     *
     * @remarks This method can only be called from inside {@link CanvasEvent_Update} event
     */
    public DrawPolygon(texture_path: string, screen_position: Vector2D, radius?: Vector2D, number_of_sides?: number, render_color?: Color): void;

    /**
     * Draws a filled Rect on the Canvas
     *
     * @param texture_path Pass "" to use default white Texture
     * @param render_color Defaults to {@link Color.WHITE}
     *
     * @remarks This method can only be called from inside {@link CanvasEvent_Update} event
     */
    public DrawRect(texture_path: string, screen_position: Vector2D, screen_size: Vector2D, render_color?: Color): void;

    /**
     * Change the auto repaint Rate
     *
     * Sets it to -1 to stop auto repainting or 0 to repaint every frame
     */
    public SetAutoRepaintRate(auto_repaint_rate: boolean): void;

    /**
     * Sets if it's visible on screen
     */
    public SetVisible(visible: boolean): void;

    /**
     * Forces the repaint, this will trigger {@link CanvasEvent_Update} event
     */
    public Repaint(): void;

    /**
     * Clear the Canvas with a specific Color
     */
    public Clear(clear_color: Color): void;

    /**
     * Subscribes for an {@link CanvasEvent}
     *
     * @return The given function callback itself
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Subscribe(event_name: CanvasEvent, callback: EventCallback): EventCallback;

    /**
     * Unsubscribes all callbacks from this Event in this Actor within this Package, optionally passing the function to unsubscribe only that callback
     *
     * @param callback Defaults to null
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     *
     * @noSelf
     */
    public static Unsubscribe(event_name: CanvasEvent, callback?: EventCallback): void;
}

type CanvasEvent = ActorEvent | CanvasEvent_Update;
/**
 * Called when the Canvas needs to be painted
 *
 * You can only call <code>Draw...()</code> methods from inside this event
 *
 * @param self {@link Canvas}
 * @param width {@link number}
 * @param height {@link number}
 */
type CanvasEvent_Update = "Update";
