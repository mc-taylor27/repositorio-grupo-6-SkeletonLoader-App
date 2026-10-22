import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  Animated 
} from 'react-native';

const SkeletonCard = () => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, { toValue: 1, duration: 1000, useNativeDriver: false }), 
        Animated.timing(animatedValue, { toValue: 0, duration: 1000, useNativeDriver: false })
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7]
  });

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.skeletonTitle, { opacity }]} />
      <Animated.View style={[styles.skeletonText, { opacity }]} />
      <Animated.View style={[styles.skeletonText, { opacity, width: '60%' }]} />
    </View>
  );
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState([]);

  const buscarDados = () => {
    if (loading) return; 
    
    setLoading(true);
    setDados([]); 
    setTimeout(() => {
      const dadosMocados = [
        { id: '1', titulo: 'React Native Avançado', desc: 'Aprenda segurança e performance mobile.' },
        { id: '2', titulo: 'UX/UI para Mobile', desc: 'Crie interfaces resilientes e centradas no usuário.' },
        { id: '3', titulo: 'Desenvolvimento de Sistemas', desc: 'Curso técnico completo SENAI-SP.' },
      ];
      setDados(dadosMocados);
      setLoading(false);
    }, 3000); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Feed de Cursos 📚</Text>

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={buscarDados}
        disabled={loading} 
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Carregar Conteúdo</Text>
        )}
      </TouchableOpacity>

      {loading ? (
        <View style={{ width: '100%' }}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      ) : (
        <FlatList
          data={dados}
          keyExtractor={(item) => item.id}
          style={{ width: '100%' }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum dado carregado. Clique no botão acima!</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a3c2e0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
  },
  /* Estilos do Skeleton */
  skeletonTitle: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 10,
    width: '70%',
  },
  skeletonText: {
    height: 14,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 6,
    width: '100%',
  },
});
