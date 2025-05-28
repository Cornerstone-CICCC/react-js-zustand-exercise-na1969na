import { useState } from "react";
import { useUserStore } from "../stores/user.store";

const hobbies = ["Reading", "Gaming", "Cooking", "Sports", "Music", "Travel"];

export const User = () => {
  const { users, addUser, deleteUser } = useUserStore();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstname || !lastname || !age) return;

    addUser({
      firstname,
      lastname,
      age: parseInt(age),
      hobbies: selectedHobbies,
    });

    setFirstname("");
    setLastname("");
    setAge("");
    setSelectedHobbies([]);
  };

  const handleHobbyChange = (hobby: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        User Management System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            User List
          </h2>
          <ul className="space-y-4">
            {users.map((user, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-medium text-gray-800">
                      {user.firstname} {user.lastname}
                    </p>
                    <p className="text-gray-600">Age: {user.age} years old</p>
                    <p className="text-gray-600 mt-2">
                      <span className="font-medium">Hobbies:</span>{" "}
                      {user.hobbies.length > 0
                        ? user.hobbies.join(", ")
                        : "None"}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteUser(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
            {users.length === 0 && (
              <li className="text-center text-gray-500 py-4">
                No users registered
              </li>
            )}
          </ul>
        </div>

        {/* フォーム */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            New User Registration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your last name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your age"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hobbies
              </label>
              <div className="grid grid-cols-2 gap-3">
                {hobbies.map((hobby) => (
                  <label
                    key={hobby}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedHobbies.includes(hobby)}
                      onChange={() => handleHobbyChange(hobby)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">{hobby}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
