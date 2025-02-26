import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  email: string;
  password: string;
};

type UserState = {
  users: User[];
  token: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  users: [],
  token: null,
  loading: false,
  error: null,
};

// 📌 Cargar usuarios desde AsyncStorage al iniciar la app
export const loadUsers = createAsyncThunk('user/loadUsers', async () => {
  const storedUsers = await AsyncStorage.getItem('users');
  return storedUsers ? JSON.parse(storedUsers) : [];
});

// 📌 Registrar usuario y guardarlo en AsyncStorage
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, password }: User, { rejectWithValue }) => {
    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Verifica si el usuario ya existe
    if (users.some((user: User) => user.email === email)) {
      return rejectWithValue('El usuario ya está registrado');
    }

    const newUser = { email, password };
    const updatedUsers = [...users, newUser];

    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    return newUser;
  }
);

// 📌 Autenticar usuario
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: User, { rejectWithValue }) => {
    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const user = users.find((u: User) => u.email === email && u.password === password);
    if (!user) {
      return rejectWithValue('Credenciales incorrectas');
    }

    return { email, token: 'FAKE_TOKEN' }; // Simulamos un token
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
