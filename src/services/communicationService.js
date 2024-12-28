// communicationService.js
export const getCommunicationMethods = async () => {
  const response = await fetch("/api/communication-methods");
  return response.json();
};

export const logCommunication = async (data) => {
  const response = await fetch("/api/log", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};
