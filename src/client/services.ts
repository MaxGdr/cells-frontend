import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';

import type { UserPublicSchema,UsersCreateRequestSchema,ModelSchema,ModelsCreateRequestSchema,ModelsGetResponseSchema,ModelsUpdateRequestSchema,ModelVersionSchema,ModelVersionsCreateRequestSchema,ModelVersionsGetResponseSchema,ModelVersionsUpdateRequestSchema,Body_predict_api_v1_predict__post,PredictSchema,Body_login_access_token_api_v1_login_access_token_post,TokenSchema,UserSchema } from './models';

export type DefaultData = {
        
    }

export type UsersData = {
        SignupApiV1UsersSignupPost: {
                    requestBody: UsersCreateRequestSchema
                    
                };
    }

export type ModelsData = {
        GetModelsApiV1ModelsGet: {
                    limit?: number
skip?: number
                    
                };
CreateModelApiV1ModelsPost: {
                    requestBody: ModelsCreateRequestSchema
                    
                };
GetModelVersionsApiV1ModelsModelIdModelversionsGet: {
                    limit?: number
modelId: number
skip?: number
                    
                };
CreateModelVersionApiV1ModelsModelIdModelversionsPost: {
                    modelId: number
requestBody: ModelVersionsCreateRequestSchema
                    
                };
GetModelApiV1ModelsModelIdGet: {
                    modelId: number
                    
                };
UpdateModelApiV1ModelsModelIdPut: {
                    modelId: number
requestBody: ModelsUpdateRequestSchema
                    
                };
GetModelVersionApiV1ModelsModelIdModelversionsModelVersionGet: {
                    modelId: number
modelVersion: number
                    
                };
UpdateModelVersionApiV1ModelsModelIdModelversionsModelVersionPut: {
                    modelId: number
modelVersion: number
requestBody: ModelVersionsUpdateRequestSchema
                    
                };
    }

export type PredictsData = {
        PredictApiV1PredictPost: {
                    formData: Body_predict_api_v1_predict__post
modelId: number
modelVersion: number
                    
                };
    }

export type LoginData = {
        LoginAccessTokenApiV1LoginAccessTokenPost: {
                    formData: Body_login_access_token_api_v1_login_access_token_post
                    
                };
    }

export class DefaultService {

	/**
	 * Health
	 * @returns unknown Successful Response
	 * @throws ApiError
	 */
	public static healthHealthGet(): CancelablePromise<Record<string, unknown>> {
				return __request(OpenAPI, {
			method: 'GET',
			url: '/health',
		});
	}

}

export class UsersService {

	/**
	 * Signup
	 * Create new user without the need to be logged in.
	 * @returns UserPublicSchema Successful Response
	 * @throws ApiError
	 */
	public static signupApiV1UsersSignupPost(data: UsersData['SignupApiV1UsersSignupPost']): CancelablePromise<UserPublicSchema> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/users/signup',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Get Current User
	 * Get current user.
	 * @returns UserPublicSchema Successful Response
	 * @throws ApiError
	 */
	public static getCurrentUserApiV1UsersMeGet(): CancelablePromise<UserPublicSchema> {
				return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/users/me',
		});
	}

}

export class ModelsService {

	/**
	 * Get Models
	 * Retrieve items.
	 * @returns ModelsGetResponseSchema Successful Response
	 * @throws ApiError
	 */
	public static getModelsApiV1ModelsGet(data: ModelsData['GetModelsApiV1ModelsGet'] = {}): CancelablePromise<ModelsGetResponseSchema> {
		const {
skip = 0,
limit = 100,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/models/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Model
	 * Create an item.
	 * @returns ModelSchema Successful Response
	 * @throws ApiError
	 */
	public static createModelApiV1ModelsPost(data: ModelsData['CreateModelApiV1ModelsPost']): CancelablePromise<ModelSchema> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/models/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Get Model Versions
	 * Retrieve items.
	 * @returns ModelVersionsGetResponseSchema Successful Response
	 * @throws ApiError
	 */
	public static getModelVersionsApiV1ModelsModelIdModelversionsGet(data: ModelsData['GetModelVersionsApiV1ModelsModelIdModelversionsGet']): CancelablePromise<ModelVersionsGetResponseSchema> {
		const {
modelId,
skip = 0,
limit = 100,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/models/{model_id}/modelversions',
			path: {
				model_id: modelId
			},
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Model Version
	 * Create an item.
	 * @returns ModelVersionSchema Successful Response
	 * @throws ApiError
	 */
	public static createModelVersionApiV1ModelsModelIdModelversionsPost(data: ModelsData['CreateModelVersionApiV1ModelsModelIdModelversionsPost']): CancelablePromise<ModelVersionSchema> {
		const {
modelId,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/models/{model_id}/modelversions',
			path: {
				model_id: modelId
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Get Model
	 * Create an item.
	 * @returns ModelSchema Successful Response
	 * @throws ApiError
	 */
	public static getModelApiV1ModelsModelIdGet(data: ModelsData['GetModelApiV1ModelsModelIdGet']): CancelablePromise<ModelSchema> {
		const {
modelId,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/models/{model_id}',
			path: {
				model_id: modelId
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Model
	 * Create an item.
	 * @returns ModelSchema Successful Response
	 * @throws ApiError
	 */
	public static updateModelApiV1ModelsModelIdPut(data: ModelsData['UpdateModelApiV1ModelsModelIdPut']): CancelablePromise<ModelSchema> {
		const {
modelId,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/models/{model_id}',
			path: {
				model_id: modelId
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Get Model Version
	 * Create an item.
	 * @returns ModelVersionSchema Successful Response
	 * @throws ApiError
	 */
	public static getModelVersionApiV1ModelsModelIdModelversionsModelVersionGet(data: ModelsData['GetModelVersionApiV1ModelsModelIdModelversionsModelVersionGet']): CancelablePromise<ModelVersionSchema> {
		const {
modelId,
modelVersion,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/models/{model_id}/modelversions/{model_version}',
			path: {
				model_id: modelId, model_version: modelVersion
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Model Version
	 * Create an item.
	 * @returns ModelVersionSchema Successful Response
	 * @throws ApiError
	 */
	public static updateModelVersionApiV1ModelsModelIdModelversionsModelVersionPut(data: ModelsData['UpdateModelVersionApiV1ModelsModelIdModelversionsModelVersionPut']): CancelablePromise<ModelVersionSchema> {
		const {
modelVersion,
modelId,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/models/{model_id}/modelversions/{model_version}',
			path: {
				model_version: modelVersion, model_id: modelId
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export class PredictsService {

	/**
	 * Predict
	 * Create a prediction based on the image and the model version.
	 * @returns PredictSchema Successful Response
	 * @throws ApiError
	 */
	public static predictApiV1PredictPost(data: PredictsData['PredictApiV1PredictPost']): CancelablePromise<PredictSchema> {
		const {
modelId,
modelVersion,
formData,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/predict/',
			query: {
				model_id: modelId, model_version: modelVersion
			},
			formData: formData,
			mediaType: 'multipart/form-data',
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export class LoginService {

	/**
	 * Login Access Token
	 * OAuth2 compatible token login, get an access token for future requests
	 * @returns TokenSchema Successful Response
	 * @throws ApiError
	 */
	public static loginAccessTokenApiV1LoginAccessTokenPost(data: LoginData['LoginAccessTokenApiV1LoginAccessTokenPost']): CancelablePromise<TokenSchema> {
		const {
formData,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/login/access-token',
			formData: formData,
			mediaType: 'application/x-www-form-urlencoded',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Test Token
	 * Test access token
	 * @returns UserSchema Successful Response
	 * @throws ApiError
	 */
	public static testTokenApiV1LoginTestTokenPost(): CancelablePromise<UserSchema> {
				return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/login/test-token',
		});
	}

}