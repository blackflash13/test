
module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static NotFound(message, errors) {
        return new ApiError(404, message, errors);
    }

    static PageNumberGreater(message, errors) {
        return new ApiError(500, "Page number is larger than required");
    }


    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }


};
