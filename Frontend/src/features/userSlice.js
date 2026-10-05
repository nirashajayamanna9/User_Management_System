import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Nirasha",
    email: "nira@gmail.com",
    password: "123",
    role: "Admin",
  },
  {
    id: 2,
    name: "Hiruni",
    email: "hiruni@gmail.com",
    password: "123",
    role: "Admin",
  },
  {
    id: 3,
    name: "Nethmini",
    email: "nethmini@gmail.com",
    password: "123",
    role: "Admin",
  },
];

const usersSlice = createSlice({
  name: "users",

  initialState,

  reducers: {

    
    addUser: (state, action) => {
      state.push(action.payload);
    },

    
    deleteUser: (state, action) => {
      return state.filter(
        (user) => user.id !== action.payload
      );
    },

    
    updateUser: (state, action) => {

      const {
        id,
        name,
        email,
        password,
        role,
      } = action.payload;

      const existingUser = state.find(
        (user) => user.id === id
      );

      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
        existingUser.password = password;
        existingUser.role = role;
      }
    },
  },
});

export const {
  addUser,
  deleteUser,
  updateUser,
} = usersSlice.actions;

export const SelectAllUsers = (state) => state.users;

export default usersSlice.reducer;