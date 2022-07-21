/**
 * A File represents an entry to a system file.
 *
 * <i>Info:</i> It is not possible to open files from outside the server folder. All path must be relative to the Server’s executable folder. All files are opened as binary file by default.
 *
 * @remarks <i>Authority</i>: This can be spawned only on the <b><u>Server</u></b>.
 *
 * @customConstructor File
 */
declare class File {

    /**
     * @param file_path Path relative to server executable
     * @param truncate Whether or not to clear the file upon opening it. Defaults to false
     */
    public constructor(file_path: string, truncate?: boolean);

    /**
     * Returns when the file was last modified in Unix time
     *
     * @noSelf
     */
    public static Time(path: string): number;

    /**
     * Creates a directory (for every folder passed).
     *
     * @return true if succeeded, false otherwise
     *
     * @noSelf
     */
    public static CreateDirectory(path: string): boolean;

    /**
     * Deletes a folder or a file
     *
     * @noSelf
     */
    public static Remove(path: string): number;

    /**
     * Gets if a file or folder exists
     *
     * @noSelf
     */
    public static Exists(path: string): boolean;

    /**
     * Gets if a path is a directory
     *
     * @noSelf
     */
    public static IsDirectory(path: string): boolean;

    /**
     * Gets if a path is a file
     *
     * @noSelf
     */
    public static IsRegularFile(path: string): boolean;

    /**
     * Closes the file
     */
    public Close(): void;

    /**
     * Flushes content to the file
     */
    public Flush(): void;

    /**
     * Checks if the file status is End of File
     */
    public IsEOF(): boolean;

    /**
     * Checks if the file status is Bad
     */
    public IsBad(): boolean;

    /**
     * Checks if the file status is Good
     */
    public IsGood(): boolean;

    /**
     * Checks if the last operation has Failed
     */
    public HasFailed(): boolean;

    /**
     * Reads n (Length) characters from the File and returns it. Also moves the file pointer to the latest read position. Pass 0 to read the whole file
     *
     * @param length Length to be read from file. Defaults to 0
     */
    public Read(length?: number): string;

    /**
     * Reads n (Length) characters from the File asynchronously. Also moves the file pointer to the latest read position. Pass 0 to read the whole file
     *
     * @param length Length to be read from file
     * @param callback Callback with the file read
     */
    public ReadAsync(length: number, callback: (content: string) => void): void;

    /**
     * Reads and returns the next file line
     */
    public ReadLine(): string;

    /**
     * Sets the file pointer to a specific position
     *
     * @param position Position to offset the file pointer
     */
    public Seek(position: number): void;

    /**
     * Returns the size of the file
     */
    public Size(): number;

    /**
     * Skips n (amount) positions from the current file pointer position
     *
     * @param amount Amount to offset the file pointer
     */
    public Skip(amount: number): void;

    /**
     * Returns the current file pointer position
     */
    public Tell(): number;

    /**
     * Writes the Data at the current position of the file
     *
     * @param data Writes the data to the file
     */
    public Write(data: string): void;
}
