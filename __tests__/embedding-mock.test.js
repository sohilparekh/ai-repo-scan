// Tests for EmbeddingService (JavaScript version with mocked implementation)
class MockEmbeddingService {
  static async generateEmbedding(text) {
    // Simple mock implementation
    const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 0)
    const embedding = new Array(1536).fill(0)
    
    words.forEach((word, index) => {
      const hash = this.simpleHash(word)
      for (let i = 0; i < 10; i++) {
        const pos = (hash + i * index) % embedding.length
        embedding[pos] = Math.sin(hash + i) * 0.1
      }
    })
    
    // Normalize the vector
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0))
    return magnitude > 0 ? embedding.map(val => val / magnitude) : embedding
  }
  
  static simpleHash(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }
  
  static cosineSimilarity(vecA, vecB) {
    if (vecA.length !== vecB.length) {
      throw new Error('Vectors must be the same length')
    }
    
    let dotProduct = 0
    let magnitudeA = 0
    let magnitudeB = 0
    
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i]
      magnitudeA += vecA[i] * vecA[i]
      magnitudeB += vecB[i] * vecB[i]
    }
    
    magnitudeA = Math.sqrt(magnitudeA)
    magnitudeB = Math.sqrt(magnitudeB)
    
    if (magnitudeA === 0 || magnitudeB === 0) {
      return 0
    }
    
    return dotProduct / (magnitudeA * magnitudeB)
  }
}

describe('EmbeddingService', () => {
  describe('generateEmbedding', () => {
    it('should generate embedding for simple text', async () => {
      const text = 'hello world'
      const embedding = await MockEmbeddingService.generateEmbedding(text)
      
      expect(Array.isArray(embedding)).toBe(true)
      expect(embedding.length).toBe(1536) // OpenAI embedding size
      expect(typeof embedding[0]).toBe('number')
    })

    it('should generate different embeddings for different texts', async () => {
      const text1 = 'hello world'
      const text2 = 'goodbye world'
      
      const embedding1 = await MockEmbeddingService.generateEmbedding(text1)
      const embedding2 = await MockEmbeddingService.generateEmbedding(text2)
      
      expect(embedding1).not.toEqual(embedding2)
    })

    it('should generate same embedding for same text', async () => {
      const text = 'consistent text'
      
      const embedding1 = await MockEmbeddingService.generateEmbedding(text)
      const embedding2 = await MockEmbeddingService.generateEmbedding(text)
      
      expect(embedding1).toEqual(embedding2)
    })

    it('should handle empty string', async () => {
      const embedding = await MockEmbeddingService.generateEmbedding('')
      
      expect(Array.isArray(embedding)).toBe(true)
      expect(embedding.length).toBe(1536)
    })

    it('should normalize embeddings to unit length', async () => {
      const text = 'test normalization'
      const embedding = await MockEmbeddingService.generateEmbedding(text)
      
      // Calculate magnitude
      const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0))
      expect(Math.abs(magnitude - 1)).toBeLessThan(0.0001) // Should be ~1.0
    })
  })

  describe('cosineSimilarity', () => {
    it('should calculate similarity for identical vectors', () => {
      const vector = [1, 2, 3, 4]
      const similarity = MockEmbeddingService.cosineSimilarity(vector, vector)
      
      expect(similarity).toBeCloseTo(1, 5)
    })

    it('should calculate similarity for orthogonal vectors', () => {
      const vector1 = [1, 0]
      const vector2 = [0, 1]
      const similarity = MockEmbeddingService.cosineSimilarity(vector1, vector2)
      
      expect(similarity).toBeCloseTo(0, 5)
    })

    it('should calculate similarity for opposite vectors', () => {
      const vector1 = [1, 2, 3]
      const vector2 = [-1, -2, -3]
      const similarity = MockEmbeddingService.cosineSimilarity(vector1, vector2)
      
      expect(similarity).toBeCloseTo(-1, 5)
    })

    it('should throw error for vectors of different lengths', () => {
      const vector1 = [1, 2, 3]
      const vector2 = [1, 2]
      
      expect(() => {
        MockEmbeddingService.cosineSimilarity(vector1, vector2)
      }).toThrow('Vectors must be the same length')
    })

    it('should handle zero vectors', () => {
      const zeroVector = [0, 0, 0]
      const normalVector = [1, 2, 3]
      
      const similarity = MockEmbeddingService.cosineSimilarity(zeroVector, normalVector)
      expect(similarity).toBe(0)
    })

    it('should handle negative values correctly', () => {
      const vector1 = [-1, 2, -3]
      const vector2 = [4, -5, 6]
      
      const similarity = MockEmbeddingService.cosineSimilarity(vector1, vector2)
      expect(typeof similarity).toBe('number')
      expect(similarity).toBeGreaterThanOrEqual(-1)
      expect(similarity).toBeLessThanOrEqual(1)
    })
  })

  describe('simpleHash (private method testing via public methods)', () => {
    it('should produce consistent results for same input', async () => {
      const text = 'test hash'
      
      const embedding1 = await MockEmbeddingService.generateEmbedding(text)
      const embedding2 = await MockEmbeddingService.generateEmbedding(text)
      
      expect(embedding1).toEqual(embedding2)
    })

    it('should produce different results for different inputs', async () => {
      const text1 = 'different'
      const text2 = 'inputs'
      
      const embedding1 = await MockEmbeddingService.generateEmbedding(text1)
      const embedding2 = await MockEmbeddingService.generateEmbedding(text2)
      
      expect(embedding1).not.toEqual(embedding2)
    })
  })
})
