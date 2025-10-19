<template>
  <div class="user-card">
    <div class="user-card__header">
      <img :src="avatar" :alt="name" class="user-card__avatar" />
      <div class="user-card__info">
        <h3 class="user-card__name">{{ name }}</h3>
        <p class="user-card__role">{{ role }}</p>
      </div>
    </div>
    
    <div class="user-card__body">
      <p class="user-card__bio">{{ bio }}</p>
      
      <div class="user-card__stats">
        <div class="stat">
          <span class="stat__value">{{ followers }}</span>
          <span class="stat__label">Followers</span>
        </div>
        <div class="stat">
          <span class="stat__value">{{ following }}</span>
          <span class="stat__label">Following</span>
        </div>
        <div class="stat">
          <span class="stat__value">{{ posts }}</span>
          <span class="stat__label">Posts</span>
        </div>
      </div>
    </div>
    
    <div class="user-card__footer">
      <button @click="handleFollow" class="btn btn--primary">
        {{ isFollowing ? 'Following' : 'Follow' }}
      </button>
      <button @click="handleMessage" class="btn btn--secondary">
        Message
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Component props (we'll learn more about these tomorrow!)
interface Props {
  name: string
  role: string
  bio: string
  avatar: string
  followers: number
  following: number
  posts: number
}

const props = defineProps<Props>()

// Local state
const isFollowing = ref(false)

// Methods
const handleFollow = () => {
  isFollowing.value = !isFollowing.value
  console.log(`${isFollowing.value ? 'Followed' : 'Unfollowed'} ${props.name}`)
}

const handleMessage = () => {
  console.log(`Opening message to ${props.name}`)
  alert(`Message feature coming soon for ${props.name}!`)
}
</script>

<style scoped>
.user-card {
  max-width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.user-card__header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.user-card__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid white;
  object-fit: cover;
}

.user-card__info {
  margin-left: 1rem;
}

.user-card__name {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.user-card__role {
  margin: 0.25rem 0 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

.user-card__body {
  padding: 1.5rem;
}

.user-card__bio {
  color: #666;
  line-height: 1.6;
  margin: 0 0 1.5rem;
}

.user-card__stats {
  display: flex;
  justify-content: space-around;
  padding: 1rem 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat__value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #42b883;
}

.stat__label {
  font-size: 0.8rem;
  color: #999;
  margin-top: 0.25rem;
}

.user-card__footer {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
}

.btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn--primary {
  background: #42b883;
  color: white;
}

.btn--primary:hover {
  background: #35495e;
}

.btn--secondary {
  background: #f5f5f5;
  color: #333;
}

.btn--secondary:hover {
  background: #e0e0e0;
}
</style>
