import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  const API_URL = 'http://192.168.2.117:3000/users'; // IP local ajustado

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Erro ao buscar usuários:', err));
  }, []);

  const addUser = () => {
    if (!name.trim()) return;

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
      .then(res => res.json())
      .then(data => {
        setUsers(prev => [...prev, data]);
        setName('');
      })
      .catch(err => console.error('Erro ao adicionar usuário:', err));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Usuários:</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Text>- {item.name}</Text>}
        ListEmptyComponent={<Text>Nenhum usuário ainda.</Text>}
      />

      <TextInput
        placeholder="Digite um nome"
        onChangeText={setName}
        value={name}
        style={{
          borderWidth: 1,
          marginVertical: 10,
          padding: 8,
          borderRadius: 5,
        }}
      />
      <Button title="Adicionar Usuário" onPress={addUser} />
    </View>
  );
}
