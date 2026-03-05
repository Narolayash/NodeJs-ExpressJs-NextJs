import React from 'react'

async function server_action_to_print_form_data(formData: FormData) {
    'use server'

    console.log(formData.get('fullname'));
    console.log(formData.get('email'));
    console.log(formData.get('password'));
    console.log(formData.get('gender'));
    console.log(formData.get('age'));
    console.log(formData.get('skills'));
    console.log(formData.get('country'));
    console.log(formData.get('address'));
}

function ServeractionFormdata() {
    return (
        <div className="flex items-center justify-center min-h-screen mt-3">
            <form 
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-2 border-gray-700"
                action={server_action_to_print_form_data}
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">User Registration Form</h2>

                <label className="block mb-1 font-medium">Full Name:</label>
                <input type="text" name="fullname" placeholder="Enter your full name" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4" />

                <label className="block mb-1 font-medium">Email:</label>
                <input type="email" name="email" placeholder="Enter your email" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4" />

                <label className="block mb-1 font-medium">Password:</label>
                <input type="password" name="password" placeholder="Enter password" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4" />

                <label className="block mb-1 font-medium">Gender:</label>
                <div className="flex items-center gap-4 mb-4">
                    <label className="flex items-center gap-1">
                        <input type="radio" name="gender" value="male" className="accent-blue-500" /> Male
                    </label>
                    <label className="flex items-center gap-1">
                        <input type="radio" name="gender" value="female" className="accent-pink-500" /> Female
                    </label>
                    <label className="flex items-center gap-1">
                        <input type="radio" name="gender" value="other" className="accent-gray-500" /> Other
                    </label>
                </div>

                <label className="block mb-1 font-medium">Age:</label>
                <input type="number" name="age" min="1" max="100" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4" />

                <label className="block mb-1 font-medium">Skills:</label>
                <div className="flex items-center gap-4 mb-4">
                    <label className="flex items-center gap-1">
                        <input type="checkbox" name="skills" value="html" className="accent-orange-500" /> HTML
                    </label>
                    <label className="flex items-center gap-1">
                        <input type="checkbox" name="skills" value="css" className="accent-blue-500" /> CSS
                    </label>
                    <label className="flex items-center gap-1">
                        <input type="checkbox" name="skills" value="javascript" className="accent-yellow-500" /> JavaScript
                    </label>
                </div>

                <label className="block mb-1 font-medium">Country:</label>
                <select name="country" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4">
                    <option value="">Select Country</option>
                    <option value="india">India</option>
                    <option value="usa">USA</option>
                    <option value="uk">UK</option>
                </select>

                <label className="block mb-1 font-medium">Address:</label>
                <textarea name="address" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"></textarea>

                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Submit</button>
                    <button type="reset" className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition">Reset</button>
                </div>
            </form>
        </div>
    )
}
export default ServeractionFormdata