import * as Core from 'openai/core';
import { APIResource } from 'openai/resource';
import { Uploadable } from 'openai/core';
import * as FilesAPI from 'openai/resources/beta/vector-stores/files';
import { CursorPage, type CursorPageParams } from 'openai/pagination';
export declare class Files extends APIResource {
    /**
     * Create a vector store file by attaching a
     * [File](https://platform.openai.com/docs/api-reference/files) to a
     * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object).
     */
    create(vectorStoreId: string, body: FileCreateParams, options?: Core.RequestOptions): Core.APIPromise<VectorStoreFile>;
    /**
     * Retrieves a vector store file.
     */
    retrieve(vectorStoreId: string, fileId: string, options?: Core.RequestOptions): Core.APIPromise<VectorStoreFile>;
    /**
     * Returns a list of vector store files.
     */
    list(vectorStoreId: string, query?: FileListParams, options?: Core.RequestOptions): Core.PagePromise<VectorStoreFilesPage, VectorStoreFile>;
    list(vectorStoreId: string, options?: Core.RequestOptions): Core.PagePromise<VectorStoreFilesPage, VectorStoreFile>;
    /**
     * Delete a vector store file. This will remove the file from the vector store but
     * the file itself will not be deleted. To delete the file, use the
     * [delete file](https://platform.openai.com/docs/api-reference/files/delete)
     * endpoint.
     */
    del(vectorStoreId: string, fileId: string, options?: Core.RequestOptions): Core.APIPromise<VectorStoreFileDeleted>;
    /**
     * Attach a file to the given vector store and wait for it to be processed.
     */
    createAndPoll(vectorStoreId: string, body: FileCreateParams, options?: Core.RequestOptions & {
        pollIntervalMs?: number;
    }): Promise<VectorStoreFile>;
    /**
     * Wait for the vector store file to finish processing.
     *
     * Note: this will return even if the file failed to process, you need to check
     * file.last_error and file.status to handle these cases
     */
    poll(vectorStoreId: string, fileId: string, options?: Core.RequestOptions & {
        pollIntervalMs?: number;
    }): Promise<VectorStoreFile>;
    /**
     * Upload a file to the `files` API and then attach it to the given vector store.
     * Note the file will be asynchronously processed (you can use the alternative
     * polling helper method to wait for processing to complete).
     */
    upload(vectorStoreId: string, file: Uploadable, options?: Core.RequestOptions): Promise<VectorStoreFile>;
    /**
     * Add a file to a vector store and poll until processing is complete.
     */
    uploadAndPoll(vectorStoreId: string, file: Uploadable, options?: Core.RequestOptions & {
        pollIntervalMs?: number;
    }): Promise<VectorStoreFile>;
}
export declare class VectorStoreFilesPage extends CursorPage<VectorStoreFile> {
}
/**
 * A list of files attached to a vector store.
 */
export interface VectorStoreFile {
    /**
     * The identifier, which can be referenced in API endpoints.
     */
    id: string;
    /**
     * The Unix timestamp (in seconds) for when the vector store file was created.
     */
    created_at: number;
    /**
     * The last error associated with this vector store file. Will be `null` if there
     * are no errors.
     */
    last_error: VectorStoreFile.LastError | null;
    /**
     * The object type, which is always `vector_store.file`.
     */
    object: 'vector_store.file';
    /**
     * The status of the vector store file, which can be either `in_progress`,
     * `completed`, `cancelled`, or `failed`. The status `completed` indicates that the
     * vector store file is ready for use.
     */
    status: 'in_progress' | 'completed' | 'cancelled' | 'failed';
    /**
     * The ID of the
     * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object)
     * that the [File](https://platform.openai.com/docs/api-reference/files) is
     * attached to.
     */
    vector_store_id: string;
}
export declare namespace VectorStoreFile {
    /**
     * The last error associated with this vector store file. Will be `null` if there
     * are no errors.
     */
    interface LastError {
        /**
         * One of `server_error` or `rate_limit_exceeded`.
         */
        code: 'internal_error' | 'file_not_found' | 'parsing_error' | 'unhandled_mime_type';
        /**
         * A human-readable description of the error.
         */
        message: string;
    }
}
export interface VectorStoreFileDeleted {
    id: string;
    deleted: boolean;
    object: 'vector_store.file.deleted';
}
export interface FileCreateParams {
    /**
     * A [File](https://platform.openai.com/docs/api-reference/files) ID that the
     * vector store should use. Useful for tools like `file_search` that can access
     * files.
     */
    file_id: string;
}
export interface FileListParams extends CursorPageParams {
    /**
     * A cursor for use in pagination. `before` is an object ID that defines your place
     * in the list. For instance, if you make a list request and receive 100 objects,
     * ending with obj_foo, your subsequent call can include before=obj_foo in order to
     * fetch the previous page of the list.
     */
    before?: string;
    /**
     * Filter by file status. One of `in_progress`, `completed`, `failed`, `cancelled`.
     */
    filter?: 'in_progress' | 'completed' | 'failed' | 'cancelled';
    /**
     * Sort order by the `created_at` timestamp of the objects. `asc` for ascending
     * order and `desc` for descending order.
     */
    order?: 'asc' | 'desc';
}
export declare namespace Files {
    export import VectorStoreFile = FilesAPI.VectorStoreFile;
    export import VectorStoreFileDeleted = FilesAPI.VectorStoreFileDeleted;
    export import VectorStoreFilesPage = FilesAPI.VectorStoreFilesPage;
    export import FileCreateParams = FilesAPI.FileCreateParams;
    export import FileListParams = FilesAPI.FileListParams;
}
//# sourceMappingURL=files.d.ts.map