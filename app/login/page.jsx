import { login, signup } from "./actions";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600">
            <form className="w-full max-w-sm text-white">
                <h2 className="text-3xl font-bold text-center mb-8">Welcome</h2>
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                    >
                        Email:
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-3 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium mb-2"
                    >
                        Password:
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="w-full px-3 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        formAction={login}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
                    >
                        Log in
                    </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <button
                        formAction={signup}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
                    >
                        Forgot Password?
                    </button>
                </div>
            </form>
        </div>
    );
}
