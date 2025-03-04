# Tactical Architecture

## 1. Visión General

Este documento describe la arquitectura táctica basada en **Clean Architecture**, **Domain-Driven Design (DDD)** y **SOLID**, aplicada a un proyecto en **React Native** con **Redux** para el manejo del estado.

La arquitectura se divide en las siguientes capas:
- **Dominio**: Contiene las reglas de negocio y los casos de uso.
- **Data**: Implementa los repositorios y la persistencia de datos.
- **Inyección de Dependencias (DI)**: Conecta las capas de dominio y data con la presentación.
- **Presentación (Redux)**: Maneja el estado global de la aplicación.
- **UI**: Implementa los componentes y la navegación.

---

## 2. Capas de la Arquitectura

### 📌 Dominio (UseCase)

```typescript
// src/domain/usecases/SessionUseCase.ts
export class SessionUseCase {
  constructor(private sessionRepository: SessionRepository) {}

  async isUserLoggedIn(): Promise<boolean> {
    return await this.sessionRepository.hasActiveSession();
  }
}
```

---

### 📌 Data (Repositorio con AsyncStorage)

```typescript
// src/data/repositories/SessionRepository.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SessionRepository {
  hasActiveSession(): Promise<boolean>;
}

export class SessionRepositoryImpl implements SessionRepository {
  private readonly SESSION_KEY = 'user_session';

  async hasActiveSession(): Promise<boolean> {
    const session = await AsyncStorage.getItem(this.SESSION_KEY);
    return session !== null;
  }
}
```

---

### 📌 Inyección de Dependencias (DI)

```typescript
// src/di/Container.ts
import { SessionUseCase } from '../domain/usecases/SessionUseCase';
import { SessionRepositoryImpl } from '../data/repositories/SessionRepository';

const sessionRepository = new SessionRepositoryImpl();
const sessionUseCase = new SessionUseCase(sessionRepository);

export { sessionUseCase };
```

---

### 📌 Presentación (Redux)

#### 🎯 Acciones
```typescript
// src/redux/actions/sessionActions.ts
import { sessionUseCase } from '../../di/Container';

export const CHECK_SESSION = 'CHECK_SESSION';

export const checkSession = () => async (dispatch: any) => {
  const isLoggedIn = await sessionUseCase.isUserLoggedIn();
  dispatch({ type: CHECK_SESSION, payload: isLoggedIn });
};
```

#### 🎯 Reducer
```typescript
// src/redux/reducers/sessionReducer.ts
import { CHECK_SESSION } from '../actions/sessionActions';

const initialState = {
  isLoggedIn: false,
};

export const sessionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHECK_SESSION:
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
};
```

#### 🎯 Configuración del Store
```typescript
// src/redux/store.ts
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { sessionReducer } from './reducers/sessionReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
```

---

### 📌 UI (Componentes y Navegación)

#### 🎯 Splash Screen
```typescript
// src/ui/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession } from '../../redux/actions/sessionActions';
import { useNavigation } from '@react-navigation/native';

export const SplashScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoggedIn = useSelector((state: any) => state.session.isLoggedIn);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.replace('Home');
    } else {
      navigation.replace('Login');
    }
  }, [isLoggedIn, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#000" />
      <Text>Verificando sesión...</Text>
    </View>
  );
};
```

#### 🎯 Home Screen
```typescript
// src/ui/screens/HomeScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';

export const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Hola Home</Text>
  </View>
);
```

#### 🎯 Login Screen
```typescript
// src/ui/screens/LoginScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';

export const LoginScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Pantalla de Login</Text>
  </View>
);
```

#### 🎯 Navegación y App Principal
```typescript
// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { SplashScreen } from './ui/screens/SplashScreen';
import { HomeScreen } from './ui/screens/HomeScreen';
import { LoginScreen } from './ui/screens/LoginScreen';

const Stack = createStackNavigator();

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
```

---

## 3. Conclusión

Esta arquitectura permite **desacoplar la lógica de negocio de la UI**, facilitando la **inyección de dependencias** y el **testing unitario**. Además, Redux permite manejar el estado de la sesión de forma centralizada y predecible.

---

## 4. Preguntas y Consideraciones Adicionales
- ¿Es necesario manejar errores en la obtención de la sesión?
- ¿Se debería persistir el estado de Redux con AsyncStorage?
- ¿Cómo se pueden escribir tests unitarios para `SessionUseCase`?
