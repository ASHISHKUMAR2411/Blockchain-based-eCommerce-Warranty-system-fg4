import axios from "axios";

const authentication = async () => {
  try {
    const { data } = await axios.get("/users/authentication", {
      withCredentials: true,
    });
    return {
      isAuth: data.isAuthenticate,
      user: data.user,
      role: data.role,
    };
  } catch (error) {
    throw error;
  }
};

export default authentication;