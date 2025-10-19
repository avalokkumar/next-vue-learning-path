<template>
  <div class="registration-container">
    <h2>User Registration</h2>
    
    <form @submit.prevent="handleSubmit" class="registration-form">
      <!-- Full Name -->
      <div class="form-group">
        <label for="fullName">Full Name *</label>
        <input 
          id="fullName"
          v-model.trim="form.fullName" 
          type="text"
          :class="{ error: errors.fullName }"
          @blur="validateField('fullName')"
        />
        <span v-if="errors.fullName" class="error-message">{{ errors.fullName }}</span>
      </div>
      
      <!-- Email -->
      <div class="form-group">
        <label for="email">Email *</label>
        <input 
          id="email"
          v-model.trim="form.email" 
          type="email"
          :class="{ error: errors.email }"
          @blur="validateField('email')"
        />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>
      
      <!-- Password -->
      <div class="form-group">
        <label for="password">Password *</label>
        <input 
          id="password"
          v-model="form.password" 
          type="password"
          :class="{ error: errors.password }"
          @input="checkPasswordStrength"
        />
        <div v-if="form.password" class="password-strength">
          <div 
            class="strength-bar"
            :class="passwordStrength.class"
            :style="{ width: passwordStrength.width }"
          ></div>
          <span>{{ passwordStrength.text }}</span>
        </div>
        <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
      </div>
      
      <!-- Confirm Password -->
      <div class="form-group">
        <label for="confirmPassword">Confirm Password *</label>
        <input 
          id="confirmPassword"
          v-model="form.confirmPassword" 
          type="password"
          :class="{ error: errors.confirmPassword }"
          @blur="validateField('confirmPassword')"
        />
        <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
      </div>
      
      <!-- Age -->
      <div class="form-group">
        <label for="age">Age *</label>
        <input 
          id="age"
          v-model.number="form.age" 
          type="number"
          min="18"
          max="100"
          :class="{ error: errors.age }"
          @blur="validateField('age')"
        />
        <span v-if="errors.age" class="error-message">{{ errors.age }}</span>
      </div>
      
      <!-- Gender -->
      <div class="form-group">
        <label>Gender *</label>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="form.gender" value="male" />
            Male
          </label>
          <label>
            <input type="radio" v-model="form.gender" value="female" />
            Female
          </label>
          <label>
            <input type="radio" v-model="form.gender" value="other" />
            Other
          </label>
        </div>
        <span v-if="errors.gender" class="error-message">{{ errors.gender }}</span>
      </div>
      
      <!-- Country -->
      <div class="form-group">
        <label for="country">Country *</label>
        <select 
          id="country"
          v-model="form.country"
          :class="{ error: errors.country }"
        >
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
          <option value="au">Australia</option>
          <option value="in">India</option>
        </select>
        <span v-if="errors.country" class="error-message">{{ errors.country }}</span>
      </div>
      
      <!-- Interests -->
      <div class="form-group">
        <label>Interests (select at least 2)</label>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" v-model="form.interests" value="coding" />
            Coding
          </label>
          <label>
            <input type="checkbox" v-model="form.interests" value="design" />
            Design
          </label>
          <label>
            <input type="checkbox" v-model="form.interests" value="music" />
            Music
          </label>
          <label>
            <input type="checkbox" v-model="form.interests" value="sports" />
            Sports
          </label>
          <label>
            <input type="checkbox" v-model="form.interests" value="reading" />
            Reading
          </label>
        </div>
        <span v-if="errors.interests" class="error-message">{{ errors.interests }}</span>
      </div>
      
      <!-- Bio -->
      <div class="form-group">
        <label for="bio">Bio</label>
        <textarea 
          id="bio"
          v-model.trim="form.bio"
          rows="4"
          maxlength="200"
          placeholder="Tell us about yourself (max 200 characters)"
        ></textarea>
        <small>{{ form.bio.length }}/200 characters</small>
      </div>
      
      <!-- Terms -->
      <div class="form-group">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            v-model="form.agreeToTerms"
          />
          I agree to the Terms and Conditions *
        </label>
        <span v-if="errors.agreeToTerms" class="error-message">{{ errors.agreeToTerms }}</span>
      </div>
      
      <!-- Buttons -->
      <div class="form-actions">
        <button type="submit" :disabled="!isFormValid" class="btn-primary">
          Register
        </button>
        <button type="button" @click="resetForm" class="btn-secondary">
          Reset
        </button>
      </div>
    </form>
    
    <!-- Success Message -->
    <div v-if="showSuccess" class="success-message">
      ✅ Registration successful! Welcome, {{ form.fullName }}!
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'

interface RegistrationForm {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  age: number
  gender: string
  country: string
  interests: string[]
  bio: string
  agreeToTerms: boolean
}

interface Errors {
  [key: string]: string
}

const form = reactive<RegistrationForm>({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  age: 0,
  gender: '',
  country: '',
  interests: [],
  bio: '',
  agreeToTerms: false
})

const errors = reactive<Errors>({})
const showSuccess = ref(false)

const passwordStrength = computed(() => {
  const pwd = form.password
  if (pwd.length === 0) return { width: '0%', class: '', text: '' }
  if (pwd.length < 6) return { width: '25%', class: 'weak', text: 'Weak' }
  if (pwd.length < 8) return { width: '50%', class: 'medium', text: 'Medium' }
  if (pwd.length < 12 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) {
    return { width: '75%', class: 'good', text: 'Good' }
  }
  return { width: '100%', class: 'strong', text: 'Strong' }
})

const isFormValid = computed(() => {
  return (
    form.fullName.length > 0 &&
    form.email.includes('@') &&
    form.password.length >= 8 &&
    form.password === form.confirmPassword &&
    form.age >= 18 &&
    form.gender !== '' &&
    form.country !== '' &&
    form.interests.length >= 2 &&
    form.agreeToTerms
  )
})

const validateField = (fieldName: string) => {
  delete errors[fieldName]
  
  switch (fieldName) {
    case 'fullName':
      if (!form.fullName) errors.fullName = 'Name is required'
      else if (form.fullName.length < 2) errors.fullName = 'Name too short'
      break
    case 'email':
      if (!form.email) errors.email = 'Email is required'
      else if (!form.email.includes('@')) errors.email = 'Invalid email'
      break
    case 'password':
      if (!form.password) errors.password = 'Password is required'
      else if (form.password.length < 8) errors.password = 'Minimum 8 characters'
      break
    case 'confirmPassword':
      if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
      }
      break
    case 'age':
      if (form.age < 18) errors.age = 'Must be 18 or older'
      else if (form.age > 100) errors.age = 'Invalid age'
      break
  }
}

const checkPasswordStrength = () => {
  validateField('password')
}

const handleSubmit = () => {
  // Validate all fields
  Object.keys(form).forEach(key => validateField(key))
  
  if (!form.gender) errors.gender = 'Please select gender'
  if (!form.country) errors.country = 'Please select country'
  if (form.interests.length < 2) errors.interests = 'Select at least 2 interests'
  if (!form.agreeToTerms) errors.agreeToTerms = 'You must agree to terms'
  
  if (Object.keys(errors).length === 0) {
    console.log('Form submitted:', form)
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
      resetForm()
    }, 3000)
  }
}

const resetForm = () => {
  Object.assign(form, {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: 0,
    gender: '',
    country: '',
    interests: [],
    bio: '',
    agreeToTerms: false
  })
  Object.keys(errors).forEach(key => delete errors[key])
  showSuccess.value = false
}
</script>

<style scoped>
.registration-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #42b883;
  text-align: center;
  margin-bottom: 30px;
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: 500;
  color: #35495e;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
select,
textarea {
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #42b883;
}

input.error,
select.error {
  border-color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
}

.radio-group,
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
}

.radio-group label,
.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
  cursor: pointer;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.password-strength {
  margin-top: 8px;
}

.strength-bar {
  height: 4px;
  border-radius: 2px;
  transition: width 0.3s, background-color 0.3s;
  margin-bottom: 4px;
}

.strength-bar.weak { background-color: #f44336; }
.strength-bar.medium { background-color: #ff9800; }
.strength-bar.good { background-color: #ffc107; }
.strength-bar.strong { background-color: #4caf50; }

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #42b883;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #35495e;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #35495e;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.success-message {
  margin-top: 20px;
  padding: 16px;
  background-color: #e8f5e9;
  color: #4caf50;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
}

small {
  color: #999;
  font-size: 12px;
  margin-top: 4px;
}
</style>
