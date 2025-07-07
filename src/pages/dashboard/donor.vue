<template>
  <div>
    <DashboardPageTitle :title="$t('donor.dashboard')" />
    
    <GlobalContainer>
      <v-row>
        <v-col cols="12" md="8">
          <v-card class="mb-4">
            <v-card-title>{{ $t('donor.welcome') }}</v-card-title>
            <v-card-text>
              <p>{{ $t('donor.welcome_sentence') }}</p>
            </v-card-text>
          </v-card>

          <v-card>
            <v-card-title>{{ $t('donor.overview') }}</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-card color="primary" dark>
                    <v-card-text class="text-center">
                      <div class="text-h4">0</div>
                      <div>{{ $t('donor.total_donations') }}</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-card color="success" dark>
                    <v-card-text class="text-center">
                      <div class="text-h4">0</div>
                      <div>{{ $t('donor.active_campaigns') }}</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-card color="info" dark>
                    <v-card-text class="text-center">
                      <div class="text-h4">0</div>
                      <div>{{ $t('donor.upcoming_scheduled') }}</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-card color="warning" dark>
                    <v-card-text class="text-center">
                      <div class="text-h4">0</div>
                      <div>{{ $t('donor.sponsored_individuals') }}</div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>{{ $t('donor.latest_donors') }}</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t('no_data') }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </GlobalContainer>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'donor',
  middleware: ['require-auth', 'only-donor']
});

useHead({
  title: 'Donor Dashboard'
});
</script>