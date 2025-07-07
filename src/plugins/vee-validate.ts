import { defineRule, configure } from 'vee-validate';
import { required, email, min, confirmed } from '@vee-validate/rules';

export default defineNuxtPlugin(() => {
  // Define rules
  defineRule('required', required);
  defineRule('email', email);
  defineRule('min', min);
  defineRule('confirmed', confirmed);

  // Configure validation
  configure({
    generateMessage: (ctx) => {
      const messages: Record<string, string> = {
        required: `The field ${ctx.field} is required.`,
        email: `The field ${ctx.field} must be a valid email.`,
        min: `The field ${ctx.field} must be at least ${ctx.rule?.params?.[0]} characters.`,
        confirmed: `The field ${ctx.field} confirmation does not match.`,
      };

      return messages[ctx.rule?.name as string] || `The field ${ctx.field} is invalid.`;
    },
  });
});