import data from "@/app/Data//ArrayOfObjects.json"
import Link from "next/link";

export default async function UserTable({ params } : { params : Promise<{ pageNo : string }> }) {
    const { pageNo }  = await params;
    const page = Number(pageNo)
    const startIndex = (page - 1) * 10;
    const endIndex = page * 10;

    const onePageData = data.slice(startIndex, endIndex);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2 text-left">ID</th>
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">City</th>
                        <th className="border px-4 py-2 text-left">Age</th>
                        <th className="border px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {onePageData.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{user.id}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.city}</td>
                            <td className="border px-4 py-2">{user.age}</td>
                            <td className="border px-4 py-2">
                                <button className="mr-2 text-blue-600 hover:underline">
                                    Edit
                                </button>
                                <button className="text-red-600 hover:underline">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <Link href={"/lab_22/pagination/" + (page+1)} >next pgae...{">"}</Link>
            </div>
        </div>
    );
}
