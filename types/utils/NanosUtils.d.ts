/**
 * A table containing useful and aux functions.
 *
 * @remarks This structure is Open Sourced at <a href="https://github.com/nanos-world/nanos-world-lua-lib">this link</a>. Feel free to push merge requests and suggest changes!
 */
declare class NanosUtils {

    /**
     * Dumps a table into a readable text
     *
     * @param table Table to dump
     *
     * @noSelf
     */
    public static Dump(table: LuaTable): string;

    /**
     * Benchmarks a function performance, outputs in the console the elapsed time
     *
     * @param name Benchmark name to output
     * @param amount Amount of times to loop
     * @param callback The function to call
     * @param args The arguments of the function to call
     *
     * @noSelf
     */
    public static Benchmark(name: string, amount: number, callback: (...args: any[]) => void, ...args: any[]): void;
}
