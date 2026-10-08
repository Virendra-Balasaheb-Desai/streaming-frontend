import React, { useState } from "react";
import Loading from "../Loading";
import ErrorState from "../ErrorState";
import userApi from "../../api/user";

const ChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            setError(null);
            setIsLoading(true);
            if (
                !passwords.oldPassword ||
                !passwords.newPassword ||
                !passwords.confirmPassword
            ) {
                throw new Error("Please fill all the fields");
            }
            if (passwords.newPassword !== passwords.confirmPassword) {
                throw new Error("Confirm password do not match");
            }
            const data = await userApi.changePassword(passwords);
            setPasswords({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <Loading />;

    if (error) return <ErrorState />;

    return (
        <div className="flex flex-wrap justify-center gap-y-4 py-4">
            <div className="w-full sm:w-1/2 lg:w-1/3">
                <h5 className="font-semibold">Password</h5>
                <p className="text-gray-300">
                    Please enter your current password to change your password.
                </p>
            </div>
            <div className="w-full sm:w-1/2 lg:w-2/3">
                <div className="rounded-lg border">
                    <div className="flex flex-wrap gap-y-4 p-4">
                        <div className="w-full">
                            <label
                                className="mb-1 inline-block"
                                htmlFor="old-pwd"
                            >
                                Current password
                            </label>
                            <input
                                type="password"
                                className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                id="old-pwd"
                                placeholder="Current password"
                                name="oldPassword"
                                value={passwords.oldPassword}
                                onChange={(e) => handlePasswordChange(e)}
                            />
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-1 inline-block"
                                htmlFor="new-pwd"
                            >
                                New password
                            </label>
                            <input
                                type="password"
                                className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                id="new-pwd"
                                placeholder="New password"
                                name="newPassword"
                                value={passwords.newPassword}
                                onChange={(e) => handlePasswordChange(e)}
                            />
                            <p className="mt-0.5 text-sm text-gray-300">
                                Your new password must be more than 8
                                characters.
                            </p>
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-1 inline-block"
                                htmlFor="cnfrm-pwd"
                            >
                                Confirm password
                            </label>
                            <input
                                type="password"
                                className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                id="cnfrm-pwd"
                                placeholder="Confirm password"
                                name="confirmPassword"
                                value={passwords.confirmPassword}
                                onChange={(e) => handlePasswordChange(e)}
                            />
                        </div>
                    </div>
                    <hr className="border border-gray-300" />
                    <div className="flex items-center justify-end gap-4 p-4">
                        <button className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black"
                        >
                            Update Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
