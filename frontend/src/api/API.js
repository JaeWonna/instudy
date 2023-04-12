import axios from "axios";

export const loginCheck = async (user_id, user_password) => {
    console.log(user_id, user_password);
    try {
        const response = await axios.post("/signin", {
            email: user_id,
            passwd: user_password,
        })
        console.log(response.data.user);
        return response.data.user
    } catch (error) {
        return null;
    }
}

export const findOneUserByUserId = async (user_id) => {
    try {
        const response = await axios.post('/usersRouter/findUser', {
            user_id: user_id
        })
        // const foundUser = response.data.user;
        return (response.data.user)
    } catch (error) {

    }
}