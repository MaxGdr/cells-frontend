export type Body_login_access_token_api_v1_login_access_token_post = {
	grant_type?: string | null;
	username: string;
	password: string;
	scope?: string;
	client_id?: string | null;
	client_secret?: string | null;
};



export type Body_predict_api_v1_predict__post = {
	/**
	 * A file read as UploadFile
	 */
	image: Blob | File;
};



export type HTTPValidationError = {
	detail?: Array<ValidationError>;
};



export type ModelSchema = {
	id?: number | null;
	name: string;
	description?: string | null;
	model_type?: ModelType | null;
	model_versions?: Array<ModelVersionSchema>;
	owner_id: number;
};



export type ModelType = 'regression' | 'classification' | 'text_classification';



export type ModelVersionSchema = {
	id?: number | null;
	number: number;
	description?: string | null;
	endpoint_id: string;
	model_id: number;
};



export type ModelVersionsCreateRequestSchema = {
	description?: string | null;
	endpoint_id: string;
};



export type ModelVersionsGetResponseSchema = {
	data: Array<ModelVersionSchema>;
	count: number;
};



export type ModelVersionsUpdateRequestSchema = {
	description?: string | null;
	endpoint_id: string;
};



export type ModelsCreateRequestSchema = {
	name: string;
	description?: string | null;
	model_type?: ModelType | null;
};



export type ModelsGetResponseSchema = {
	data: Array<ModelSchema>;
	count: number;
};



export type ModelsUpdateRequestSchema = {
	name: string;
	description?: string | null;
};



export type PredictSchema = {
	confidences: number;
	predicted_class: string;
	model_version: ModelVersionSchema;
};



export type TokenSchema = {
	access_token: string;
	token_type?: string;
};



export type UserPublicSchema = {
	id: number;
	email: string;
	full_name: string;
	is_active: boolean;
	created_at: string;
	updated_at?: string | null;
};



export type UserSchema = {
	id?: number | null;
	email: string;
	full_name: string;
	password?: string | null;
	is_active?: boolean | null;
	created_at?: string | null;
	updated_at?: string | null;
};



export type UsersCreateRequestSchema = {
	email: string;
	full_name: string;
	password: string;
};



export type ValidationError = {
	loc: Array<string | number>;
	msg: string;
	type: string;
};

