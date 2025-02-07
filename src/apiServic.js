export async function fetchCoffeeData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/simple-coffee-listing-data.json"
    );

    if (!response.ok) {
      throw new Error("Couldn't connect to the endpoint");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// fetch(
//     "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/simple-coffee-listing-data.json"
//   )
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("coudnt connect to the endpoint");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       if (!data) {
//         throw new Error("no data to read!");
//       }
//       console.log(data);
//     })
//     .catch((error) => console.error(error));
