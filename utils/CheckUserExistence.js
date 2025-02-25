export default async function handleCheckUserExistence(data) {
  try {
    const response = await fetch("/api/users");
    if (!response.ok) {
      console.error("Failed to create user");
      return;
    }
    const users = await response.json();
    const userIsAvailable = users.find((user) => user.userId === data.userId);
    console.log("userIsAvailable_", userIsAvailable);
    return userIsAvailable;
  } catch (error) {
    console.error(error);
  }
}
