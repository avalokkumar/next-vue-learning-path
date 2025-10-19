<template>
  <div class="profile-card" :class="{ online: user.isOnline }">
    <!-- Avatar -->
    <img 
      :src="user.avatar" 
      :alt="user.name + ' avatar'"
      class="avatar"
    />
    
    <!-- User Info -->
    <div class="user-info">
      <h2>{{ user.name }}</h2>
      
      <!-- Status Badge -->
      <span 
        :class="['status-badge', user.isOnline ? 'online' : 'offline']"
      >
        {{ user.isOnline ? '🟢 Online' : '⚫ Offline' }}
      </span>
      
      <!-- Email -->
      <a :href="'mailto:' + user.email" class="email">
        {{ user.email }}
      </a>
      
      <!-- Bio -->
      <p class="bio">{{ user.bio }}</p>
      <small>{{ user.bio.length }} characters</small>
      
      <!-- Dynamic Styles -->
      <div 
        class="experience-bar"
        :style="{ 
          width: user.experiencePercent + '%',
          backgroundColor: getExperienceColor 
        }"
      >
        {{ user.experiencePercent }}% Complete
      </div>
    </div>
    
    <!-- Actions -->
    <div class="actions">
      <button :disabled="!user.isOnline" class="btn-primary">
        {{ user.isOnline ? 'Send Message' : 'User Offline' }}
      </button>
      <button @click="toggleStatus" class="btn-secondary">
        Toggle Status
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface User {
  name: string
  email: string
  avatar: string
  bio: string
  isOnline: boolean
  experiencePercent: number
}

const user = ref<User>({
  name: 'Sarah Johnson',
  email: 'sarah.j@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  bio: 'Full-stack developer passionate about Vue.js and modern web technologies.',
  isOnline: true,
  experiencePercent: 75
})

const getExperienceColor = computed(() => {
  const percent = user.value.experiencePercent
  if (percent >= 75) return '#4CAF50'
  if (percent >= 50) return '#FF9800'
  return '#F44336'
})

const toggleStatus = () => {
  user.value.isOnline = !user.value.isOnline
}
</script>

<style scoped>
.profile-card {
  max-width: 400px;
  margin: 20px auto;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: white;
  transition: all 0.3s;
}

.profile-card.online {
  border: 2px solid #4CAF50;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: block;
  margin: 0 auto 20px;
  border: 4px solid #42b883;
}

.user-info {
  text-align: center;
}

h2 {
  margin: 0 0 10px;
  color: #35495e;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
}

.status-badge.online {
  background: #e8f5e9;
  color: #4CAF50;
}

.status-badge.offline {
  background: #f5f5f5;
  color: #9e9e9e;
}

.email {
  display: block;
  color: #42b883;
  text-decoration: none;
  margin: 10px 0;
}

.email:hover {
  text-decoration: underline;
}

.bio {
  color: #666;
  line-height: 1.6;
  margin: 15px 0 5px;
}

.experience-bar {
  height: 30px;
  border-radius: 15px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  transition: all 0.3s;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary {
  background: #42b883;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #35495e;
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f5f5f5;
  color: #35495e;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

small {
  color: #999;
  font-size: 12px;
}
</style>
