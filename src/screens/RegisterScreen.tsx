import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { registerUser } from '../store/userSlice';
import { useRouter } from 'expo-router';

const registerSchema = z
  .object({
    email: z.string().email({ message: 'Email inválido' }),
    password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
    confirmPassword: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Estado de carga

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
    mode: 'onChange', // Activa la validación en tiempo real
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    setLoading(true);
    try {
      const { email, password } = data;
      await dispatch(registerUser({ email, password })).unwrap(); // Espera el resultado
      Alert.alert('Registro exitoso', 'Usuario creado con éxito', [
        {
          text: 'Aceptar',
          onPress: () => router.replace('/login'), // Redirige al login
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario, intenta nuevamente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Introduce tu email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>Contraseña:</Text>
            <TextInput
              style={styles.input}
              placeholder="Introduce tu contraseña"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
          </>
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>Confirmar Contraseña:</Text>
            <TextInput
              style={styles.input}
              placeholder="Repite tu contraseña"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
          </>
        )}
      />

      <Button title="Registrarse" onPress={handleSubmit(onSubmit)} disabled={!isValid || loading} />

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10, marginBottom: 10 },
  errorText: { color: 'red', marginBottom: 10 },
  link: { color: 'blue', marginTop: 20, textAlign: 'center' },
});
