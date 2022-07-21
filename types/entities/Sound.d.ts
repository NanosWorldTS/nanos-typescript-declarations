import {Actor} from "./base/Actor";
import {Vector} from "../utils/Vector";
import {AttenuationFunction, SoundLoopMode, SoundType} from "../Enums";

/**
 * Class for playing in-game 2D and 3D sounds
 *
 * <i>Tip:</i> You can also load raw .ogg files from disk! Please check <a href="https://docs.nanos.world/docs/scripting-reference/glossary/basic-types#specialpath">SpecialPath</a>.
 *
 * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Client</u></b>.
 *
 * @customConstructor Sound
 */
declare class Sound extends Actor {

    /**
     * @param location 3D only. Defaults to Vector(0, 0, 0)
     * @param asset The Sound Asset or Special Path. Defaults to ""
     * @param is_2D_sound Defaults to false
     * @param auto_destroy If to destroy after finished playing. Defaults to true
     * @param sound_type Used to apply user's volume settings. Defaults to {@link SoundType.SFX}
     * @param volume Defaults to 1
     * @param pitch Defaults to 1
     * @param inner_radius 3D only. Defaults to 400
     * @param falloff_distance 3D only. Defaults to 3600
     * @param attenuation_function 3D only. Defaults to {@link AttenuationFunction.Linear}
     * @param keep_playing_when_silent 3D only - Whether to keep playing this sound when it's not audible - Use with caution, it may cause performance issues! Defaults to false
     * @param loop_mode Loop Mode (if should force sound to loop). Defaults to {@link SoundLoopMode.Default}
     *
     * @see <a href="https://docs.nanos.world/docs/scripting-reference/glossary/basic-types#specialpath">here</a> for more information about the asset parameter.
     */
    public constructor(location?: Vector, asset?: string, is_2D_sound?: boolean, auto_destroy?: boolean, sound_type?: SoundType, volume?: number, pitch?: number, inner_radius?: number, falloff_distance?: number, attenuation_function?: AttenuationFunction, keep_playing_when_silent?: boolean, loop_mode?: SoundLoopMode);

    /**
     * Plays the sound with a fade effect
     *
     * @param fade_volume_level Defaults to 1
     * @param start_time Defaults to 0
     */
    public FadeIn(fade_in_duration: number, fade_volume_level?: number, start_time?: number): void;

    /**
     * Stops the sound with a fade effect
     *
     * @param fade_volume_level Defaults to 0
     * @param destroy_after_fadeout Defaults to false
     */
    public FadeOut(fade_out_duration: number, fade_volume_level?: number, destroy_after_fadeout?: boolean): void;

    /**
     * Starts the sound
     *
     * @param start_time Defaults to 0
     */
    public Play(start_time?: number): void;

    /**
     * If a 3D Sound, sets the distance which the sound is inaudible
     */
    public SetFalloffDistance(falloff_distance: number): void;

    /**
     * If a 3D Sound, sets the distance within the volume is 100%
     */
    public SetInnerRadius(inner_radius: number): void;

    /**
     * Sets lowpass filter frequency. Sets 0 to disable it.
     */
    public SetLowPassFilter(frequency: number): void;

    /**
     * Pauses the sound
     *
     * @param pause Defaults to true
     */
    public SetPaused(pause?: boolean): void;

    /**
     * Sets the Sound's pitch
     */
    public SetPitch(new_pitch: number): void;

    /**
     * Sets the Sound's volume (0 - 1)
     */
    public SetVolume(new_volume: number): void;

    /**
     * Stops the sound
     */
    public Stop(): void;

    /**
     * Stops the sound after the provided delay
     */
    public StopDelayed(delay: number): void;

    /**
     * Gets if the sound is 2D
     */
    public Is2D(): boolean;

    /**
     * Gets if the sound is playing
     */
    public IsPlaying(): boolean;

    /**
     * Gets the duration of the Sound.
     */
    public GetDuration(): number;

    public GetPitch(): number;

    public GetVolume(): number;

    public GetLowPassFilter(): number;

    public GetInnerRadius(): number;

    public GetFalloffDistance(): number;

    public GetSoundType(): number;
}
