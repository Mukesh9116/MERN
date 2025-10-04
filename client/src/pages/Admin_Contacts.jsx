import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const { authorizationToken } = useAuth();

    // Fetch all contacts
    const getAllContacts = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch contacts");
            const data = await response.json();
            setContacts(data);

        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        getAllContacts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this contact?")) return;

        try {
            const res = await fetch(
                `http://localhost:8080/api/admin/contacts/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: authorizationToken,
                    },
                }
            );

            if (!res.ok) throw new Error("Failed to delete contact");

            const data = await res.json().catch(() => null);

            toast.success(data?.message || "Contact deleted successfully");
            setContacts((prevContacts) => prevContacts.filter((user) => user._id !== id));

            console.log(`Contact with ID ${id} deleted successfully`);
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete contact");
        }
    };

    return (
        <section
            className="p-6 min-h-screen"
            style={{
                background: "linear-gradient(90deg, #d53369 0%, #daae51 100%)",
            }}
        >
            <h1 className="text-2xl font-bold mb-6 text-center text-white">All Contacts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map((contact, index) => (
                    <div
                        key={contact._id}
                        className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold text-indigo-600 mb-2">
                            {index + 1}. {contact.username}
                        </h2>
                        <p className="text-gray-700">
                            <span className="font-medium">Email:</span> {contact.email}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Phone:</span> {contact.phone}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Message:</span> {contact.message}
                        </p>

                        <div className="mt-4 flex space-x-3">
                            <Link
                                to={`/admin/contacts/${contact._id}/edit`}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Update
                            </Link>

                            <button
                                onClick={() => handleDelete(contact._id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
