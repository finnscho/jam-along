import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#FF914C',
        secondary: '1E1E1E',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    }
  }
});
