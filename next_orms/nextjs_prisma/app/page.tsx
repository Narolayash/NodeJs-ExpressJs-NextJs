import Image from "next/image";
import { users } from "./generated/prisma/browser";

async function getAllUsers() {
  const users = await fetch('http://localhost:3000/api/user', {
    cache: 'no-store'
  });

  return await users.json();
}

export default async function Home() {
  const users = await getAllUsers();
  const data = users.data
  return (
    <>
      <h1>All Users</h1>
      <ul>
        {
            data.map((user : users) => (
            <li key={user.id}>{ user.first_name }</li>
          ))
        }
      </ul>
    </>
  );
}
