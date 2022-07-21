import {DatabaseEngine} from "../Enums";

/**
 * The Database entity provides programmers a way to access SQL databases easily through scripting.
 *
 * <i>Tip:</i> Currently nanos world supports {@link DatabaseEngine.SQLite}, {@link DatabaseEngine.MySQL} and {@link DatabaseEngine.PostgreSQL} out of the box
 *
 * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Server</u></b>.
 *
 * @customConstructor Database
 */
declare class Database {

    /**
     * @param database_engine Database Engine
     * @param connection_string Connection String used to create and connect to the database
     * @param pool_size Size of the connection pool when calling several queries simultaneously. Defaults to 10
     *
     * @see <a href="https://docs.nanos.world/docs/scripting-reference/classes/database#connection-string">here</a> for the connection string format
     */
    public constructor(database_engine: DatabaseEngine, connection_string: string, pool_size?: number);

    /**
     * Closes the Database
     */
    public Close(): void;

    /**
     * Execute a query asyncronously
     *
     * @param query Query to execute
     * @param callback Callback to call when finishes. Defaults to null
     * @param parameters Sequence of parameters to escape into the Query
     */
    public Execute(query: string, callback?: (rows_affected: number) => void, ...parameters: any[]): void;

    /**
     * Execute a query syncronously
     * @param query Query to execute
     * @param parameters Sequence of parameters to escape into the Query
     */
    public ExecuteSync(query: string, ...parameters: any[]): number;

    /**
     * Execute a select query asyncronously
     *
     * @param query Query to select
     * @param callback Callback to call when finishes. Defaults to null
     * @param parameters Sequence of parameters to escape into the Query
     */
    public Select(query: string, callback?: (rows: ({ [key: string]: any })[]) => void, ...parameters: any[]): void;

    /**
     * Selects a query syncronously
     *
     * @param query Query to select
     * @param parameters Sequence of parameters to escape into the Query
     */
    public SelectedSync(query: string, ...parameters: any[]): ({ [key: string]: any })[];
}
