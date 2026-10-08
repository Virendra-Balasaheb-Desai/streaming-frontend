import React from "react";

const ErrorState = ({ message }) => {
    return (
        <div className="flex justify-center p-4">
            <div className="w-full max-w-sm text-center">
                <p className="mb-3 w-full">
                    <span className="inline-flex rounded-full p-2 text-white">
                        <svg
                            className="w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </span>
                </p>
                <h5 className="mb-2 font-semibold">{message}</h5>
            </div>
        </div>
    );
};

export default ErrorState;
