
export const useSaveDataBeforeReload = () => {
 
  function saveDataToLocalStorage(data: { name: string; age: number }) {
    localStorage.setItem("savedData", JSON.stringify(data));
  }

  // Function to handle the beforeunload event
  window.addEventListener("beforeunload", function (event) {
    // Your code here to get the data you want to save
    const dataToSave = {
      // Example data
      name: "John",
      age: 1000023,
      // Add more data as needed
    };

    // Save the data to local storage
    saveDataToLocalStorage(dataToSave);
  });
};
