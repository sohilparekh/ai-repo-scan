// Simple embedding service - in production, you'd use OpenAI, Cohere, or other embedding services
export class EmbeddingService {
  // Generate a simple hash-based embedding for demo purposes
  // In production, replace this with actual embedding API calls
  static async generateEmbedding(text: string): Promise<number[]> {
    // Simple text to vector conversion (for demo only)
    // This creates a 1536-dimensional vector like OpenAI's embeddings
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
    return embedding.map(val => val / magnitude)
  }
  
  private static simpleHash(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }
  
  // Calculate cosine similarity between two vectors
  static cosineSimilarity(vecA: number[], vecB: number[]): number {
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
