import axios from "axios";

const sellerauthentication = async () => {
  try {
    console.log("seller");
    const { data } = await axios.get("/sellers/authentication", {
      withCredentials: true,
    });
    return {
      isAuth: data.isAuthenticate,
      user: data.user,
    };
  } catch (error) {
    throw error;
  }
};
// module.exports = { authentication, sellerauthentication };
export default sellerauthentication;
// export default { authentication, sellerauthentication };