const FormatMessageTime = (date: Date | undefined) => {
  return new Date(date || new Date()).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export { FormatMessageTime };
