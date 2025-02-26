// function receives sesseion token (data) from provider and returns the user's object (userData) if the user is already stored in the database

export default async function handleCheckUserExistence(data) {
  try {
    const response = await fetch("/api/users");
    if (!response.ok) {
      console.error("User not available");
      return;
    }
    const users = await response.json();
    const userData = users.find((user) => user.userId === data.userId);
    console.log("userData_", userData);
    return userData;
  } catch (error) {
    console.error(error);
  }
}
