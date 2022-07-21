import {Color} from "../utils/Color";
import {LightProfile, LightType} from "../Enums";
import {Vector} from "../utils/Vector";
import {Rotator} from "../utils/Rotator";
import {Actor} from "./base/Actor";

/**
 * A Light represents a Lighting source.
 *
 * nanos world provides 3 types of lights: {@link LightType.Spot}, {@link LightType.Point} and {@link LightType.React}. All lights are Dynamic and because of that, very expensive! Keep that in mind before spawning 1000 lights.
 *
 * @remarks <i>Authority</i>: This can be spawned on both <b><u>Client</u></b> and <b><u>Server</u></b>. (if you spawn it on client, it won't be synchronized with other players).
 *
 * @customConstructor Light
 */
declare class Light extends Actor {

    /**
     * @param location Defaults to Vector(0, 0, 0)
     * @param rotation Relevant only for {@link LightType.React} and {@link LightType.Spot} LightTypes. Defaults to Rotator(0, 0, 0)
     * @param color Defaults to Color(1, 1, 1)
     * @param light_type Defaults to {@link LightType.Point}
     * @param intensity Defaults to 30
     * @param attenuation_radius Defaults to 250
     * @param cone_angle Relevant only for {@link LightType.Spot} LightType. Defaults to 44
     * @param inner_cone_angle_percent Inner Cone Angle Percent (Relevant only for {@link LightType.Spot} LightType) (0-1). Defaults to 0
     * @param max_daw_distance Max Draw Distance (Good for performance - 0 for infinite. Defaults to 5000
     * @param use_inverse_squared_falloff Whether to use physically based inverse squared distance falloff, where Attenuation Radius is only clamping the light's contribution. ({@link LightType.Spot} and {@link LightType.Point} types only). Defaults to true
     * @param cast_shadows Defaults to true
     * @param visible Defaults to true
     */
    public constructor(location?: Vector, rotation?: Rotator, color?: Color, light_type?: LightType, intensity?: number, attenuation_radius?: number, cone_angle?: number, inner_cone_angle_percent?: number, max_daw_distance?: number, use_inverse_squared_falloff?: boolean, cast_shadows?: boolean, visible?: boolean);

    /**
     * Sets the light color
     *
     * @param color The light color
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetColor(color: Color): void;

    /**
     * Sets the light Texture Profile
     *
     * @param light_profile The Light Profile to use
     *
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetTextureLightProfile(light_profile: LightProfile): void;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetEnabled(is_enabled: boolean): void;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetCastShadows(is_shadows_enabled: boolean): void;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetIntensity(intensity: number): void;

    /**
     * @remarks <i>Authority</i>: This can be accessed on both <b><u>Client</u></b> and <b><u>Server</u></b>.
     */
    public SetAttenuationRadius(attenuation_radius: number): void;
}
