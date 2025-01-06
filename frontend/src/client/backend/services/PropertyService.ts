/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RootModel_list_PropertyDetailsResponse__ } from '../models/RootModel_list_PropertyDetailsResponse__';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PropertyService {
    /**
     * Get Property Details
     * @param address
     * @returns RootModel_list_PropertyDetailsResponse__ Successful Response
     * @throws ApiError
     */
    public static getPropertyDetailsApiPropertyDetailsGet(
        address?: any,
    ): CancelablePromise<RootModel_list_PropertyDetailsResponse__> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/property/details',
            query: {
                'address': address,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
