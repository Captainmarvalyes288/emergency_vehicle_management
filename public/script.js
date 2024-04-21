document.addEventListener("DOMContentLoaded", function() {
    // Simulated emergency data
    const emergencyData = {
        type: "Fire",
        location: "123 Main St",
        time: "12:30 PM",
        description: "Building fire reported"
    };

    // Simulated vehicle data
    const vehicleData = [
        { id: 1, type: "Fire Truck", status: "Available" },
        { id: 2, type: "Ambulance", status: "Busy" },
        { id: 3, type: "Police Car", status: "Available" }
    ];

    // Function to display emergency details
    function displayEmergencyDetails() {
        const emergencyInfo = document.getElementById("emergency-info");
        emergencyInfo.innerHTML = `
            <strong>Type:</strong> ${emergencyData.type}<br>
            <strong>Location:</strong> ${emergencyData.location}<br>
            <strong>Time:</strong> ${emergencyData.time}<br>
            <strong>Description:</strong> ${emergencyData.description}
        `;
    }

    // Function to display list of vehicles
    function displayVehicleList() {
        const vehicleList = document.getElementById("vehicle-list-items");
        vehicleList.innerHTML = "";
        vehicleData.forEach(vehicle => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>ID:</strong> ${vehicle.id}<br>
                <strong>Type:</strong> ${vehicle.type}<br>
                <strong>Status:</strong> ${vehicle.status}
            `;
            vehicleList.appendChild(li);
        });
    }

    // Display initial emergency details and vehicle list
    displayEmergencyDetails();
    displayVehicleList();
});
