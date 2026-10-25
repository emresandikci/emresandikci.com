# My Personal Website

Developed with [esducad-ui kit](https://github.com/emresandikci/esducad-ui) and generated from [react-easy-boilerplate](https://github.com/emresandikci/react-easy-boilerplate) which are one of my projects.

## Release notifications

Every release and every failed run of `.github/workflows/release.yml` sends a Telegram message. Add these repository secrets:

- `TELEGRAM_BOT_TOKEN`: token of a bot created with @BotFather.
- `TELEGRAM_CHAT_ID`: your chat id (send the bot a message, then read `chat.id` from `https://api.telegram.org/bot<TOKEN>/getUpdates`).

The step is skipped with a warning when they are not set.
