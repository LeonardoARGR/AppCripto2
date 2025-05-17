import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { createCripto, updateCripto } from './Api';

export default function Cadastro({ navigation }) {
    const [registro, setRegistro] = useState([]);
    const [nomeCripto, setNomeCripto] = useState('');
    const [siglaCripto, setSiglaCripto] = useState('');

    const [selectedCriptoId, setSelectedCriptoId] = useState(null);

    const handleSubmit = async () => {
        if (!nomeCripto || !siglaCripto) {
            Alert.alert('Atenção', 'Preencha todos os campos antes de cadastrar.');
            return;
        }

        const newCripto = { nomeCripto, siglaCripto };

        if (selectedCriptoId) {
            // Se um Cripto estiver selecionado para edição, chamamos a função de update
            await updateCripto(selectedCriptoId, newCripto);
            setSelectedCriptoId(null); // Limpa a seleção após a edição
        } else {
            // Se não, chamamos a função de criação de Cripto
            const addedCripto = await createCripto(newCripto);
            if(addedCripto) {
                Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!', [
                    { text: 'OK', onPress: () => navigation.navigate('Home')},
                ]);
            }
        }

        // Limpa os campos do formulário
        setNomeCripto('');
        setSiglaCripto('');
    };

    return (
        <View>
            <TextInput
                placeholder="Nome da Cripto"
                value={nomeCripto}
                onChangeText={setNomeCripto}
            />
            <TextInput
                placeholder="Sigla da Cripto"
                value={siglaCripto}
                onChangeText={setSiglaCripto}
            />
            
            <Button title="Cadastrar" onPress={handleSubmit} />
        </View>
    );
}