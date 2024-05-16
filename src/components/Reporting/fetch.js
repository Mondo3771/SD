const Getalltasks = async () => {
  try {
    const response = await fetch("/api/Task");
    const res = await response.json();
    return res;
  } catch {
    console.log("hello");
  }
};

const GetFeedback = async () => {
  try {
    const response = await fetch("api/Feedback", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
  } catch {}
};
