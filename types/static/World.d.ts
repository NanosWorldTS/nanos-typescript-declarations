import {WeatherType} from "../Enums";
import {Color} from "../utils/Color";

/**
 * Interaction with World and Environment elements
 *
 * <i>Info:</i> Check <a href="https://docs.nanos.world/docs/core-concepts/scripting/interacting-with-the-sun">Interacting with Sun</a> for further information and examples.
 *
 * @remarks <i>Authority</i>: This can be accessed only on <b><u>Client</u></b>.
 */
declare class World {

    /**
     * Loads a Level in runtime
     *
     * @param should_block_on_load {@link boolean} If this should be a blocking operation - the game will freeze. Defaults to false
     *
     * @noSelf
     */
    public static LoadStreamLevel(level_name: string, should_block_on_load?: boolean): void;

    /**
     * Unloads a Level in runtime
     *
     * @param should_block_on_unload {@link boolean} If this should be a blocking operation - the game will freeze. Defaults to false
     *
     * @noSelf
     */
    public static UnloadStreamLevel(level_name: string, should_block_on_unload?: boolean): void;

    /**
     * @param second_density Defaults to 0
     *
     * @noSelf
     */
    public static SetFogDensity(density: number, second_density?: number): void;

    /**
     * @noSelf
     */
    public static SetFogHeightFalloff(falloff: number): void;

    /**
     * @noSelf
     */
    public static SetFogHeightOffset(offset: number): void;

    /**
     * @noSelf
     */
    public static SetSunLightColor(color: Color): void;

    /**
     * @noSelf
     */
    public static SetSkyLightIntensity(intensity: number): void;

    /**
     * @noSelf
     */
    public static SetSkyRayleighScattering(color: Color): void;

    /**
     * @noSelf
     */
    public static SetSunLightIntensity(intensity: number): void;

    /**
     * @noSelf
     */
    public static SetSunTemperatureMultiplier(multiplier: number): void;

    /**
     * Set Post Process Bloom Settings
     *
     * @param intensity Defaults to 0.675
     * @param threshold Defaults to -1
     *
     * @noSelf
     */
    public static SetPPBloom(intensity?: number, threshold?: number): void;

    /**
     * Set Post Process Chromatic Aberration Settings
     *
     * @param intensity Defaults to 0
     * @param start_offset Defaults to 0
     *
     * @noSelf
     */
    public static SetPPChromaticAberration(intensity?: number, start_offset?: number): void;

    /**
     * Set Post Process Image Effect Settings
     *
     * @param vignette_intensity Defaults to 0.6
     * @param grain_jitter Defaults to 0
     * @param grain_intensity Defaults to 0
     *
     * @noSelf
     */
    public static SetPPImageEffects(vignette_intensity?: number, grain_jitter?: number, grain_intensity?: number): void;

    /**
     * Set Post Process Film Settings
     *
     * @param slope Defaults to 0.8
     * @param toe Defaults to 0.55
     * @param shoulder Defaults to 0.26
     * @param black_clip Defaults to 0
     * @param white_clip Defaults to 0.3
     *
     * @noSelf
     */
    public static SetPPFilm(slope?: number, toe?: number, shoulder?: number, black_clip?: number, white_clip?: number): void;

    /**
     * Set Post Process Saturation Colors. Use Alpha for overall Saturation intensity
     *
     * @noSelf
     */
    public static SetPPGlobalSaturation(color: Color): void;

    /**
     * Sets a PostProcess Material
     *
     * @param material_path The Material Asset to set as Post Process
     *
     * @noSelf
     */
    public static SetPPMaterial(material_path: string): void;

    /**
     * Removes the current Post Process Material
     *
     * @noSelf
     */
    public static RemovePPMaterial(): void;

    /**
     * Sets the sun's angle (0-360)
     *
     * @noSelf
     */
    public static SetSunAngle(angle: number): void;

    /**
     * Sets the sun's time speed (default: '60', which means 60 seconds in game = 1 second in real world)
     *
     * @noSelf
     */
    public static SetSunSpeed(speed: number): void;

    /**
     * Sets the Global time of the day
     *
     * @noSelf
     */
    public static SetTime(hours: number, minutes: number): void;

    /**
     * Sets the global Predefined Weather ({@link WeatherType})
     *
     * @noSelf
     */
    public static SetWeather(weather: WeatherType): void;

    /**
     * Overrides all Light/Sun Actors with the NanosWorld's Official one, to be able to use the functions from this page
     *
     * @noSelf
     */
    public static SpawnDefaultSun(): void;

    /**
     * Sets the global Wind intensity
     *
     * @noSelf
     */
    public static SetWind(intensity: number): void;

    /**
     * @noSelf
     */
    public static GetSunAngle(): number;

    /**
     * @noSelf
     */
    public static GetSunSpeed(): number;

    /**
     * @noSelf
     */
    public static GetTime(): { hours: number, minutes: number };

    /**
     * @noSelf
     */
    public static GetWeather(): WeatherType;

    /**
     * @noSelf
     */
    public static GetWind(): number;
}

/**
 * Called when a Stream Level is loaded
 *
 * @param level_name {@link string}
 */
export type StreamLevelLoaded = "StreamLevelLoaded";
/**
 * Called when a Stream Level is unloaded
 *
 * @param level_name {@link string}
 */
export type StreamLevelUnloaded = "StreamLevelUnloaded";
