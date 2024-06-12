export const $Body_login_access_token_api_v1_login_access_token_post = {
	properties: {
		grant_type: {
	type: 'any-of',
	contains: [{
	type: 'string',
	pattern: 'password',
}, {
	type: 'null',
}],
},
		username: {
	type: 'string',
	isRequired: true,
},
		password: {
	type: 'string',
	isRequired: true,
},
		scope: {
	type: 'string',
	default: '',
},
		client_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		client_secret: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $Body_predict_api_v1_predict__post = {
	properties: {
		image: {
	type: 'binary',
	description: `A file read as UploadFile`,
	isRequired: true,
	format: 'binary',
},
	},
} as const;

export const $HTTPValidationError = {
	properties: {
		detail: {
	type: 'array',
	contains: {
		type: 'ValidationError',
	},
},
	},
} as const;

export const $ModelSchema = {
	properties: {
		id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		name: {
	type: 'string',
	isRequired: true,
},
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		model_type: {
	type: 'any-of',
	contains: [{
	type: 'ModelType',
}, {
	type: 'null',
}],
},
		model_versions: {
	type: 'array',
	contains: {
		type: 'ModelVersionSchema',
	},
	default: [],
},
		owner_id: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $ModelType = {
	type: 'Enum',
	enum: ['regression','classification','text_classification',],
} as const;

export const $ModelVersionSchema = {
	properties: {
		id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		number: {
	type: 'number',
	isRequired: true,
},
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		endpoint_id: {
	type: 'string',
	isRequired: true,
},
		model_id: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $ModelVersionsCreateRequestSchema = {
	properties: {
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		endpoint_id: {
	type: 'string',
	isRequired: true,
},
	},
} as const;

export const $ModelVersionsGetResponseSchema = {
	properties: {
		data: {
	type: 'array',
	contains: {
		type: 'ModelVersionSchema',
	},
	isRequired: true,
},
		count: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $ModelVersionsUpdateRequestSchema = {
	properties: {
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		endpoint_id: {
	type: 'string',
	isRequired: true,
},
	},
} as const;

export const $ModelsCreateRequestSchema = {
	properties: {
		name: {
	type: 'string',
	isRequired: true,
},
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		model_type: {
	type: 'any-of',
	contains: [{
	type: 'ModelType',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $ModelsGetResponseSchema = {
	properties: {
		data: {
	type: 'array',
	contains: {
		type: 'ModelSchema',
	},
	isRequired: true,
},
		count: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $ModelsUpdateRequestSchema = {
	properties: {
		name: {
	type: 'string',
	isRequired: true,
},
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $PredictSchema = {
	properties: {
		confidences: {
	type: 'number',
	isRequired: true,
},
		predicted_class: {
	type: 'string',
	isRequired: true,
},
		model_version: {
	type: 'ModelVersionSchema',
	isRequired: true,
},
	},
} as const;

export const $TokenSchema = {
	properties: {
		access_token: {
	type: 'string',
	isRequired: true,
},
		token_type: {
	type: 'string',
	default: 'bearer',
},
	},
} as const;

export const $UserPublicSchema = {
	properties: {
		id: {
	type: 'number',
	isRequired: true,
},
		email: {
	type: 'string',
	isRequired: true,
	format: 'email',
},
		full_name: {
	type: 'string',
	isRequired: true,
},
		is_active: {
	type: 'boolean',
	isRequired: true,
},
		created_at: {
	type: 'string',
	isRequired: true,
	format: 'date-time',
},
		updated_at: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'date-time',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $UserSchema = {
	properties: {
		id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		email: {
	type: 'string',
	isRequired: true,
	format: 'email',
},
		full_name: {
	type: 'string',
	isRequired: true,
},
		password: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		is_active: {
	type: 'any-of',
	contains: [{
	type: 'boolean',
}, {
	type: 'null',
}],
},
		created_at: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'date-time',
}, {
	type: 'null',
}],
},
		updated_at: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'date-time',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $UsersCreateRequestSchema = {
	properties: {
		email: {
	type: 'string',
	isRequired: true,
	format: 'email',
},
		full_name: {
	type: 'string',
	isRequired: true,
},
		password: {
	type: 'string',
	isRequired: true,
},
	},
} as const;

export const $ValidationError = {
	properties: {
		loc: {
	type: 'array',
	contains: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'number',
}],
},
	isRequired: true,
},
		msg: {
	type: 'string',
	isRequired: true,
},
		type: {
	type: 'string',
	isRequired: true,
},
	},
} as const;