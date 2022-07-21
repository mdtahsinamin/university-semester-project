export default getStats = async () => {
  try {
    const res = await userRequest.get("https://e-shop-47.herokuapp.com/api/v1/auth/stats");
    res.data.map((item) =>
      setUserStats((prev) => [...prev, { name: MONTHS[item._id - 1], "Active User": item.total }])
    );
  } catch {}
};
