# node相关命令
| 作用 | npm | yarn | pnpm |
| --------- | ----------------------- | -------------------- | -------------------- |
| 安装 | npm install | yarn install | pnpm install |
| 安装的简写 | npm i | yarn add | pnpm add |
| 强制安装 | | | pnpm install --force |
| 卸载 | npm unintall | yarn remove | pnpm remove |
| 卸载简写 | npm rm | yarn rm | pnpm rm |
| 全局安装 | npm i xxx --global/-g | yarn global add xxx | pnpm add -g xxx |
| 安装包(生产模式) | npm i xxx --save/-S | yarn add xxx | pnpm add xxx |
| 开发模式安装包 | npm i xxx --save-dev/-D | yarn add xxx -dev/-D | pnpm add -D xxx |
| 检查更新 | npm outdated | | |
| 更新 | npm update | yarn upgrade | pnpm update |
| 全局更新 | npm update -g | yarn global upgrade | pnpm update -g |
| 运行 | npm run xxx | yarn run | pnpm run xxx |
| 清除缓存 | npm cache clean | yarn cache clean | |
| 动态包执行 | npx xxx | yarn dlx xxx | pnpm dlx xxx |
| 查看全局安装的包 | npm list -g --depth 0 | yarn global list | pnpm list -g |