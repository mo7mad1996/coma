<template>
  <div class="register-page">
    <GlobalContainer>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="pa-4">
            <v-card-title class="text-center">
              <h2>{{ $t('auth.register_title') }}</h2>
            </v-card-title>
            <v-card-subtitle class="text-center">
              {{ $t('auth.register_description') }}
            </v-card-subtitle>
            
            <v-card-text>
              <v-form @submit.prevent="handleRegister">
                <v-text-field
                  v-model="form.first_name"
                  :label="$t('auth.first_name')"
                  variant="outlined"
                  class="mb-3"
                  required
                />
                
                <v-text-field
                  v-model="form.last_name"
                  :label="$t('auth.last_name')"
                  variant="outlined"
                  class="mb-3"
                  required
                />
                
                <v-text-field
                  v-model="form.email"
                  :label="$t('auth.email')"
                  type="email"
                  variant="outlined"
                  class="mb-3"
                  required
                />
                
                <v-text-field
                  v-model="form.mobile"
                  :label="$t('auth.mobile')"
                  variant="outlined"
                  class="mb-3"
                  required
                />
                
                <v-text-field
                  v-model="form.password"
                  :label="$t('auth.password')"
                  type="password"
                  variant="outlined"
                  class="mb-3"
                  required
                />
                
                <v-text-field
                  v-model="form.password_confirmation"
                  :label="$t('auth.confirm_password')"
                  type="password"
                  variant="outlined"
                  class="mb-3"
                  required
                />
                
                <v-checkbox
                  v-model="form.terms"
                  :label="$t('auth.terms')"
                  class="mb-3"
                  required
                />
                
                <v-btn
                  type="submit"
                  color="primary"
                  block
                  size="large"
                  :loading="isLoading"
                >
                  {{ $t('auth.signup') }}
                </v-btn>
              </v-form>
              
              <div class="text-center mt-4">
                <nuxt-link to="/login">
                  {{ $t('auth.have_account') }} {{ $t('auth.login') }}
                </nuxt-link>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </GlobalContainer>
  </div>
</template>

<script setup>
import { useAuth } from '~/modules/auth/services/auth';

definePageMeta({
  layout: 'default',
  middleware: 'guest'
});

const { register } = useAuth();
const isLoading = ref(false);

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  mobile: '',
  password: '',
  password_confirmation: '',
  user_type: 'donor',
  terms: false
});

const handleRegister = async () => {
  isLoading.value = true;
  try {
    await register(form);
  } catch (error) {
    console.error('Register error:', error);
  } finally {
    isLoading.value = false;
  }
};

useHead({
  title: 'Register'
});
</script>