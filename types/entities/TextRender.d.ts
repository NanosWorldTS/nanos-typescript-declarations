import {Paintable} from "./base/Paintable";
import {Vector} from "../utils/Vector";
import {Rotator} from "../utils/Rotator";
import {Color} from "../utils/Color";
import {FontType, TextRenderAlignCamera, TextRenderBevelType, TextRenderHorizontalAlignment, TextRenderVerticalAlignment} from "../Enums";

/**
 * A Text Render class is useful for spawning Texts in 3D world, you can even attach it to other entities.
 *
 * <i>Info:</i> If you desire your TextRender to be visible through walls, replace it’s material with the nanos Default TranslucentDepth one!
 *
 * <code>SetMaterial("nanos-world::M_NanosTranslucent_Depth")</code>
 *
 * You can also tweak it’s color and other properties using the Material methods.
 *
 * @remarks <i>Authority</i>: This can be spawned on both <b><u>Client</u></b> and <b><u>Server</u></b>. (if you spawn it on client, it won't be synchronized with other players).
 *
 * @customConstructor TextRender
 */
declare class TextRender extends Paintable {

    /**
     * @param location Defaults to Vector(0, 0, 0)
     * @param rotation Defaults to Rotator(0, 0, 0)
     * @param text Defaults to ""
     * @param scale Defaults to Vector(1, 1, 1)
     * @param color Defaults to Color(1, 1, 1, 1)
     * @param font_type Defaults to {@link FontType.Roboto}
     * @param align_camera Defaults to {@link TextRenderAlignCamera.Unaligned}
     */
    public constructor(location?: Vector, rotation?: Rotator, text?: string, scale?: Vector, color?: Color, font_type?: FontType, align_camera?: TextRenderAlignCamera);

    /**
     * Sets the Color Internally this will call the SetMaterialColorParameter("Tint", color) method
     */
    public SetColor(color: Color): void;

    /**
     * Sets the Font
     */
    public SetFont(font_type: FontType): void;

    /**
     * Freeze mesh rebuild, to avoid unnecessary mesh rebuilds when setting a few properties together
     */
    public SetFreeze(freeze: boolean): void;

    /**
     * Sets the Glyph representation settings to generate the 3D Mesh for this text render
     *
     * @param extrude Defaults to 0
     * @param level Defaults to 0
     * @param bevel_type Defaults to {@link TextRenderBevelType.Convex}
     * @param bevel_segments Defaults to 0
     * @param outline Defaults to false
     */
    public SetGlyphSettings(extrude?: number, level?: number, bevel_type?: TextRenderBevelType, bevel_segments?: number, outline?: boolean): void;

    /**
     * Sets the Max Size of the TextRender, optionally scaling it proportionally
     *
     * @param max_width Defaults to 0
     * @param max_height Defaults to 0
     * @param scale_proportionally Defaults to true
     */
    public SetMaxSize(max_width?: number, max_height?: number, scale_proportionally?: boolean): void;

    /**
     * Sets the Text
     */
    public SetText(text: string): void;

    /**
     * Sets the Text & Font settings for this text render
     *
     * @param kerning Defaults to 0
     * @param line_spacing Defaults to 0
     * @param word_spacing Defaults to 0
     * @param horizontal_alignment Defaults to {@link TextRenderHorizontalAlignment.Center}
     * @param vertical_alignment Defaults to {@link TextRenderVerticalAlignment.Center}
     */
    public SetTextSettings(kerning?: number, line_spacing?: number, word_spacing?: number, horizontal_alignment?: TextRenderHorizontalAlignment, vertical_alignment?: TextRenderVerticalAlignment): void;
}
