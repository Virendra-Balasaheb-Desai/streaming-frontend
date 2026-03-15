import React from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const EditPersonalInfo = () => {
    return (
        <div className="flex flex-wrap justify-center gap-y-4 py-4">
            <div className="w-full sm:w-1/2 lg:w-1/3">
                <h5 className="font-semibold">Personal Info</h5>
                <p className="text-gray-300">
                    Update your photo and personal details.
                </p>
            </div>
            <div className="w-full sm:w-1/2 lg:w-2/3">
                <div className="rounded-lg border">
                    <div className="flex flex-wrap gap-y-4 p-4">
                        <div className="w-full lg:w-1/2 lg:pr-2">
                            <label
                                htmlFor="firstname"
                                className="mb-1 inline-block"
                            >
                                First name
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                id="firstname"
                                placeholder="Enter first name"
                                defaultValue="React"
                            />
                        </div>
                        <div className="w-full lg:w-1/2 lg:pl-2">
                            <label
                                htmlFor="lastname"
                                className="mb-1 inline-block"
                            >
                                Last name
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                id="lastname"
                                placeholder="Enter last name"
                                defaultValue="Patterns"
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="lastname"
                                className="mb-1 inline-block"
                            >
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300">
                                    <EnvelopeIcon />
                                </div>
                                <input
                                    type="email"
                                    className="w-full rounded-lg border bg-transparent py-1.5 pl-10 pr-2"
                                    id="lastname"
                                    placeholder="Enter email address"
                                    defaultValue="patternsreact@gmail.com"
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="border border-gray-300" />
                    <div className="flex items-center justify-end gap-4 p-4">
                        <button className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">
                            Cancel
                        </button>
                        <button className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPersonalInfo;
