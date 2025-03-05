# Redis Implementation Details

## 1. Redis Configuration

### 1.1 Setup
```javascript
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: 1,
  retryStrategy: (times) => {
    if (times > 3) return null;
    return Math.min(times * 100, 3000);
  }
});
```

### 1.2 Fallback Mechanism
```javascript
// In-memory fallback when Redis is unavailable
const fallbackStorage = {
  cache: new Map(),
  gameState: new Map(),
  matchmaking: {
    french: [],
    spanish: []
  }
};
```

## 2. Data Structures

### 2.1 Word Pairs Cache
```javascript
// Redis SET structure
key: `wordpairs:${language}`
value: Set<JSON.stringify(WordPair)>

// Example operations
await redis.sadd('wordpairs:french', JSON.stringify({
  word: 'bonjour',
  translation: 'hello'
}));
```

### 2.2 Game Rooms
```javascript
// Redis HASH structure
key: `room:${roomId}`
field: {
  players: JSON.stringify(Player[]),
  state: JSON.stringify(GameState),
  scores: JSON.stringify(Record<string, number>)
}

// Example operations
await redis.hset(`room:${roomId}`, {
  players: JSON.stringify(players),
  state: JSON.stringify(gameState)
});
```

### 2.3 Leaderboards
```javascript
// Redis SORTED SET structure
key: 'global:leaderboard'
member: playerName
score: totalXP

// Example operations
await redis.zadd('global:leaderboard', score, playerName);
await redis.zrevrange('global:leaderboard', 0, 9); // Top 10
```

## 3. Real-time Features

### 3.1 Pub/Sub System
```javascript
// Channel structure
`game:${roomId}`
`matchmaking:${language}`
`leaderboard:update`

// Example usage
redis.publish(`game:${roomId}`, JSON.stringify({
  type: 'WORD_GUESS',
  player: playerId,
  guess: word
}));
```

### 3.2 Room Management
```javascript
// Room lifecycle
async function createRoom(roomId, language) {
  await redis.hset(`room:${roomId}`, {
    language,
    players: '[]',
    state: 'WAITING'
  });
  await redis.expire(`room:${roomId}`, 3600); // 1 hour TTL
}
```

## 4. Performance Optimization

### 4.1 Caching Strategies
```javascript
// Cached word pairs with TTL
async function cacheWordPairs(language, pairs) {
  const key = `wordpairs:${language}`;
  await redis.sadd(key, ...pairs.map(JSON.stringify));
  await redis.expire(key, 86400); // 24 hours TTL
}
```

### 4.2 Pipeline Operations
```javascript
// Batch operations
const pipeline = redis.pipeline();
pipeline.hset(`room:${roomId}`, 'state', 'ACTIVE');
pipeline.hincrby(`room:${roomId}`, 'playerCount', 1);
pipeline.expire(`room:${roomId}`, 3600);
await pipeline.exec();
```

## 5. Error Handling

### 5.1 Graceful Degradation
```javascript
async function getWordPairs(language) {
  try {
    const pairs = await redis.smembers(`wordpairs:${language}`);
    return pairs.map(JSON.parse);
  } catch (error) {
    console.error('Redis error, using fallback:', error);
    return fallbackStorage.cache.get(language) || [];
  }
}
```

### 5.2 Connection Management
```javascript
redis.on('error', (error) => {
  console.error('Redis connection error:', error);
  switchToFallbackMode();
});

redis.on('connect', () => {
  console.log('Redis connected');
  restoreFromFallback();
});
```

## 6. Monitoring and Maintenance

### 6.1 Health Checks
```javascript
async function checkRedisHealth() {
  try {
    await redis.ping();
    return true;
  } catch {
    return false;
  }
}
```

### 6.2 Memory Management
```javascript
// Implement memory policies
redis.config('SET', 'maxmemory-policy', 'allkeys-lru');
redis.config('SET', 'maxmemory', '2gb');
```