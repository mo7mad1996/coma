<template>
  <div class="login-page">
    <GlobalContainer>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="pa-4">
            <v-card-title class="text-center">
              <h2>{{ $t('auth.login_title') }}</h2>
            </v-card-title>
            <v-card-subtitle class="text-center">
              {{ $t('auth.login_description') }}
            </v-card-subtitle>
            
            <v-card-text>
              <v-form @submit.prevent="handleLogin">
                <v-text-field
                  v-model="form.email"
                  :label="$t('auth.enter_your_email')"
                  type="email"
                  variant="outlined"
                  class="mb-3"
                  required
                />
                
                <v-text-field
                  v-model="form.password"
                  :label="$t('auth.enter_your_password')"
                  type="password"
                  variant="outlined"
                  class="mb-3"
                  required
                />
                
                <v-checkbox
                  v-model="form.remember_me"
                  :label="$t('auth.remember_me')"
                  class="mb-3"
                />
                
                <v-btn
                  type="submit"
                  color="primary"
                  block
                  size="large"
                  :loading="isLoading"
                >
                  {{ $t('auth.login') }}
                </v-btn>
              </v-form>
              
              <div class="text-center mt-4">
                <nuxt-link to="/register">
                  {{ $t('auth.do_not_have_account') }} {{ $t('auth.signup') }}
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

const { login } = useAuth();
const isLoading = ref(false);

const form = reactive({
  email: '',
  password: '',
  remember_me: false
});

const handleLogin = async () => {
  isLoading.value = true;
  try {
    await login(form);
  } catch (error) {
    console.error('Login error:', error);
  } finally {
    isLoading.value = false;
  }
};

useHead({
  title: 'Login'
});
</script>